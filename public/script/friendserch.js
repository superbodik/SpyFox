// friendserch.js
document.getElementById('addFriendForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // предотвращаем отправку формы

    const friendId = document.getElementById('friendId').value;
    const userId = 'ваш_userId'; // Замените на фактический ID пользователя, который выполняет добавление

    try {
        const response = await fetch('friends/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, friendId }),
        });

        const data = await response.text(); // Получаем текст ответа

        document.getElementById('responseMessage').innerText = data; // Отображаем сообщение пользователю
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        document.getElementById('responseMessage').innerText = 'Ошибка при добавлении в друзья.';
    }
});
