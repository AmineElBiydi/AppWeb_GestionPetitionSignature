<?php
    
    header('Content-Type: application/json'); 

    include 'FetchData.php';

    $idp = isset($_GET['id'])? $_GET['id'] : 1;

    $petition = getPetition($idp);

    
    echo json_encode($petition);
    
?>
