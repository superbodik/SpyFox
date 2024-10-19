const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    // Проверяем, передан ли токен
    if (!token) {
        return res.status(403).json({ error: 'Токен не предоставлен' });
    }

    // Проверяем, начинается ли токен с 'Bearer '
    if (!token.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Неверный формат токена' });
    }

    // Убираем 'Bearer ' из строки и получаем сам токен
    const actualToken = token.split(' ')[1];

    try {
        // Декодируем токен с использованием вашего секретного ключа
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET || '97cbd2aa95740f2b185105e2d522d28320fc55e12b4da30bb48d5d4c01f2f906e4dc3f41b2150ba71f9d38011e2ae7ded4b30b6c19fc55c5cb95f254fb79c580');
        req.user = decoded; // Присваиваем декодированного пользователя в объект запроса
        next(); // Переход к следующему middleware или маршруту
    } catch (error) {
        return res.status(401).json({ error: 'Невалидный или истекший токен' });
    }
};

module.exports = verifyToken;
