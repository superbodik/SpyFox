document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки в friendHeder
    const buttons = document.querySelectorAll('.friendHederbutton, .friendHederbuttonadd');

    // Добавляем обработчики событий на каждую кнопку
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            loadPageComponent(page); // Загружаем компонент с указанной страницы
        });
    });

    // Функция для загрузки содержимого из внешнего HTML файла
    function loadPageComponent(page) {
        const contentDiv = document.getElementById('content');

        // Загружаем содержимое страницы через fetch
        fetch(`dinload/${page}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки страницы');
                }
                return response.text();
            })
            .then(html => {
                contentDiv.innerHTML = html;
            })
            .catch(error => {
                contentDiv.innerHTML = `<p>Ошибка загрузки: ${error.message}</p>`;
            });
    }
});
