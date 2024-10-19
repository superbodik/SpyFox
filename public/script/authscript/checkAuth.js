document.addEventListener('DOMContentLoaded', () => {
    const sessionId = localStorage.getItem('token'); // Используйте 'token' как ключ

    const authLink = document.getElementById('authLink');
    
    if (authLink) {
        if (sessionId) {
            authLink.textContent = 'Открыть приложение';
            authLink.href = '/app/@me';
        } else {
            authLink.textContent = 'Регистрация / Авторизация';
            authLink.href = '/auth.html';
        }
    } else {
        console.error('Элемент с id "authLink" не найден');
    }
});
