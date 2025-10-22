<?php
    
    header('Content-Type: application/json'); 

    include 'FetchData.php';


    $petitions = getAllPetitions();
    $signatures = getNumberOfsignatursAllPetitions();

    echo json_encode(['petitions' => $petitions, 'signatures' => $signatures]);
?>
