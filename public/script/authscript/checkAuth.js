document.addEventListener('DOMContentLoaded', () => {
    const sessionId = localStorage.getItem('sessionId'); // Получаем sessionId из локального хранилища
    const authLink = document.getElementById('authLink');

    if (!authLink) {
        console.error('Элемент с id "authLink" не найден');
        return; // Завершаем выполнение, если элемент не найден
    }

    if (sessionId) {
        // Если пользователь авторизован, изменяем ссылку
        console.log('Пользователь авторизован. sessionId:', sessionId);
        authLink.textContent = 'Открыть приложение';
        authLink.href = 'http://localhost:3000/app/@me'; // Указываем новый адрес
    } else {
        // Если пользователь не авторизован, оставляем ссылку на регистрацию/авторизацию
        console.log('Пользователь не авторизован. sessionId отсутствует.');
        authLink.textContent = 'Регистрация / Авторизация';
        authLink.href = 'auth.html'; // Ссылка на страницу авторизации
    }
});
