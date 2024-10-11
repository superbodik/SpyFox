function loadAddFriendForm() {
    const addFriendContainer = document.getElementById('addFriendContainer');
    addFriendContainer.innerHTML = `
        <form id="addFriendForm">
            <input type="text" id="friendId" placeholder="Введите friendCode друга" required>
            <button type="submit">Добавить друга</button>
        </form>
        <div id="responseMessage"></div>
    `;

    const addFriendForm = document.getElementById('addFriendForm');
    addFriendForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // предотвращаем отправку формы

        const friendId = document.getElementById('friendId').value.trim(); // friendCode друга
        const userId = localStorage.getItem('userId'); // Получаем ID пользователя из локального хранилища
        const token = localStorage.getItem('token'); // Получаем токен из локального хранилища

        console.log('userId:', userId); // Отладка: выводим userId

        if (!userId) {
            document.getElementById('responseMessage').innerText = 'Ошибка: ID пользователя не найден';
            return;
        }

        if (!friendId) {
            document.getElementById('responseMessage').innerText = 'Ошибка: friendCode не может быть пустым';
            return;
        }

        try {
            // Шаг 1: Ищем пользователя с таким friendId
            const searchResponse = await fetch(`/friends/search/${friendId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Используем токен для аутентификации
                },
            });

            // Проверяем, существует ли такой пользователь
            if (!searchResponse.ok) {
                const errorData = await searchResponse.json(); // Получаем сообщение об ошибке
                document.getElementById('responseMessage').innerText = errorData.message;
                return;
            }

            // Пользователь найден
            const userFound = await searchResponse.json(); // Получаем данные о пользователе

            // Шаг 2: Отправляем запрос на добавление в друзья
            const addResponse = await fetch('/friends/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Используем токен для аутентификации
                },
                body: JSON.stringify({ userId, friendId }), // отправляем и userId, и friendId
            });

            // Проверяем статус ответа
            if (!addResponse.ok) {
                const errorData = await addResponse.json(); // Парсим ответ как JSON
                document.getElementById('responseMessage').innerText = errorData.message; // Показываем сообщение об ошибке
                return;
            }

            // Если добавление прошло успешно
            const data = await addResponse.json(); // Получаем данные о добавлении
            document.getElementById('responseMessage').innerText = data.message; // Показываем сообщение об успехе

            // Очистка поля ввода после успешного добавления
            document.getElementById('friendId').value = '';
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            document.getElementById('responseMessage').innerText = 'Ошибка при добавлении в друзья.';
        }
    });
}

// Вызываем функцию загрузки формы при загрузке страницы
document.addEventListener('DOMContentLoaded', loadAddFriendForm);
