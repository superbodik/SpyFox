const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Убедитесь, что у вас правильно настроен импорт вашей базы данных
const authRoutes = require('./routes/auth'); // Импорт ваших маршрутов

const app = express();
const PORT = 3000;

connectDB();


app.use(express.json());
app.use(cors()); // Это позволит всем доменам получать доступ к вашему API. Можно указать конкретные домены.
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:3000;");
    next();
});

app.use('/auth', authRoutes);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
