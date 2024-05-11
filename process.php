<?php
// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];

  // Email content (modify as needed)
  $subject = 'Crystal Cove Order Confirmation';
  $message = "Thank you, $name, for your order! We will notify you when your items are shipped.";
  $headers = 'From: Crystal Cove <info@crystalcove.com>' . "\r\n" .
            'Reply-To: info@crystalcove.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

  // Send the email
  if (mail($email, $subject, $message, $headers)) {
    echo 'Your order has been submitted! You will receive a confirmation email shortly.';
  } else {
    echo 'Error sending email notification.';
  }
} else {
  // Redirect to the shop page if accessed directly
  header('Location: index.html');
}
?>
