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
    $quantity = $_POST['quantity'];
    $deliveryService = $_POST['deliveryService'];
    $deliveryMethod = isset($_POST['novaPoshtaDeliveryMethod']) ? $_POST['novaPoshtaDeliveryMethod'] : 'Не вказано';
    $postamatNumber = isset($_POST['postamatNumber']) ? $_POST['postamatNumber'] : "Не вказано";
    $branchNumber = isset($_POST['branchNumber']) ? $_POST['branchNumber'] : "Не вказано";
    $courierCity = isset($_POST['courierCity']) ? $_POST['courierCity'] : "Не вказано";
    $courierStreet = isset($_POST['courierStreet']) ? $_POST['courierStreet'] : "Не вказано";
    $houseNumber = isset($_POST['houseNumber']) ? $_POST['houseNumber'] : "Не вказано";
    $apartmentNumber = isset($_POST['apartmentNumber']) ? $_POST['apartmentNumber'] : "Не вказано";
    $ukrPoshtaBranchNumber = isset($_POST['ukrPoshtaBranchNumber']) ? $_POST['ukrPoshtaBranchNumber'] : "Не вказано";

    // Налаштування електронної пошти
    $toAdmin = "orders@budlaska.com.ua";
    $subjectAdmin = "Нове замовлення";
    $messageAdmin = "Прізвище: $secondName\n"
                . "Ім'я: $name\n"
                . "По-батькові: $lastName\n"
                . "Eлектрона адреса: $mail\n"
                . "Номер телефону: $phone\n"
                . "Місто: $city\n"
                . "Служба доставки: $deliveryService\n"
                . "Спосіб доставки: $deliveryMethod\n"
                . "Номер поштомату: $postamatNumber\n"
                . "Номер відділення НП: $branchNumber\n"
                . "Вулиця: $courierStreet\n"
                . "Будинок: $houseNumber\n"
                . "Квартира: $apartmentNumber\n"
                . "Номер відділення Укрпошти: $ukrPoshtaBranchNumber\n"
                . "Номер відділення: $postOffice\n"
                . "Не телефонуйте мені: $dontCall\n"
                . "Кількість: $quantity\n";
    
    $headers = "From: order_confirmation@budlaska.com\r\n"
             . "Content-Type: text/plain; charset=UTF-8";
    
    // Відправка електронної пошти адміністратору
    if (mail($toAdmin, $subjectAdmin, $messageAdmin, $headers)) {
        // Відправка підтвердження клієнту
        $subjectCustomer = "Ваше замовлення було отримано";
        $messageCustomer = "Шановний $name $secondName,\n\n"
                         . "Дякуємо за ваше замовлення! Ось деталі вашого замовлення:\n"
                         . "Кількість: $quantity\n"
                         . "Місто: $city\n"
                         . "Служба доставки: $deliveryService\n"
                         . "Номер телефону: $phone\n"
                         . "Ми зв'яжемось з вами найближчим часом.\n\n"
                         . "З повагою,\n"
                         . "Команда BudLaska";
    
        // Відправка електронної пошти клієнту
        if (mail($mail, $subjectCustomer, $messageCustomer, $headers)) {
            // Після успішної відправки листів перенаправляємо на сторінку подяки
            header("Location: /thanks.html");
            exit(); // Не забудьте завершити виконання скрипта після перенаправлення
        } else {
            echo "Замовлення відправлено, але виникла помилка при відправці підтвердження на електронну пошту клієнта.";
        }
    } else {
        error_log("Error sending email to customer: " . error_get_last()['message']);
        echo "There was an error processing your order. Please try again later.";
    }
    }
}
?>
