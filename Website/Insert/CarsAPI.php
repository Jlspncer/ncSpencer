<?php

require("Credentials.php");

echo $_POST["method"]();

function sanitize($str, $quotes = ENT_NOQUOTES){
    $str = htmlspecialchars($str, $quotes);
    return $str;
}

function getCars(){
    $dbConn = mysqli_connect(server(), username(), password(), db());

    $query = "SELECT * FROM LuxuryCarModels";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }

    $cars = array();

    if($result) {
        while($row = $result->fetch_array()){
            $allColunms = array();
            for ($i = 0; $i < 7; $i++){
                array_push($allColumns, $row[$i]);
            }
            array_push($cars, $allColumns);
        }
    }

    $return = new StdClass();
    $return->success = true;
    $return->cars = $cars;
    $return->querystring = $query;
    return json_encode($return);
}

function insertCars(){
    if(isset($_POST['ID'])){
        $ID = json_decode(sanitize($_POST['ID']));
    }

    if(isset($_POST['Model'])){
        $Model = json_decode(sanitize($_POST['Model']));
    }

    if(isset($_POST['Engine'])){
        $Engine = json_decode(sanitize($_POST['Engine']));
    }

    if(isset($_POST['MPG'])){
        $MPG = json_decode(sanitize($_POST['MPG']));
    }

    if(isset($_POST['Price'])){
        $Price = json_decode(sanitize($_POST['Price']));
    }

    if(isset($_POST['Drivetrain'])){
        $Drivetrain = json_decode(sanitize($_POST['Drivetrain']));
    }

    $dbConn = mysqli_connect(server(), username(), password(), db("Cars"));

    if($dbConn->connect_error){
        die("Connection failed: " . $dbConn->connect_error);
    }

    $query = "INSERT INTO LuxuryCarModels (ID, Model, Engine, MPG, Price, Drivetrain ) " .
        "VALUES ( " .
        "'" . $ID . "', " .
        "'" . $Model . "', " .
        "'" . $Engine . "', " .
        "'" . $MPG . "', " .
        "'" . $Price . "', " .
        "'" . $Drivetrain . "' );";
    $result = $dbConn->query($query);
    $return = new stdClass;
    $return->querystring = (string) $query;
    if ($result) {
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}