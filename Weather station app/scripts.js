var id = "appid=6f0c733e0ea1136f9299db14742c5b85";
var lon;
var lat;

let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

var index = 0;
var weatherArray = [];

// Adds the code inside AFTER the DOM/site is loaded.
// Encountered issue with eventlistener not getting added before site loaded ->
// -> effectively adding it to nothing
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('search_form').addEventListener('submit', function (event) {
        get_location(document.getElementById("city_search").value);
        event.preventDefault();
    });
});

function get_location(city = "Viborg") {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&" + id)
        .then(data => data.json()).then(resp => {

            // Sets coords of the input city with the coords from the JSON
            console.log(resp.coord.lat);
            console.log(resp.coord.lon);
            lon = resp.coord.lon;
            lat = resp.coord.lat;

            document.getElementById('this_city').innerHTML = city;

            // Makes a new API call with longitude and latitude instead of just city
            get_weather(lon, lat);
        });
};

function get_weather(lon, lat) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&" + id)
        .then(data => data.json()).then(resp => {

            weatherArray.push(resp);
            index++;

            insertIntoForecast();
        });
};

function insertIntoForecast() {

    // Creates an array of days used for headers in 5 days view
    // .getDate() outputs your current day as a number ie: Monday=1 or Thursday=4
    var today = getToday();

    for (let x = 1; x < 6; x++) {
        var iconID = weatherArray[index - 1].daily[x].weather[0].icon.toString();

        document.getElementById("day" + x).innerHTML = days[today + x - 1];
        if (today + x > days.length - 1) { today = today - x - 4 };

        document.getElementById("temp" + (x + 0.1)).innerHTML = "Temp min: " + parseFloat(weatherArray[index - 1].daily[x].temp.min - 273.15).toFixed(1) + " " + '&#8451;';
        document.getElementById("temp" + (x + 0.2)).innerHTML = "Temp max: " + parseFloat(weatherArray[index - 1].daily[x].temp.max - 273.15).toFixed(1) + " " + '&#8451;';
        document.getElementById("img" + x).style.backgroundImage = `url("http://openweathermap.org/img/wn/${iconID}@2x.png")`;
        document.getElementById("wind" + x).innerHTML = "Wind: " + weatherArray[index - 1].daily[x].wind_speed + "m/s";
    };
};

function getToday() {
    var date = new Date();
    var new_date = date.getDate();
    return new_date;
};

function addNewForecastOnSearch() {

}

$(document).ready(function () {
    $(".submit").click(function () {
        $(".forecast").clone().prop({ id: "new_forecast", class: "forecast"}).insertAfter(".new_search");
        $(".header").clone().prop({ id: "new_header", class: "header"}).insertAfter(".new_search");
    });
});

$(document).ready(() => addNewForecastOnSearch());

/*  NOTER FRA UNDERVISNING
function widget(data) {
    var res = $("div.class1.class2").clone();

    .removeClass("template");

    // Finder child af "res" med id "#date"
    res.find("#date").text(Testfunction(data));
    res.find("#city").text(data.name);
    res.find("#temp").text(data.main.temp);

    // Finder child af "res" med typen "img"
    res.find("img").attr("src", data.weather[0].icon);

    res.find("#vind").text(`${data.wind.speed}m/s mod ${deg}`);

    res.insertAfter($("div.class1.class2"))
}

$(document).ready(() => {
    // run fetch(data).then()
})

*/