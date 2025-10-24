<?php
    
    header('Content-Type: application/json'); 

    include 'FetchData.php';

    $idp = $_GET['id'] ;

    if( $idp == 0 ){
        $nbrPetition = selectNbrTotalePetition();
        echo json_encode($nbrPetition);
    }else {
        $petition = getPetition($idp);
        echo json_encode($petition);    
    }

    
    
?>
