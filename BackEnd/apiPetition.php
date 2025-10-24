<?php
    include 'FetchData.php';
    
    header('Content-Type: application/json'); 

    $petitions = getAllPetitions();
    $signatures = getNumberOfsignatursAllPetitions();
    $maxPetition = selectMaxSignedPetition();


    echo json_encode(['petitions' => $petitions, 'signatures' => $signatures , 'maxPetitionSignatur' => $maxPetition]);
?>
