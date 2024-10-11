const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Извлечение токена из заголовка

    if (!token) {
        return res.sendStatus(401); // Возвращаем 401, если токена нет
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Возвращаем 403, если токен недействителен
        }
        req.user = user; // Устанавливаем пользователя в req.user
        next(); // Переход к следующему middleware или роуту
    });
};

module.exports = authenticateJWT; // Экспортируем middleware
