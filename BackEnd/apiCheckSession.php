<?php
    session_start();
    header('Content-Type: application/json');

    if (isset($_SESSION['emailU']) && isset($_SESSION['nameU'])) {
        echo json_encode([
            'loggedIn' => true,
            'name' => $_SESSION['nameU'],
            'email' => $_SESSION['emailU']
        ]);
    } else {
        echo json_encode(['loggedIn' => false]);
    }
?>
