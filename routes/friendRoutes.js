const express = require('express');
const router = express.Router();
const {
    addFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    searchUserByFriendCode
} = require('../controllers/friendController');
const verifyToken = require('../middleware/verifyToken');

// Добавление друга
router.post('/add', verifyToken, addFriend);

// Принятие запроса на добавление в друзья
router.post('/accept', verifyToken, acceptFriendRequest);

// Отклонение запроса на добавление в друзья
router.post('/reject', verifyToken, rejectFriendRequest);

// Поиск пользователя по friendCode
router.get('/search/:friendCode', verifyToken, searchUserByFriendCode);

module.exports = router;
