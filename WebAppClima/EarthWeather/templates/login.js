document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('username');
    const usernameLabel = usernameInput.parentElement.querySelector('.mdc-floating-label');

    // Manejar clic dentro del campo de búsqueda
    usernameInput.addEventListener('focus', function () {
        usernameLabel.classList.add('hide');
    });

    // Manejar clic fuera del campo de búsqueda
    document.addEventListener('click', function (event) {
        if (!usernameInput.contains(event.target)) {
            usernameLabel.classList.remove('hide');
        }
    });
});

function updateLabel(inputId) {
    const input = document.getElementById(inputId);
    const label = input.parentElement.querySelector('.mdc-floating-label');
    if (input.value !== '') {
        label.style.display = 'none';
    } else {
        label.style.display = 'block';
    }
}

function submitForm(event) {
    event.preventDefault();
    console.log('Formulario enviado');
}
