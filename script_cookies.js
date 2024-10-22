document.addEventListener('DOMContentLoaded', () => {
    const cookiePopup = document.getElementById('cookie-notification');
    const acceptButton = document.getElementById('accept-cookies');
    const declineButton = document.getElementById('decline-cookies');
     const closeBtnscookies = document.querySelectorAll('.close-btn-cookies');

    closeBtnscookies.forEach(btn => {
        btn.addEventListener('click', function () {
           cookiePopup.classList.add('hidden');
        });
    });

    // Проверка наличия куки, чтобы не показывать сообщение снова
    if (!localStorage.getItem('cookiesAccepted') && !localStorage.getItem('cookiesDeclined')) {
        cookiePopup.classList.remove('hidden');
    }

    // Обработчик нажатия на кнопку "Принять"
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiePopup.classList.add('hidden');
    });

    // Обработчик нажатия на кнопку "Отказаться"
    declineButton.addEventListener('click', () => {
        localStorage.setItem('cookiesDeclined', 'true');
        cookiePopup.classList.add('hidden');
    });
});
