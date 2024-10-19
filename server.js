const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const friendRoutes = require('./routes/friendRoutes');
const authenticateJWT = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:3000;");
    next();
});

// Обслуживание статических файлов из папки "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use('/script', express.static(path.join(__dirname, 'public', 'script')));


app.get('/app/@me', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

app.get('/app/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

app.use('/auth', authRoutes);

app.use('/api/friends', authenticateJWT, friendRoutes);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
