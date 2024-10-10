document.addEventListener("DOMContentLoaded", function () {
    // Проверка, есть ли сохранённая страница в localStorage
    const lastPage = localStorage.getItem('lastPage');
    if (lastPage) {
        // Если есть, загружаем её
        loadPageContent(lastPage);
    }

    document.querySelectorAll('.friendHederbutton, .friendHederbuttonadd').forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                // Сохраняем текущую страницу в localStorage
                localStorage.setItem('lastPage', page);
                // Загрузка соответствующего контента
                loadPageContent(page);
            }
        });
    });
});

function loadPageContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error('Ошибка при загрузке страницы:', error);
        });
}
