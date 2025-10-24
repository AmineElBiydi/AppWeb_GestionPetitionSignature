<?php

    include 'FetchData.php';

    header('Content-Type: application/json');

    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];
    $country = $_POST['country'];
    $idp = $_POST['idp'];

    if( !signaturExist($idp, $email) ){
        signerPetition($idp, $nom, $prenom, $country, $email) ;
        echo json_encode(['success' => true, 'message' => 'Signature saved successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'This signature already exists!']);
    }
 
?>