const express = require('express');
const router = express.Router();
const {
    addFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    searchUserById
} = require('../controllers/friendController');

// Убедитесь, что все функции определены и правильно импортированы
router.post('/add', addFriend);
router.post('/accept', acceptFriendRequest);
router.post('/reject', rejectFriendRequest);
router.get('/search/:friendId', searchUserById);

module.exports = router;
