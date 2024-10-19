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
            const token = response.sessionId; // Токен хранится в sessionId

            localStorage.setItem('token', token);

            alert(response.message);

            // Изменение кнопки после успешной авторизации
            const authLink = document.getElementById('authLink');
            if (authLink) {
                authLink.textContent = 'Открыть приложение';
                authLink.href = '/app/@me';
            }

            window.location.href = './index.html'; // Перенаправление на основную страницу
        } else {
            const error = JSON.parse(xhr.responseText);
            alert('Ошибка авторизации. ' + error.message);
        }
    };

    xhr.onerror = function () {
        alert('Произошла ошибка при выполнении запроса.');
    };

    xhr.send(JSON.stringify({ username, password }));
}

document.getElementById('authForm').addEventListener('submit', handleLogin);
