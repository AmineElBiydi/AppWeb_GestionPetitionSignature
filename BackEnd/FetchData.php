<?php

    include 'DataBaseConnexion.php';

    function getAllPetitions(){
        
        global $DATA_BASE ;
        $query = "SELECT * FROM petition ORDER BY DateAjoutP DESC";
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
        $query = "SELECT * FROM signature WHERE IDP = ? ORDER BY DateAjout , HeureS DESC LIMIT 5";
        $statement = $DATA_BASE->prepare($query);
        $statement->execute([$idp]);
        $result = $statement->fetchAll() ; // Fetch a single associative array

        if (!$result ) {
            return null;
        }

        return $result ;
    }