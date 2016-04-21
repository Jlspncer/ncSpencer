var cars;

function onLoad(){
    getCars();
}

function insertCars()
{
var Model, Engine, MPG, Price, Drivetrain;
    Model = JSON.stringify($('#Model').val());
    Engine = JSON.stringify($('#Engine').val());
    MPG = JSON.stringify($('#MPG').val());
    Price = JSON.stringify($('#Price').val());
    Drivetrain = JSON.stringify($('#Drivetrain').val());
    var ajax = ajaxInsertCar("insertCar", Model, Engine, MPG, Price, Drivetrain);
    ajax.done(insertCarCallback);
    ajax.fail(function () {
        alert("Failure in insertCar");
    });
    getCars();
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
    response = JSON.parse(response_in);
    if(!response['success']){
       $("#results").html("");
       alert("Insert failed.");
    } else {
        $("results").html(response['credentials'] +' '+
            response['querystring'] + ' ' +
            response['success'] + ' ');
        alert("Insert Succeeded")
        getCars();
    }
}

function showCars(cars){
    //alert("In showCars()");
    //alert(elements);
    var carList = "";
        $.each(cars, function (key, value){
            var itemStr = "";
            $.each(value, function(key, item){
                itemStr += item + "\t \t";
            });
            carList += itemStr + '<br>';
        });
        $("#cars").html(carList);
}

function getCars(){
    ajax = ajaxGetCars("getCars");
    ajax.done(getCarsCallback);
    ajax.fail(function () {
        alert("Failure in getCars call to ajaxGetCars");
    });
}

function ajaxGetCars(method){
    alert("In ajaxGetCars");
    return $.ajax({
        url: 'CarsAPI.php',
        type: 'POST',
        data:{method: method}
        });
    }

function getCarsCallback(response_in){
    alert("In getCarsCallback" + response_in);
    var response = JSON.parse(response_in);
    $cars = response["cars"];
    if(!response['success'])
        alert("getCars failed.");
    else {
        $('#carNameSelect').find('option').remove();
        showCars($cars);
        $.each($cars,
            function(key, row)
            {
                $("#carNameSelect").append($('<option>',
                    {
                        value: row[0].toString(),
                        text: row[1].toString()
                    }));
            })
    }
}