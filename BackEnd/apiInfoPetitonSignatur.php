<?php
    header('Content-Type: application/json');

    include 'FetchData.php';

    $idp = $_GET['id'];

    if($idp == 0 ){
        $signaturesNbr = getNbSignatures($idp);
        echo json_encode($signaturesNbr);
    }else {
        $signatures = getLastSignatures($idp);
        echo json_encode($signatures);
    }
    
    
    
?>