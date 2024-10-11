// Функция для регистрации пользователя
async function handleRegistration(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }

    try {
        // Отправка данных на сервер
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Убедитесь, что отправляете правильные данные
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Успешное сообщение
            window.location.href = './auth.html'; // Перенаправляем на страницу авторизации
        } else {
            const error = await response.json();
            alert('Ошибка регистрации. ' + error.message); // Сообщение об ошибке
        }
    } catch (error) {
        alert('Произошла ошибка при выполнении запроса.');
        console.error('Ошибка:', error); // Логируем ошибку для отладки
    }
}

document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
