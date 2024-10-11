const User = require('../models/User');
const Friend = require('../models/Friend');

exports.addFriend = async (req, res) => {
    const userId = req.user.id; // Получаем userId из токена
    const friendId = req.body.friendId; // Получаем friendId из тела запроса

    // Проверка на наличие userId и friendId
    if (!userId || !friendId) {
        return res.status(400).json({ error: 'Недостаточно данных для добавления друга' });
    }

    try {
        // Здесь ваш код для добавления друга
        const friend = await User.findById(friendId); // Получение друга по friendId
        if (!friend) {
            return res.status(404).json({ error: 'Друг не найден' });
        }

        // Добавление друга к пользователю
        await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } });

        res.status(200).json({ message: 'Друг успешно добавлен' });
    } catch (error) {
        console.error('Ошибка при добавлении друга:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
};

// Принятие запроса на дружбу
exports.acceptFriendRequest = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        // Поиск запроса на дружбу (поиск обратного запроса)
        const friendship = await Friend.findOne({ userId: friendId, friendId: userId });

        // Если запрос на дружбу не найден
        if (!friendship) {
            return res.status(404).json({ message: 'Запрос на дружбу не найден' });
        }

        // Обновление статуса дружбы
        friendship.status = 'accepted';
        await friendship.save();

        res.status(200).json({ message: 'Запрос на дружбу принят' });
    } catch (error) {
        console.error('Ошибка при принятии дружбы:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Отклонение запроса на дружбу
exports.rejectFriendRequest = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        // Поиск и удаление запроса на дружбу
        const friendship = await Friend.findOneAndDelete({ userId: friendId, friendId: userId });

        // Если запрос не найден
        if (!friendship) {
            return res.status(404).json({ message: 'Запрос на дружбу не найден' });
        }

        res.status(200).json({ message: 'Запрос на дружбу отклонен' });
    } catch (error) {
        console.error('Ошибка при отклонении дружбы:', error);
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Поиск пользователя по ID
exports.searchUserById = async (req, res) => {
    const { friendId } = req.params;

    try {
        console.log(`Поиск пользователя с friendCode: ${friendId}`);
        const user = await User.findOne({ friendCode: friendId }).select('-password'); // Исключаем пароль
        if (!user) {
            console.log('Пользователь не найден');
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        console.log('Пользователь найден:', user);
        res.status(200).json(user);
    } catch (error) {
        console.error('Ошибка при поиске пользователя:', error);
        res.status(500).json({ message: 'Ошибка при поиске пользователя' });
    }
};
