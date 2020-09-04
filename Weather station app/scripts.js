var id = "appid=6f0c733e0ea1136f9299db14742c5b85";
var lon;
var lat;



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
        })
}

function get_weather(lon, lat) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&" + id)
        .then(data => data.json()).then(resp => {

            // Creates an array of days used for headers in 5 days view
            // .getDate() outputs your current day as a number ie: Monday=1 or Thursday=4
            let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            var date = new Date();
            var new_date = date.getDate();

            for (let x = 1; x < 6; x++) {
                var iconID = resp.daily[x].weather[0].icon.toString();

                document.getElementById("day" + x).innerHTML = days[new_date + x - 1];
                if (new_date + x > days.length - 1) { new_date = new_date - x - 3 };

                document.getElementById("temp" + (x + 0.1)).innerHTML = "Temp min: " + parseFloat(resp.daily[x].temp.min - 273.15).toFixed(1) + " " + '&#8451;';
                document.getElementById("temp" + (x + 0.2)).innerHTML = "Temp max: " + parseFloat(resp.daily[x].temp.max - 273.15).toFixed(1) + " " + '&#8451;';
                document.getElementById("img" + x).style.backgroundImage = `url("http://openweathermap.org/img/wn/${iconID}@2x.png")`;
                document.getElementById("wind" + x).innerHTML = "Wind: " + resp.daily[x].wind_speed + "m/s";
            }
        });
}




/*
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