document.addEventListener('DOMContentLoaded', () => {
    const sessionId = localStorage.getItem('sessionId'); // Получаем sessionId из локального хранилища
    const authLink = document.getElementById('authLink');

    if (sessionId) {
        // Если пользователь авторизован, изменяем ссылку
        authLink.textContent = 'Открыть приложение';
        authLink.href = 'http://127.0.0.1:5500/app/@me'; // Указываем новый адрес
    } else {
        // Если пользователь не авторизован, оставляем ссылку на регистрацию/авторизацию
        authLink.textContent = 'Регистрация / Авторизация';
        authLink.href = 'auth.html'; // Ссылка на страницу авторизации
    }
});
