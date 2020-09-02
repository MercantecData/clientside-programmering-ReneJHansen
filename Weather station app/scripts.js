// appid=6f0c733e0ea1136f9299db14742c5b85

// instead of only using current, this api call get ALL the data at once
// this call also uses longitude latitude instead of city name
function get_weather() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=56.452027&lon=9.396347&appid=6f0c733e0ea1136f9299db14742c5b85")
        .then(data => data.json()).then(resp => {

            for (let x = 1; x < 6; x++) {
                console.log(resp.daily[x]);
                var iconID = resp.daily[x].weather[0].icon.toString();

                document.getElementById("temp" + (x + 0.1)).innerHTML = "Temp min: " + parseFloat(resp.daily[x].temp.min - 273.15).toFixed(1) + " " + '&#8451;';
                document.getElementById("temp" + (x + 0.2)).innerHTML = "Temp max: " + parseFloat(resp.daily[x].temp.max - 273.15).toFixed(1) + " " + '&#8451;';
                document.getElementById("img" + x).style.backgroundImage = `url("http://openweathermap.org/img/wn/${iconID}@2x.png")`;
                document.getElementById("wind" + x).innerHTML = "Wind: " + resp.daily[x].wind_speed + "m/s";
            }
        });
}