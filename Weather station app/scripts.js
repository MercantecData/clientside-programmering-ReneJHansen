// appid=6f0c733e0ea1136f9299db14742c5b85

function get_weather() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Viborg,dk&appid=6f0c733e0ea1136f9299db14742c5b85")
        .then(data => data.json()).then(resp => {
            document.getElementById('p1').innerHTML = "Weather in Viborg is: " + resp.weather[0].main;
        });
}
