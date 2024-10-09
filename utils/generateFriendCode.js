// Функция генерации уникального 5-значного кода
const generateFriendCode = () => {
    return String(Math.floor(10000 + Math.random() * 90000)); // Генерация случайного 5-значного числа
  };
  