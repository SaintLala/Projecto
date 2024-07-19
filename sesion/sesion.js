const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      containerFormRegister = document.querySelector(".register"),
      containerFormLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e => {
    containerFormRegister.classList.add("hide");
    containerFormLogin.classList.remove("hide")
})

btnSignUp.addEventListener("click", e => {
    containerFormLogin.classList.add("hide");
    containerFormRegister.classList.remove("hide")
})
document.addEventListener("DOMContentLoaded", function() {
    // Obtenemos el formulario de registro
    var formRegister = document.querySelector(".form-register");
    
    // Agregamos un listener para el evento submit del formulario
    formRegister.addEventListener("submit", function(event) {
        // Evitamos el envío normal del formulario
        event.preventDefault();
        
        // Verificamos si el formulario es válido
        if (this.checkValidity()) {
            // Enviamos el formulario de manera normal
            this.submit();
            
            // Recargamos la página después de 1 segundo
            setTimeout(function() {
                location.reload();
            }, 1000);
        } else {
            // Si el formulario no es válido, se muestra un mensaje de error
            alert("Por favor, completa todos los campos correctamente.");
        }
    });
});




 
 