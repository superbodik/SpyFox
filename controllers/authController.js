// authController.js
const User = require('../models/User'); // Импортируем модель User
const jwt = require('jsonwebtoken'); // Импортируем библиотеку для работы с токенами
const bcrypt = require('bcrypt'); // Импортируем библиотеку для хеширования паролей

// Функция для генерации 5-значного кода друга
function generateFriendCode() {
    return Math.floor(10000 + Math.random() * 90000).toString(); // Генерирует 5-значное число
}

// Регистрация пользователя
exports.register = async (req, res) => {
    const { username, password } = req.body; // Получаем username и password из тела запроса
    const friendCode = generateFriendCode(); // Генерируем код друга

    console.log('Попытка регистрации пользователя:', { username }); // Логируем попытку регистрации

    try {
        // Проверка на существование пользователя
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.warn('Ошибка регистрации: пользователь уже существует:', username);
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        }

        // Хешируем пароль перед сохранением
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword, // Сохраняем хешированный пароль
            friendCode, // Добавляем сгенерированный код друга
        });

        await newUser.save(); // Сохраняем пользователя в базе данных

        console.log('Пользователь успешно зарегистрирован:', { username, friendCode }); // Логируем успешную регистрацию

        // Генерация токена
        const sessionId = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' }); // Замените 'secret_key' на ваш секретный ключ

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован!', sessionId });
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(400).json({ message: 'Ошибка при регистрации', error: error.message });
    }
};

// Вход пользователя
exports.login = async (req, res) => {
    const { username, password } = req.body; // Получаем username и password из тела запроса

    console.log('Попытка входа пользователя:', { username }); // Логируем попытку входа

    try {
        // Находим пользователя в базе данных
        const user = await User.findOne({ username });
        if (!user) {
            console.warn('Ошибка входа: пользователь не найден:', username);
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        // Сравниваем введенный пароль с хэшированным паролем
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.warn('Ошибка входа: неверный пароль для пользователя:', username);
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        // Генерация токена
        const sessionId = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' }); // Замените 'secret_key' на ваш секретный ключ

        console.log('Пользователь успешно вошел:', { username }); // Логируем успешный вход

        res.status(200).json({ message: 'Успешный вход!', sessionId });
    } catch (error) {
        console.error('Ошибка при входе:', error);
        res.status(500).json({ message: 'Ошибка при входе', error: error.message });
    }
};
