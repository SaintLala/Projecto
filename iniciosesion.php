<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['userEmail'];
    $contrasena = $_POST['userPassword'];

    // Corrige la consulta SQL
    $sql = "SELECT Usuario, Contraseña FROM clientes_01 WHERE Correo = ?"; //Nombres de los campos de la tabla

    $stmt = $conn->prepare($sql);

    // Verificar si la preparación fue exitosa
    if ($stmt === false) {
        die("Error preparando la consulta: " . $conn->error);
    }

    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($usuario, $hashed_password);
        $stmt->fetch();

        // Verifica la contraseña
        if (password_verify($contrasena, $hashed_password)) {
            $_SESSION['Usuario'] = $usuario;
             // Redirigir a la página principal de tu sitio
            echo '<script>alert("¡Bienvenido!"); window.location.href = "index.html";</script>';
            exit(); // Sale después de terminar la ejecución del script
        } else {
            echo "Contraseña incorrecta";
        }
    } else {
        echo "Correo electrónico no encontrado";
    }

    $stmt->close();
    $conn->close();
}
?>

