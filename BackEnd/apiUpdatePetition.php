<?php
    include 'FetchData.php';
    header('Content-Type: application/json');

    if (!isset($_SESSION['emailU'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized access.']);
        exit;
    }

    if (!isset($_POST['idp']) || !isset($_POST['description']) || !isset($_POST['dateFin'])) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
        exit;
    }

    $petitionId = $_POST['idp'];
    $description = strtolower($_POST['description']);
    $dateFin = $_POST['dateFin'];
    $userEmail = $_SESSION['emailU'];

    $success = updatePetition($petitionId, $description, $dateFin, $userEmail);

    echo json_encode(['success' => $success, 'message' => $success ? 'Petition updated successfully.' : 'Failed to update petition. You may not be the owner.']);
?>