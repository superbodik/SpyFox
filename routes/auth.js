// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Убедитесь, что импортируете обе функции

router.post('/register', register); // Регистрация
router.post('/login', login); // Вход

module.exports = router;
