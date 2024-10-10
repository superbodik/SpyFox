const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/auth'); 
const friendRoutes = require('./routes/friendRoutes');

const app = express();
const PORT = 3000;

connectDB();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:3000;");
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/app/@me', (req, res) => {
    res.redirect('/public/'); // Перенаправляем на новый маршрут
});
app.use('/auth', authRoutes);
app.use('/friends', friendRoutes);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
