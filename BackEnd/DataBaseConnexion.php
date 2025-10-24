<?php
    $serverName = "localhost";
    $dbName = "tp3";
    $userName = "root";
    $password = "";

    try {
        $DATA_BASE = new PDO("mysql:host=$serverName;dbname=$dbName", $userName, $password);
        // Set the PDO error mode to exception for better error handling
        $DATA_BASE->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
        // Stop execution and prevent leaking database details in case of an error.
        // In a production environment, you would log this error instead of echoing.
        http_response_code(500); // Internal Server Error
        die(json_encode(['error' => 'Database connection failed.']));
    }

?>