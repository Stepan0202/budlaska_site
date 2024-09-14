<?php
$to = "stepan020293@gmail.com";
$subject = "Test Email from cPanel Server";
$message = "This is a test email to check if the mail function is working.";
$headers = "From: order_confirmation@budlaska.com\r\n"
         . "Content-Type: text/plain; charset=UTF-8";

if (mail($to, $subject, $message, $headers)) {
    echo "Test email sent successfully.";
} else {
    echo "Failed to send test email.";
}
?>