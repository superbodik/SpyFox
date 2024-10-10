function handleRegistration(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }

    // Отправка данных на сервер
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/auth/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            alert(response.message); // Успешное сообщение
            window.location.href = './auth.html'; // Перенаправляем на страницу авторизации
        } else {
            const error = JSON.parse(xhr.responseText);
            alert('Ошибка регистрации. ' + error.message); // Сообщение об ошибке
        }
    };

    xhr.onerror = function () {
        alert('Произошла ошибка при выполнении запроса.');
    };

    // Убедитесь, что отправляете правильные данные
    xhr.send(JSON.stringify({ username, password })); // Отправляем данные на сервер
}
