const addFriendBtn = document.getElementById('addFriendBtn');
const friendUsernameInput = document.getElementById('friendUsername');
const friendList = document.getElementById('friendList');
const chatList = document.getElementById('chatList');

let friends = []; // Хранит список друзей
let chats = {}; // Хранит чаты

// Функция для добавления друга
addFriendBtn.addEventListener('click', () => {
    const username = friendUsernameInput.value.trim();

    if (username && !friends.includes(username)) {
        friends.push(username); // Добавляем друга в массив
        renderFriendList(); // Обновляем отображение списка друзей
        friendUsernameInput.value = ''; // Очищаем поле ввода
    } else {
        alert('Друзья уже добавлены или имя пользователя пустое!');
    }
});

// Функция для рендеринга списка друзей
function renderFriendList() {
    friendList.innerHTML = ''; // Очищаем текущий список

    friends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend;
        li.addEventListener('click', () => openChat(friend)); // Открыть чат с другом
        friendList.appendChild(li);
    });
}

// Функция для открытия чата
function openChat(friend) {
    if (!chats[friend]) {
        chats[friend] = []; // Создаем новый чат, если его еще нет
    }

    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');
    chatContainer.innerHTML = `<h3>Чат с ${friend}</h3>`;
    
    // Здесь можно добавить элементы чата, например, сообщения
    const messageList = document.createElement('ul');
    chats[friend].forEach(message => {
        const messageItem = document.createElement('li');
        messageItem.textContent = message;
        messageList.appendChild(messageItem);
    });

    chatContainer.appendChild(messageList);
    document.body.appendChild(chatContainer); // Добавляем чат в тело документа
}
