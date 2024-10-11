const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    friendCode: {
        type: String,
        required: true,
        unique: true // Это важно, чтобы коды были уникальными
    },
    userId: {
        type: String,
        required: true,
        unique: true // Делаем поле уникальным, если это необходимо
    }
});

module.exports = mongoose.model('User', userSchema);
