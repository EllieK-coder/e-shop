<?php
require __DIR__ . "/db.php";

// Tell the browser this response is JSON, not an HTML page.
header("Content-Type: application/json");

$stmt = $pdo->query("
  SELECT id, name, price, category, image, description, in_stock AS inStock
  FROM products
  ORDER BY id
");

$products = $stmt->fetchAll();

// SQLite stores true/false as 1/0, so convert it back for JavaScript.
$products = array_map(function ($product) {
  $product["inStock"] = (bool) $product["inStock"];
  return $product;
}, $products);

echo json_encode($products);