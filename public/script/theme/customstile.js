document.addEventListener('DOMContentLoaded', function () {
    const backgroundColorPicker = document.getElementById('background-color');
    const textColorPicker = document.getElementById('text-color');
    const headerColorPicker = document.getElementById('header-color');
    const applyButton = document.getElementById('applyTheme');
    const resetButton = document.getElementById('resetTheme');

    // Загружаем сохраненную тему, если она есть
    const savedTheme = JSON.parse(localStorage.getItem('customTheme'));
    if (savedTheme) {
        applyCustomTheme(savedTheme);
        setPickerValues(savedTheme);
    }

    // Применение пользовательской темы
    applyButton.addEventListener('click', () => {
        const customTheme = {
            backgroundColor: backgroundColorPicker.value,
            textColor: textColorPicker.value,
            headerColor: headerColorPicker.value
        };
        
        // Применяем тему
        applyCustomTheme(customTheme);
        
        // Сохраняем тему в localStorage
        localStorage.setItem('customTheme', JSON.stringify(customTheme));
    });

    // Сброс темы
    resetButton.addEventListener('click', () => {
        localStorage.removeItem('customTheme');
        location.reload(); // Перезагружаем страницу, чтобы сбросить стили
    });

    // Функция для применения пользовательских стилей
    function applyCustomTheme(theme) {
        document.body.style.backgroundColor = theme.backgroundColor;
        document.body.style.color = theme.textColor;
        document.querySelector('header').style.backgroundColor = theme.headerColor;
    }

    // Устанавливаем значения пикеров на основе сохраненной темы
    function setPickerValues(theme) {
        backgroundColorPicker.value = theme.backgroundColor;
        textColorPicker.value = theme.textColor;
        headerColorPicker.value = theme.headerColor;
    }
});
