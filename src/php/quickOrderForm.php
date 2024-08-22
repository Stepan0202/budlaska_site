<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Збираємо дані з форми
    $phone = $_POST['phone'];

    // Налаштування електронної пошти
    $to = "orders@budlaska.com.ua";
    $subject = "Швидке замовлення";
    $message = "Номер телефону: $phone\n";

    $headers = "From: no-reply@example.com\r\n"
             . "Content-Type: text/plain; charset=UTF-8";

    // Відправка електронної пошти
    if (mail($to, $subject, $message, $headers)) {
        echo "Ваше швидке замовлення було успішно відправлено.";
    } else {
        echo "Виникла помилка при відправці швидкого замовлення.";
    }
}
?>