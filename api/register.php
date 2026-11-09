<?php
require __DIR__ . "/db.php";
header("Content-Type: application/json");

// Only accept POST requests (sending data), not GET (just visiting the URL).
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed."]);
  exit;
}

// Read the JSON that fetch() sends in the request body.
$data = json_decode(file_get_contents("php://input"), true);

$name     = trim($data["name"] ?? "");
$email    = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

// Server-side validation: the same rules as validation.js, checked again here.
if ($name === "" || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
  http_response_code(400);
  echo json_encode(["error" => "Please check your details."]);
  exit;
}

// Is the email already registered?
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->fetch()) {
  http_response_code(409);
  echo json_encode(["error" => "An account with this email already exists."]);
  exit;
}

// Save the new user, with a HASHED password.
$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
$stmt->execute([$name, $email, $hash]);

http_response_code(201);
echo json_encode(["message" => "Account created."]);