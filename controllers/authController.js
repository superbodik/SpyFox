const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 

function generateFriendCode() {
    return Math.floor(10000 + Math.random() * 90000).toString(); 
}

exports.register = async (req, res) => {
    const { username, password } = req.body; 
    const friendCode = generateFriendCode(); 

    console.log('Попытка регистрации пользователя:', { username }); 

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.warn('Ошибка регистрации: пользователь уже существует:', username);
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 12); // Используем 12 раундов

        const newUser = new User({
            username,
            password: hashedPassword,
            friendCode, 
        });

        await newUser.save(); 

        console.log('Пользователь успешно зарегистрирован:', { username, friendCode });

        const sessionId = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' }); 

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован!', sessionId });
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).json({ message: 'Ошибка при регистрации', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body; 

    console.log('Попытка входа пользователя:', { username }); 

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.warn('Ошибка входа: пользователь не найден:', username);
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.warn('Ошибка входа: неверный пароль для пользователя:', username);
            return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
        }

        const sessionId = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Пользователь успешно вошел:', { username }); 

        res.status(200).json({ message: 'Успешный вход!', sessionId });
    } catch (error) {
        console.error('Ошибка при входе:', error);
        res.status(500).json({ message: 'Ошибка при входе', error: error.message });
    }
};
