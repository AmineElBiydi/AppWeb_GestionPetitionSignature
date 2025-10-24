<?php
    include 'FetchData.php';
    header('Content-Type: application/json');

    if (!isset($_SESSION['emailU'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized access.']);
        exit;
    }

    if (!isset($_POST['idp'])) {
        echo json_encode(['success' => false, 'message' => 'Petition ID not provided.']);
        exit;
    }

    $petitionId = $_POST['idp'];
    $userEmail = $_SESSION['emailU'];

    $success = deletePetition($petitionId, $userEmail);
    echo json_encode(['success' => $success, 'message' => $success ? 'Petition deleted.' : 'Failed to delete petition. You may not be the owner.']);
?>