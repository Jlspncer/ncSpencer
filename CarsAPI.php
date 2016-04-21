<?php

echo $_POST["method"]();

function getCars(){
    if( isset($_POST['server'])){
        $server = json_decode(sanitize($_POST['server']));
    }
    if (isset($_POST['username'])){
        $username = json_decode(sanitize($_POST['username']));
    }
    if( isset($_POST['password'])){
        $password = json_decode(sanitize($_POST['password']));
    }

    $dbConn = mysqli_connect($server, $username, $password);
    $query = "SELECT * FROM ncJacksonS.LuxuryCarModels";
    $result = $dbConn->query($query);
    $cars = array();

    if($dbConn->connect_error){
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }

    if($result) {
        while($row = $result->fetch_array()){
            $allColunms = array();
            for ($i =0; $i < 7; $i++){
                array_push($allColumns, $row[$i]);
            }
            array_push($cars, $allColumns);
        }
    }

    $return = new StdClass();
    $return->success = true;
    $return->cars = $cars;
    $return->querystring = $query;
    $return->credentials = $server + "  " + $username + "   " + $password;
    return json_encode($return);
}


function insertCars(){
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

    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());


}


