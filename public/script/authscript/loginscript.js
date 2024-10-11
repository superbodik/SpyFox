// Функция для входа пользователя
function handleLogin(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/auth/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            // Сохраняем sessionId в локальном хранилище
            localStorage.setItem('sessionId', response.sessionId); // Предполагается, что вы возвращаете sessionId с сервера
            alert(response.message); // Успешное сообщение
            window.location.href = './index.html'; // Перенаправляем на основную страницу
        } else {
            const error = JSON.parse(xhr.responseText);
            alert('Ошибка авторизации. ' + error.message); // Сообщение об ошибке
        }
    };

    xhr.onerror = function () {
        alert('Произошла ошибка при выполнении запроса.');
    };

    xhr.send(JSON.stringify({ username, password }));
}

document.getElementById('authForm').addEventListener('submit', handleLogin);
