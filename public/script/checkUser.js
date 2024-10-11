document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert('Ошибка: ID пользователя не найден. Пожалуйста, авторизуйтесь.');
        window.location.href = 'auth.html'; // Перенаправляем на страницу авторизации
    } else {
        console.log('Пользователь успешно авторизован. ID:', userId);
        // Продолжайте с инициализацией приложения
    }
});
