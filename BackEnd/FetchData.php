<?php
    session_start();

    include 'DataBaseConnexion.php';

    function getAllPetitions(){
        
        global $DATA_BASE ;
        $query = "SELECT * FROM petition ORDER BY IDP DESC";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute();
        $petition = $statement->fetchAll() ;
        return $petition ;

    }

    function getNumberOfsignatursAllPetitions(){

        global $DATA_BASE ;
        $query = "select IDP , count(*) as nbr from signature group by IDP ";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll() ;
        $finalResult = [];
        foreach($result as $row){
            $finalResult[$row['IDP']] = $row['nbr'];
        }
        
        return $finalResult ;

    }

    function getPetition($idp){ 
        global $DATA_BASE ;
        $query = "SELECT * FROM petition WHERE IDP = ?";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([$idp]);
        $result = $statement->fetch(PDO::FETCH_ASSOC) ; // Fetch a single associative array
        
         if (!$result ) {
             return null; // If no petition is found, return null
         }

        $result['sigCount']= getNumberOfsignaturPetition($idp);
        return $result ;
    }

    function getNumberOfsignaturPetition($idp){
        global $DATA_BASE ; 
        $query = "SELECT count(*) as  nbr FROM signature WHERE IDP = ?";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([$idp]);
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        
        return $result['nbr'] ;
        
    }

    function getLastSignatures($idp){
        global $DATA_BASE ;
        $query = "SELECT * FROM signature WHERE IDP = ? ORDER BY DateS DESC , HeureS DESC";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([$idp]);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC) ; // Fetch as associative array for consistency

        if (!$result ) {
            return null;
        }

        return $result ;
    }

    function getNbSignatures(){
        global $DATA_BASE ;
        $query = "SELECT count(*) as  nbr FROM signature";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        
        return $result['nbr'] ;
        
    }

    function verifyAuthentificationtUser ($email , $password){
        global $DATA_BASE ;
        $query = "SELECT lastName,firstName, passwordU FROM utilisateur WHERE EmailU = ? ";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([strtolower($email)]);
        $result = $statement->fetch(PDO::FETCH_ASSOC) ;

        // Verify the hashed password
        if ($result && password_verify($password , $result['passwordU'])){
            return [
                'name' => $result['lastName'].' '.$result['firstName'],
                'email' => strtolower($email)
            ];
        }else {
            return false;
        }
    }
    
    function signerPetition($idp, $nom, $prenom, $country, $email){
        global $DATA_BASE ;
        $query = "INSERT INTO signature (IDP, NomS, PrenomS, PaysS, DateS, HeureS, EmailS) VALUES (?, ?, ?, ?, CURDATE(), CURTIME(), ?)";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([$idp, strtolower($nom), strtolower($prenom), strtolower($country), strtolower($email)]);
    }

    function petitionExist($titre){
        global $DATA_BASE ;   
        $query = "SELECT * FROM petition WHERE TitreP = ?";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([strtolower($titre)]);
        $result = $statement->fetchAll();
        return !empty($result);
    }

    function userExists($email){
        global $DATA_BASE;
        $query = "SELECT * FROM utilisateur WHERE EmailU = ?";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([$email]);
        $result = $statement->fetchAll();
        return !empty($result);
    }

    function addUser($lastName , $firstName, $email, $password){
        global $DATA_BASE;
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $query = "INSERT INTO utilisateur VALUES (?, ?, ?, ?)";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([$email,$hashedPassword,$lastName,$firstName]);
    }

    function addPetition($titre, $description, $nomPorteur, $emailPorteur, $dateFin,$emailU ){
        global $DATA_BASE ;   
        $query = "INSERT INTO petition (TitreP, DescriptionP, NomPorteurP, Email, DateAjoutP, DateFinP,EmailU) VALUES (?, ?, ?, ?, CURDATE(), ?,?)";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([strtolower($titre), strtolower($description), strtolower($nomPorteur), strtolower($emailPorteur), $dateFin, strtolower($emailU)]);
    }

    function selectMaxSignedPetition(){
        global $DATA_BASE ;

        $query = "SELECT IDP , COUNT(*) AS nbr FROM signature GROUP BY IDP ORDER BY COUNT(*) DESC ";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        if (empty($result)) {
            return [];
        }

        $maxCount = $result[0]['nbr'];
        $query = "SELECT petition.IDP, petition.TitreP, petition.DescriptionP, petition.NomPorteurP
                        , petition.Email, petition.DateAjoutP, petition.DateFinP ,petition.EmailU
                    FROM signature join petition on signature.IDP = petition.IDP
                    GROUP BY signature.IDP having count(*) = ?";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([$maxCount]);
        $result = $statement->fetchAll();
        return $result ;
    }

    function selectNbrTotalePetition(){
        global $DATA_BASE ;
        $query = "SELECT count(*) as  nbr FROM petition ";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        
        return $result['nbr'] ;
    }

    function signaturExist($idp, $email){
        global $DATA_BASE;
        $query = 'SELECT * FROM signature WHERE IDP = ? AND EmailS = ? ';
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([$idp, $email]);
        $result = $statement->fetchAll();
        return !empty($result);
    }

    function getUserPetitions($emailU) {
        global $DATA_BASE;
        $query = "SELECT * FROM petition WHERE EmailU = ? ORDER BY IDP DESC";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([strtolower($emailU)]);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    function updatePetition($petitionId, $description, $dateFin, $emailU) {
        global $DATA_BASE;
        // The WHERE clause ensures a user can only update their own petition
        $query = "UPDATE petition SET DescriptionP = ?, DateFinP = ? WHERE IDP = ? AND EmailU = ?";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([strtolower($description), $dateFin, $petitionId, strtolower($emailU)]);
        // rowCount() will be > 0 if the update was successful
        return $statement->rowCount() > 0;
    }

    function deletePetition($petitionId, $emailU) {
        global $DATA_BASE;
        // First, delete related signatures to maintain data integrity
        $query_sig = "DELETE FROM signature WHERE IDP = ?";
        $statement_sig = $DATA_BASE->prepare($query_sig);
        $statement_sig->execute([$petitionId]);

        // Then, delete the petition, ensuring ownership
        $query_pet = "DELETE FROM petition WHERE IDP = ? AND EmailU = ?";
        $statement_pet = $DATA_BASE->prepare($query_pet);
        $statement_pet->execute([$petitionId, strtolower($emailU)]);
        return $statement_pet->rowCount() > 0;
    }
?>