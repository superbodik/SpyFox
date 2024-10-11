document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', async function(event) {
        if (event.target && event.target.id === 'sendFriendRequest') {
            await sendFriendRequest();
        }
    });
});

async function sendFriendRequest() {
    const friendId = document.getElementById('friendSearch').value;

    // Здесь вы можете добавить какой-то индикатор загрузки или сообщение
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '<p>Отправка запроса...</p>'; // Сообщение о процессе

    try {
        const response = await fetch('http://localhost:3000/friends/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: 'YOUR_USER_ID', friendId }) // Замените на реальный ID
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            searchResults.innerHTML = `<p>${errorMessage}</p>`;
            throw new Error('Ошибка при отправке запроса.');
        }

        const data = await response.text();
        searchResults.innerHTML = `<p>${data}</p>`;
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        searchResults.innerHTML = `<p>Ошибка: ${error.message}</p>`;
    }
}
