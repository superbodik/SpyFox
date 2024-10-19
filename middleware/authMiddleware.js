const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(403).json({ error: 'Токен отсутствует' });
    }

    // Проверяем, что токен имеет формат "Bearer <token>"
    if (!token.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Токен имеет неверный формат' });
    }

    try {
        // Извлекаем токен после "Bearer "
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;  // Присваиваем информацию о пользователе
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Неверный или истекший токен' });
    }
};

module.exports = authenticateJWT;
