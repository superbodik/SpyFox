const token = localStorage.getItem('sessionId'); // Получаем токен из localStorage

if (!token) {
    alert('Токен отсутствует! Пожалуйста, авторизуйтесь.');
    window.location.href = 'auth.html'; // Или страница авторизации
    return; // Необходимо остановить выполнение, если нет токена
}

// Получаем userId из localStorage (например, после авторизации)
const userId = localStorage.getItem('userId');

if (!userId) {
    alert('ID пользователя не найден! Пожалуйста, авторизуйтесь.');
    window.location.href = 'login.html'; // Или страница авторизации
    return; // Останавливаем выполнение, если нет userId
}

fetch(`http://localhost:3000/api/friends/search/${userId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Передаем токен в заголовке
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);  // Выводим данные о пользователе
})
.catch(error => {
    console.error('Ошибка при получении данных:', error);
});

document.addEventListener('DOMContentLoaded', () => {
    const sessionId = localStorage.getItem('sessionId');
    console.log('sessionId:', sessionId);  // Логируем sessionId

    const authLink = document.getElementById('authLink');

    // Проверяем, если элемент найден
    if (!authLink) {
        console.error('Элемент с id="authLink" не найден');
        return;
    }

    // Проверяем наличие sessionId
    if (sessionId) {
        authLink.textContent = 'Открыть приложение';
        authLink.href = 'http://localhost:3000/app/@me';
    } else {
        authLink.textContent = 'Регистрация / Авторизация';
        authLink.href = 'auth.html';
    }
});
