require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/auth'); 
const friendRoutes = require('./routes/friendRoutes');
const authenticateJWT = require('./authMiddleware');
const friendController = require('./controllers/friendController');
const app = express();
const PORT = process.env.PORT || 3000; 

connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:3000;");
    next();
});

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));


// Установка MIME-типа для JS
app.use('/public', express.static('public', {
    setHeaders: (res, path, stat) => {
        res.set('Content-Type', 'application/javascript');  
    }
}));

app.get('/app/@me', (req, res) => {
    console.log('Запрос к /app/@me');
    res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

app.get('/app/auth', (req, res) => {
    console.log('Запрос к /app/auth');
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

app.use('/auth', authRoutes);
app.use('/friends', friendRoutes); 
app.post('/friends/add', authenticateJWT, friendController.addFriend);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
