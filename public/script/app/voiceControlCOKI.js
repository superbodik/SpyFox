let micAccessGranted = false; // Флаг для отслеживания доступа к микрофону
let headphonesAccessGranted = false; // Флаг для отслеживания доступа к наушникам

// Запрос доступа к микрофону
function requestAudioPermissions() {
    const constraints = { audio: true };
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            micAccessGranted = true;
            console.log("Доступ к микрофону получен");
            document.getElementById('micButton').classList.remove('disabled');
        })
        .catch((error) => {
            console.error("Ошибка доступа к микрофону:", error);
            alert("Не удалось получить доступ к микрофону.");
        });
}

// Проверка наушников
function getAudioDevices() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            devices.forEach(device => {
                if (device.kind === 'audiooutput') {
                    headphonesAccessGranted = true;
                    console.log('Наушники подключены: ' + device.label);
                }
            });
        })
        .catch(err => {
            console.error('Ошибка при получении устройств:', err);
        });
}

// Запросить доступ и обновить интерфейс
document.getElementById('micButton').addEventListener('click', () => {
    if (!micAccessGranted) {
        requestAudioPermissions();
    }
});

document.getElementById('headphonesButton').addEventListener('click', () => {
    if (!headphonesAccessGranted) {
        getAudioDevices();
    }
});

// Инициализация при загрузке
requestAudioPermissions();
getAudioDevices();
