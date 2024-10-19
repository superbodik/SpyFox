const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); 

// Генерация уникального friendCode
function generateFriendCode() {
    return Math.floor(10000 + Math.random() * 90000).toString(); 
}

// Регистрация
exports.register = async (req, res) => {
    const { username, password } = req.body; 
    const friendCode = generateFriendCode(); 
    const userId = new mongoose.Types.ObjectId();

    try {
        // Проверяем, существует ли уже пользователь с таким именем
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 12);

        // Создаем нового пользователя
        const newUser = new User({
            username,
            password: hashedPassword,
            friendCode, 
            userId: userId.toString(),
        });

        await newUser.save(); 

        // Генерация JWT токена
        const sessionId = jwt.sign({ username, id: userId }, process.env.JWT_SECRET || 'your_temporary_secret_key', { expiresIn: '1h' });

        return res.status(201).json({ message: 'Пользователь успешно зарегистрирован!', sessionId });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка при регистрации', error: error.message });
    }
};

// Вход
exports.login = async (req, res) => {
    const { username, password } = req.body; 

    try {
        // Проверка, существует ли пользователь
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        // Проверка пароля
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        // Генерация JWT токена
        const sessionId = jwt.sign({ username, id: user._id }, process.env.JWT_SECRET || 'your_temporary_secret_key', { expiresIn: '1h' });

        return res.status(200).json({ message: 'Успешный вход!', sessionId });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка при входе', error: error.message });
    }
};
