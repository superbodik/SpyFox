const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Убедитесь, что импортируете обе функции

// Регистрация
router.post('/register', register);

// Вход
router.post('/login', login);

module.exports = router;
