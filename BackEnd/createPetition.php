<?php
    include 'FetchData.php';

    header('Content-Type: application/json');

    $titre = strtolower($_POST['titre']);
    $description = strtolower($_POST['description']);
    $nomPorteur = strtolower($_POST['nomPorteur']);
    $emailPorteur = strtolower($_POST['emailPorteur']);
    $dateFin = $_POST['dateFin'];

    // Validate that end date is in the future
    $today = date('Y-m-d');
    if ($dateFin <= $today) {
        echo json_encode(['success' => false, 'message' => 'End date must be in the future!']);
        exit;
    }

    if (!isset($_SESSION['emailU'])) {
        echo json_encode(['success' => false, 'message' => 'You must be logged in to create a petition.']);
        exit;
    }
    $emailU = strtolower($_SESSION['emailU']);

    try {
        if( ! petitionExist($titre) ){
            addPetition($titre, $description, $nomPorteur, $emailPorteur, $dateFin,$emailU);
               
            echo json_encode(['success' => true, 'message' => 'Petition created successfully!']);
        }else {
            echo json_encode(['success' => false, 'message' => 'Failed to create petition. It already existe.']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Failed to create petition. Please try again.']);
    }
 
?>
