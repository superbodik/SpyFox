const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Импортируем register и login

// Обработчик для GET /auth/register
router.get('/register', (req, res) => {
    res.send('Регистрация пользователя'); // Вы можете вернуть HTML-форму или JSON
});

router.get('/login', (req, res) => {
    res.send('Авторизация пользователя'); // Вы можете вернуть HTML-форму или JSON
});


router.post('/register', register);
router.post('/login', login); 

module.exports = router;
