// controllers/friendController.js
const User = require('../models/User');
const Friend = require('../models/Friend');

exports.addFriend = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).send('Пользователь не найден');
        }

        const existingFriendship = await Friend.findOne({
            $or: [
                { userId, friendId },
                { userId: friendId, friendId: userId }
            ]
        });

        if (existingFriendship) {
            return res.status(400).send('Дружба уже существует');
        }

        const newFriendship = new Friend({ userId, friendId });
        await newFriendship.save();

        res.send('Запрос на добавление в друзья отправлен');
    } catch (error) {
        console.error('Ошибка при добавлении друга:', error);
        res.status(500).send('Ошибка сервера');
    }
};
=======
// controllers/friendController.js
const User = require('../models/User');
const Friend = require('../models/Friend');

// Добавление друга
exports.addFriend = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).send('<h1>Пользователь не найден</h1>');
        }

        const existingFriendship = await Friend.findOne({
            $or: [
                { userId, friendId },
                { userId: friendId, friendId: userId }
            ]
        });

        if (existingFriendship) {
            return res.status(400).send('<h1>Дружба уже существует</h1>');
        }

        const newFriendship = new Friend({ userId, friendId });
        await newFriendship.save();

        res.send('<h1>Запрос на добавление в друзья отправлен</h1>');
    } catch (error) {
        res.status(500).send('<h1>Ошибка сервера</h1>');
    }
};


// Принятие запроса на дружбу
exports.acceptFriendRequest = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        const friendship = await Friend.findOne({ userId: friendId, friendId: userId });

        if (!friendship) {
            return res.status(404).json({ message: 'Запрос на дружбу не найден' });
        }

        friendship.status = 'accepted';
        await friendship.save();

        res.status(200).json({ message: 'Запрос на дружбу принят' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};

// Отклонение запроса на дружбу
exports.rejectFriendRequest = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        const friendship = await Friend.findOneAndDelete({ userId: friendId, friendId: userId });

        if (!friendship) {
            return res.status(404).json({ message: 'Запрос на дружбу не найден' });
        }

        res.status(200).json({ message: 'Запрос на дружбу отклонен' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error });
    }
};
>>>>>>> 227d15aae823daf6666813661da61665c1151cd3
