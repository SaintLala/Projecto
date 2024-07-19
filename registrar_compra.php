<?php
include 'db.php'; // Incluye el archivo que maneja la conexión a la base de datos

// Obtener los datos JSON enviados desde el cliente
$data = json_decode(file_get_contents("php://input"));

if (is_array($data)) {
    $stmt = $conn->prepare("INSERT INTO compras (nombreProducto, precio, cantidad) VALUES (?, ?, ?)");
    $stmt->bind_param("sdi", $nombreProducto, $precio, $cantidad);

    foreach ($data as $item) {
        $nombreProducto = $item->name;
        $precio = $item->price;
        $cantidad = $item->quantity;
        $stmt->execute();
    }
    $stmt->close();
    echo json_encode(["message" => "Compra registrada con éxito"]);
} else {
    echo json_encode(["error" => "Datos inválidos"]);
}

$conn->close();
?>
