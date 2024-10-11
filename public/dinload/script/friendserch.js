document.getElementById('sendFriendRequest').addEventListener('click', function() {
    const friendID = document.getElementById('friendSearch').value.trim(); // Получаем введенный ID

    if (friendID) {
        sendFriendRequest(friendID);
    } else {
        alert('Введите ID пользователя');
    }
});

function sendFriendRequest(friendID) {
    // Здесь мы делаем POST-запрос на сервер для отправки запроса в друзья
    fetch('/api/add-friend', { // Убедитесь, что путь '/api/add-friend' соответствует вашему маршруту на сервере
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendID: friendID })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Запрос на добавление в друзья отправлен!');
        } else {
            alert('Ошибка: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Ошибка при отправке запроса:', error);
        alert('Не удалось отправить запрос в друзья');
    });
}
