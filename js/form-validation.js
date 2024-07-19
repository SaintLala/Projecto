// js/form-validation.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form'); // Selecciona tu formulario

    form.addEventListener('submit', (event) => {
        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const phone = form.querySelector('input[type="number"]').value.trim();
        const message = form.querySelector('textarea').value.trim();

        let valid = true;

        // Validación de campos obligatorios
        if (name === '') {
            valid = false;
            alert("Por favor, ingresa tu nombre."); // Mensaje de error
        }

        if (email === '') {
            valid = false;
            alert("Por favor, ingresa tu correo electrónico."); // Mensaje de error
        }

        if (phone === '') {
            valid = false;
            alert("Por favor, ingresa tu número de teléfono."); // Mensaje de error
        }

        if (message === '') {
            valid = false;
            alert("Por favor, escribe tu mensaje."); // Mensaje de error
        }

        // Validación de formato de correo electrónico
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para correo electrónico
        if (!emailPattern.test(email)) {
            valid = false;
            alert("Por favor, ingresa un correo electrónico válido."); // Mensaje de error
        }

        // Validación de longitud del número de teléfono
        if (phone.length < 9) {
            valid = false;
            alert("El número de teléfono debe tener al menos 9 dígitos."); // Mensaje de error
        }

        if (!valid) {
            event.preventDefault(); // Evita el envío del formulario si hay errores
        }
    });
});
