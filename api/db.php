<?php
// One shared connection to the SQLite database.
$pdo = new PDO("sqlite:" . __DIR__ . "/../database/eshop.db");

// Throw an error if a query fails, instead of failing silently.
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Return rows as ["name" => "Mug", ...] instead of numbered columns.
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);