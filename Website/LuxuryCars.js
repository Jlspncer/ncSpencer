var cars;

function onLoad(){
    getCars(false);
}

function insertCars()
{
    alert("In insertCarsCall()")
var Model, Engine, MPG, Price, Drivetrain;
    Model = JSON.stringify($('#Model').val());
    Engine = JSON.stringify($('#Engine').val());
    MPG = JSON.stringify($('#MPG').val());
    Price = JSON.stringify($('#Price').val());
    Drivetrain = JSON.stringify($('#Drivetrain').val());
    ajax = ajaxInsertCar("insertCar", Model, Engine, MPG, Price, Drivetrain);
    ajax.done(insertCarCallback);
    ajax.fail(function () {
        alert("Failure in insertCar");
    });
}

function ajaxInsertCars (method, Model, Engine, MPG, Price, Drivetrain){
    return $.ajax({
        url: 'CarsAPI.php',
        type: 'POST',
        data: {method: method,
            Model: Model,
            Engine: Engine,
            MPG: MPG,
            Price: Price,
            Drivetrain: Drivetrain}
    });
}

function insertCarsCallback(response_in){
    alert("In insertCarsCallback()")
    response = JSON.parse(response_in);

    if(!response['success']){
       $("#results").html("");
       alert("Insert failed.");
        getCars(false);
    } else {
        $("results").html(response['credentials'] + '<br>' + response['success'] + '<br>');
        getCars(false);
    }
}

function showCars(cars){
    alert("In showCars()");
    alert(Cars);
    var carList = "";
        $.each(cars, function (key, value){
            var itemStr = "";
            $.each(value, function(key, item){
                itemStr += item + "\t \t";
            });
            carList += itemStr + '<br>';
        });
        $("#results").html(carList);
}

function getCars(){
    ajax = ajaxGetCars("getCars");
    ajax.done(getCarsCallback);
    ajax.fail(function () {
        alert("Failure in getCars call to ajaxGetCars");
    });
}

function ajaxGetCars(method){
    alert("In ajaxGetCars()");
    return $.ajax({
        url: 'CarsAPI.php',
        type: 'POST',
        data:{method: method}
        });
    }

function getCarsCallback(response_in){
    alert(response_in);
    var response = JSON.parse(response_in);
    cars = response["cars"];
    if(!response['success'])
       $("#results").html("getCars() failed")
    else {
        showCars(cars);
    }
}