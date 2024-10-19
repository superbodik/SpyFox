const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// Добавление в друзья
exports.addFriend = async (req, res) => {
    const userId = req.user.id;  // ID текущего пользователя из токена
    const { friendCode } = req.body;  // Код друга

    if (!friendCode) {
        return res.status(400).json({ error: 'Не указан friendCode' });
    }

    try {
        const friend = await User.findOne({ friendCode }); // Ищем пользователя по friendCode
        if (!friend) {
            return res.status(404).json({ error: 'Пользователь с таким friendCode не найден' });
        }

        if (userId === friend._id.toString()) {
            return res.status(400).json({ error: 'Вы не можете добавить себя в друзья' });
        }

        // Проверяем, не является ли пользователь уже другом
        const user = await User.findById(userId);
        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ error: 'Вы уже добавили этого пользователя в друзья' });
        }

        // Создаем запрос на добавление в друзья
        const friendRequest = new FriendRequest({
            requester: userId,
            receiver: friend._id
        });

        await friendRequest.save();
        res.status(200).json({ message: 'Запрос на добавление в друзья отправлен' });
    } catch (error) {
        console.error('Ошибка при добавлении в друзья:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Принятие запроса на добавление в друзья
exports.acceptFriendRequest = async (req, res) => {
    const userId = req.user.id;
    const { requestId } = req.body; // ID запроса

    if (!requestId) {
        return res.status(400).json({ error: 'Не указан ID запроса' });
    }

    try {
        const request = await FriendRequest.findById(requestId);
        if (!request || request.receiver.toString() !== userId) {
            return res.status(404).json({ error: 'Запрос не найден или вы не являетесь получателем' });
        }

        // Обновляем статус запроса на "принят"
        request.status = 'accepted';
        await request.save();

        // Добавляем друг друга в друзья
        const user = await User.findById(userId);
        const friend = await User.findById(request.requester);

        user.friends.push(friend._id);
        friend.friends.push(user._id);

        await user.save();
        await friend.save();

        res.status(200).json({ message: 'Запрос принят и друзья добавлены' });
    } catch (error) {
        console.error('Ошибка при принятии запроса:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Отклонение запроса на добавление в друзья
exports.rejectFriendRequest = async (req, res) => {
    const userId = req.user.id;
    const { requestId } = req.body; // ID запроса

    if (!requestId) {
        return res.status(400).json({ error: 'Не указан ID запроса' });
    }

    try {
        const request = await FriendRequest.findById(requestId);
        if (!request || request.receiver.toString() !== userId) {
            return res.status(404).json({ error: 'Запрос не найден или вы не являетесь получателем' });
        }

        // Удаляем запрос на добавление в друзья
        await FriendRequest.findByIdAndDelete(requestId);
        res.status(200).json({ message: 'Запрос отклонён' });
    } catch (error) {
        console.error('Ошибка при отклонении запроса:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

// Поиск пользователя по friendCode
exports.searchUserByFriendCode = async (req, res) => {
    const { friendCode } = req.params;

    try {
        const user = await User.findOne({ friendCode });
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};
