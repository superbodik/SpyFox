// Получаем элементы DOM
const addFriendBtn = document.getElementById('addFriendBtn');
const friendUsernameInput = document.getElementById('friendUsername');
const friendList = document.getElementById('friendList');
const chatList = document.getElementById('chatList');

let friends = []; // Хранит список друзей
let chats = {}; // Хранит чаты

// Получаем userId из localStorage
const userId = localStorage.getItem('userId');

if (!userId) {
    alert('Ошибка: ID пользователя не найден. Пожалуйста, авторизуйтесь.');
}

// Функция для добавления друга
addFriendBtn.addEventListener('click', () => {
    const username = friendUsernameInput.value.trim();

    // Проверяем, валидное ли имя пользователя и нет ли его в списке друзей
    if (username && !friends.includes(username)) {
        friends.push(username); // Добавляем друга в массив
        renderFriendList(); // Обновляем отображение списка друзей

        // Отправка запроса на сервер для добавления друга
        fetch('/friends/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, friendUsername: username }), // Отправляем userId и friendUsername
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`Друг ${username} добавлен успешно.`);
            } else {
                console.error(`Не удалось добавить друга: ${data.error}`);
                // Удаляем друга из массива, если добавление не удалось
                friends.pop();
                renderFriendList();
            }
        })
        .catch(error => console.error('Ошибка при добавлении друга:', error));

        friendUsernameInput.value = ''; // Очищаем поле ввода
    } else {
        alert('Ошибка: имя пользователя пустое или друг уже добавлен!');
    }
});

// Функция для рендеринга списка друзей
function renderFriendList() {
    friendList.innerHTML = ''; // Очищаем текущий список

    // Создаем элементы списка для каждого друга
    friends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend;
        li.addEventListener('click', () => openChat(friend)); // Открыть чат с другом
        friendList.appendChild(li);
    });
}

// Функция для открытия чата
function openChat(friend) {
    // Если чат с другом уже открыт, просто возвращаемся
    if (document.querySelector(`.chat-container[data-friend="${friend}"]`)) {
        return;
    }

    if (!chats[friend]) {
        chats[friend] = []; // Создаем новый чат, если его еще нет
    }

    // Создаем контейнер для чата
    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');
    chatContainer.setAttribute('data-friend', friend); // Уникальный атрибут для идентификации чата
    chatContainer.innerHTML = `<h3>Чат с ${friend}</h3>`;

    // Создаем список сообщений
    const messageList = document.createElement('ul');
    chats[friend].forEach(message => {
        const messageItem = document.createElement('li');
        messageItem.textContent = message;
        messageList.appendChild(messageItem);
    });

    chatContainer.appendChild(messageList);
    document.body.appendChild(chatContainer); // Добавляем чат в тело документа
}
