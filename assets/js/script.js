// defining variables
var searchBtnEl = $("#searchBtn");
var searchCityEl = $("#searchCity");
var currentWeatherEl = $(".current-weather");
var fiveDayForcastEl = $(".five-day-forcast");
var recentCitiesList = $(".list-group");


// get city, add it to local storage
// todo make local storage array
function getCity(event){
    var city = event.currentTarget.previousElementSibling.value;
    localStorage.setItem("city", city);

    getAPI(city);
}

function makeRecentCities(){
    var savedCities = localStorage.getItem("city");
    var savedCity1 = $("<li>").text(savedCities).addClass("list-group-item py-1 my-2 d-flex justify-content-center")
    recentCitiesList.append(savedCity1);
}

// todo fetch current weather, weather forcast 5 days 
function getAPI(city){
    var city = city;
    console.log(city);
    var requestURL = "http://api.openweathermap.org/geo/1.0/direct?appid=f18de7fe10f46ccca13adc41b61d567d&q=" + city;

    fetch(requestURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var lat = data[0].lat;
            var lon = data[0].lon;

            var url = "https://api.openweathermap.org/data/2.5/forecast?appid=f18de7fe10f46ccca13adc41b61d567d&units=imperial&lat=" + lat + "&lon=" + lon;

            fetch(url)
            .then(function(response2){
                if (response2.ok) {
                    return response2.json();
                }
                else{
                    // todo make 404 error page populate
                    console.log("there's an error!")
                }
            }).then(function(data2) {
                console.log(data2);

                // generate current weather card
                // todo make H3 with name of city, date, and icon of current weather

                // todo make p's with temp, wind, humidity, and uv index

                // generate five day forcast cards
                // todo find index #s for next five days
                // todo make card with date, icon, temp, wind, and humidity


            })
        });
}

searchBtnEl.on("click", getCity);
makeRecentCities();


// todo better weather icons 
//https://erikflowers.github.io/weather-icons/
