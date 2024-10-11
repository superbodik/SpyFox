const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose'); // Импортируем mongoose

function generateFriendCode() {
    return Math.floor(10000 + Math.random() * 90000).toString(); 
}

exports.register = async (req, res) => {
    const { username, password } = req.body; 
    const friendCode = generateFriendCode(); 
    const userId = new mongoose.Types.ObjectId(); // Генерация уникального userId

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
            userId: userId.toString(), // Присваиваем сгенерированный userId
        });

        await newUser.save(); 

        console.log('Пользователь успешно зарегистрирован:', { username, friendCode, userId });

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

const usersFilePath = path.join(__dirname, '../users.json');

// Функция для чтения пользователей из файла
function readUsersFromFile() {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
}

// Функция для записи пользователей в файл
function writeUsersToFile(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Функция для авторизации
const login = (req, res) => {
    const { username, password } = req.body;
    const users = readUsersFromFile();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Пользователь найден, возвращаем его данные
        res.json({
            message: 'Авторизация успешна!',
            userId: user.id,
            sessionId: 'some-session-id' // Генерация sessionId по вашему усмотрению
        });
    } else {
        // Пользователь не найден, создаем нового пользователя
        const newUserId = Date.now(); // Уникальный ID на основе временной метки
        const newUser = {
            id: newUserId,
            username: username,
            password: password // Вы можете использовать хеширование паролей
        };
        users.push(newUser);
        writeUsersToFile(users);

        res.json({
            message: 'Пользователь создан, авторизация успешна!',
            userId: newUserId,
            sessionId: 'some-session-id' // Генерация sessionId по вашему усмотрению
        });
    }
};

exports.searchUserById = async (req, res) => {
    const { friendId } = req.params;

    try {
        console.log(`Поиск пользователя с friendCode: ${friendId}`);
        const user = await User.findOne({ friendCode: friendId }).select('-password'); // Исключаем пароль
        if (!user) {
            console.log('Пользователь не найден');
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        console.log('Пользователь найден:', user);
        res.status(200).json(user);
    } catch (error) {
        console.error('Ошибка при поиске пользователя:', error);
        res.status(500).json({ message: 'Ошибка при поиске пользователя' });
    }
};
