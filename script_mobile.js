document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');


    // Добавляем обработчик событий на кнопку
    menuToggle.addEventListener('click', function() {
        // Переключаем класс 'active' для меню и кнопки
        sideMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Закрытие меню при клике вне его области (на экране)
    window.addEventListener('click', function(event) {
        if (event.target !== sideMenu && event.target !== menuToggle && sideMenu.classList.contains('active')) {
            sideMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});
