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
