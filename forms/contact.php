<?php
// Set your receiving email address
$to = "arthur.espinosajr96@gmail.com";

// Get form fields
$name = strip_tags(trim($_POST["name"]));
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$subject = strip_tags(trim($_POST["subject"]));
$message = trim($_POST["message"]);

// Validate input
if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($subject) || empty($message)) {
  http_response_code(400);
  echo "Please complete the form and provide a valid email.";
  exit;
}

// Compose the email
$email_subject = "Contact Form: $subject";
$email_body = "You received a new message:\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n\n";
$email_body .= "Message:\n$message\n";

// Email headers
$headers = "From: $name <$email>";

// Send the email
if (mail($to, $email_subject, $email_body, $headers)) {
  http_response_code(200);
  echo "Your message has been sent. Thank you!";
} else {
  http_response_code(500);
  echo "Oops! Something went wrong and we couldn't send your message.";
}
?>

