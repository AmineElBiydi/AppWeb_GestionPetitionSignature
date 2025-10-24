<?php
    include 'FetchData.php';
    header('Content-Type: application/json');

    if (!isset($_SESSION['emailU'])) {
        http_response_code(401); // Unauthorized
        echo json_encode(['error' => 'User not logged in.']);
        exit;
    }

    $userEmail = $_SESSION['emailU'];
    $petitions = getUserPetitions($userEmail);
    echo json_encode($petitions);
?>