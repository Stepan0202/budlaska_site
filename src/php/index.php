<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Збираємо дані з форми
    $secondName = $_POST['secondName'];
    $name = $_POST['name'];
    $lastName = $_POST['lastName'];
    $mail = $_POST['mail'];
    $phone = $_POST['phone'];
    $city = $_POST['city'];
    $postOffice = $_POST['postOffice'];
    $dontCall = isset($_POST['dontCall']) ? 'Так' : 'Ні';

    // Налаштування електронної пошти
    $to = "orders@budlaska.com.ua";
    $subject = "Нове замовлення";
    $message = "Прізвище: $secondName\n"
             . "Ім'я: $name\n"
             . "По-батькові: $lastName\n"
             . "Eлектрона адреса: $mail\n"
             . "Номер телефону: $phone\n"
             . "Місто: $city\n"
             . "Номер відділення: $postOffice\n"
             . "Не телефонуйте мені: $dontCall\n";
             $headers = "From: no-reply@example.com\r\n"
             . "Content-Type: text/plain; charset=UTF-8";

    // Відправка електронної пошти
    if (mail($to, $subject, $message, $headers)) {
        echo "Ваше замовлення було успішно відправлено.";
    } else {
        echo "Виникла помилка при відправці замовлення.";
    }
}
?>