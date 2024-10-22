document.addEventListener('DOMContentLoaded', function () {
    const openPopupButtons = document.querySelectorAll('.contact-sales-btn');
    const popup = document.getElementById('popup');
    const closeBtns = document.querySelectorAll('.close-btn');
    const closeBtns1 = document.querySelectorAll('.close-btn-submit');
    const registrationForm = document.getElementById('registration-form');
    const errorMessage = document.getElementById('error-message');
    const thankYouMessage = document.getElementById('thank-you-message');
    const registrationFormContainer = document.getElementById('registration-form-container');
    const phoneInput = document.getElementById('phone');
    const countryCodeSelect = document.getElementById('countryCode');
    const countryCodeDisplay = document.getElementById('countryCodeDisplay');
    openPopupButtons.forEach(button => {
        button.addEventListener('click', function () {
            popup.style.display = 'block';
        });
    });
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            popup.style.display = 'none';
        });
    });
    closeBtns1.forEach(btn => {
        btn.addEventListener('click', function () {
            popup.style.display = 'none';
        });
    });
    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
    // Initialize phone input mask
    function applyPhoneMask(value) {
        value = value.replace(/\D/g, '');
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue += `(${value.slice(0, 3)})`;
        }
        if (value.length > 3) {
            formattedValue += ` ${value.slice(3, 6)}`;
        }
        if (value.length > 6) {
            formattedValue += `-${value.slice(6, 8)}`;
        }
        if (value.length > 8) {
            formattedValue += `-${value.slice(8, 10)}`;
        }
        return formattedValue;
    }
    phoneInput.value = applyPhoneMask(phoneInput.value);
    phoneInput.addEventListener('input', function () {
        phoneInput.value = applyPhoneMask(phoneInput.value);
    });
    phoneInput.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            let value = phoneInput.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = value.slice(0, -1);
            }
            phoneInput.value = applyPhoneMask(value);
        }
    });
    countryCodeSelect.addEventListener('change', function () {
        countryCodeDisplay.textContent = countryCodeSelect.value;
    });
    // Initialize country code display
    countryCodeDisplay.textContent = countryCodeSelect.value;
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formInputs = registrationForm.querySelectorAll('input[required], select[required]');
        let allFilled = true;
        formInputs.forEach(input => {
            if (!input.value) {
                allFilled = false;
                input.classList.add('input-error');
            }
            else {
                input.classList.remove('input-error');
            }
        });
        // Additional validation for phone number
        const phoneValue = phoneInput.value.replace(/\D/g, ''); // Remove non-digit characters
        if (phoneValue.length !== 10) {
            allFilled = false;
            phoneInput.classList.add('input-error');
        }
        else {
            phoneInput.classList.remove('input-error');
        }
        if (allFilled) {
            registrationFormContainer.style.display = 'none';
            thankYouMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            popup.style.display = 'block'; // Keep the popup open
        }
        else {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Пожалуйста заполните все обязательные поля';
        }
    });
});
