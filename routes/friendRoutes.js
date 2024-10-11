<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { addFriend, acceptFriendRequest, rejectFriendRequest } = require('../controllers/friendController');

router.post('/add', addFriend);
router.post('/accept', acceptFriendRequest);
router.post('/reject', rejectFriendRequest);

module.exports = router;
=======
// routes/friendRoutes.js
const express = require('express');
const router = express.Router();
const { addFriend, acceptFriendRequest, rejectFriendRequest } = require('../controllers/friendController');


router.post('/add', addFriend);
router.post('/accept', acceptFriendRequest);
router.post('/reject', rejectFriendRequest);

module.exports = router;
>>>>>>> 227d15aae823daf6666813661da61665c1151cd3
