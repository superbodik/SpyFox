// routes/friendRoutes.js
const express = require('express');
const router = express.Router();
const { addFriend, acceptFriendRequest, rejectFriendRequest } = require('../controllers/friendController');


router.post('/add', addFriend);
router.post('/accept', acceptFriendRequest);
router.post('/reject', rejectFriendRequest);

module.exports = router;
