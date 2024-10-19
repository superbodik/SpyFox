let micButton = document.getElementById('micButton');
let headphonesButton = document.getElementById('headphonesButton');
let settingsButton = document.getElementById('settingsButton');

let micIcon = document.getElementById('micIcon');
let headphonesIcon = document.getElementById('headphonesIcon');

let isMicMuted = false;
let areHeadphonesMuted = false;

micButton.addEventListener('click', () => {
    isMicMuted = !isMicMuted;
    if (isMicMuted) {
        micIcon.src = '/path/to/mic-on-icon.png';  // Иконка для включенного микрофона
        headphonesButton.classList.remove('muted');
        headphonesIcon.src = '/path/to/headphones-off-icon.png';
        areHeadphonesMuted = true;  // Отключаем наушники при включении микрофона
    } else {
        micIcon.src = '/path/to/mic-off-icon.png';  // Иконка для выключенного микрофона
    }
});

headphonesButton.addEventListener('click', () => {
    areHeadphonesMuted = !areHeadphonesMuted;
    if (areHeadphonesMuted) {
        headphonesIcon.src = '/path/to/headphones-on-icon.png';  // Иконка для включенных наушников
    } else {
        headphonesIcon.src = '/path/to/headphones-off-icon.png';  // Иконка для выключенных наушников
    }
});

// Для кнопки настроек можно добавить логику открытия настроек
settingsButton.addEventListener('click', () => {
    alert('Открыть настройки...');
});
