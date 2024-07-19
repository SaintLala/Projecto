<?php
include 'db.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['userName'];
    $correo = $_POST['userEmail'];
    $contrasena = password_hash($_POST['userPassword'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO clientes_01 (Usuario, Correo, Contraseña) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $usuario, $correo, $contrasena);
    
    if ($stmt->execute()) {
        // Registro exitoso, mostrar alerta con el JavaScript y redireccionar para iniciar sesion
        echo '<script>alert("Registro exitoso"); window.location.href = "sesion.html";</script>';
    } else {
        // Error al registrar, mostrar alerta con el JavaScript
        echo '<script>alert("Error al registrar: ' . $stmt->error . '");</script>';
    }
    
    $stmt->close();
    $conn->close();
}
?>
