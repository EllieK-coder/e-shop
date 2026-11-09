<?php
require __DIR__ . "/../api/db.php";

// Start fresh every time this script runs.
$pdo->exec("DROP TABLE IF EXISTS products");

$pdo->exec("
  CREATE TABLE products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    price       REAL NOT NULL,
    category    TEXT NOT NULL,
    image       TEXT,
    description TEXT,
    in_stock    INTEGER NOT NULL DEFAULT 1
  )
");

$products = [
  ["Wireless Headphones", 59.99, "Electronics", "https://picsum.photos/seed/headphones/400/300", "Over-ear Bluetooth headphones with 30h battery life.", 1],
  ["Mechanical Keyboard", 89.50, "Electronics", "https://picsum.photos/seed/keyboard/400/300", "RGB mechanical keyboard with brown switches.", 1],
  ["Cotton T-Shirt", 14.90, "Clothing", "https://picsum.photos/seed/tshirt/400/300", "Soft 100% cotton t-shirt, unisex fit.", 0],
  ["Denim Jacket", 49.00, "Clothing", "https://picsum.photos/seed/jacket/400/300", "Classic blue denim jacket.", 1],
  ["Ceramic Mug", 8.50, "Home", "https://picsum.photos/seed/mug/400/300", "350ml handmade ceramic mug.", 1],
  ["Desk Lamp", 24.99, "Home", "https://picsum.photos/seed/lamp/400/300", "LED desk lamp with adjustable brightness.", 1],
  ["JavaScript Book", 32.00, "Books", "https://picsum.photos/seed/jsbook/400/300", "A beginner-friendly guide to modern JavaScript.", 0],
  ["Notebook Set", 11.75, "Books", "https://picsum.photos/seed/notebook/400/300", "Pack of 3 dotted A5 notebooks.", 1],
];

$stmt = $pdo->prepare("
  INSERT INTO products (name, price, category, image, description, in_stock)
  VALUES (?, ?, ?, ?, ?, ?)
");

foreach ($products as $product) {
  $stmt->execute($product);
}

echo "Inserted " . count($products) . " products\n";C:\xampp\php\php.exe database\setup.php