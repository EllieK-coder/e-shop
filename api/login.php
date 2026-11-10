<?php
session_start();
require __DIR__ . "/db.php";
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed."]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$email    = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

$stmt = $pdo->prepare("SELECT id, name, password_hash FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user["password_hash"])) {
  http_response_code(401);
  echo json_encode(["error" => "Wrong email or password."]);
  exit;
}

session_regenerate_id(true);
$_SESSION["user_id"]   = $user["id"];
$_SESSION["user_name"] = $user["name"];

echo json_encode(["name" => $user["name"]]);