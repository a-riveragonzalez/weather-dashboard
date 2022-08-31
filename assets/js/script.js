// defining variables
var searchBtnEl = $("#searchBtn");
var searchCityEl = $("#searchCity");
var currentWeatherEl = $(".current-weather");
var fiveDayForcastEl = $(".five-day-forcast");
var recentCitiesList = $(".list-group");

var today = moment().format("MMMM Do")
var citiesArray = [];


// get city, add it to local storage
// todo make local storage array
function getCity(event){
    var city = event.currentTarget.previousElementSibling.value;

    // get cities local storage
    // if city (the key value) does not exist, make an empty slot in local storage
    if (!localStorage.getItem("city")){
        localStorage.setItem("city", "[]");
    } else {
        // parse from the local storage 
        citiesArray = JSON.parse(localStorage.getItem("city"))
    }

    // if local storage > 10 
        //? delete first item in array 
    if (citiesArray.length >= 5){
        citiesArray.shift();
    }

    // if city not already exists in local storage -add it
        // elseoverride it 

    if (!citiesArray.includes(city)){
        citiesArray.push(city);
    } else {
        console.log("its a repeat");
    }

    // set to local storage (stringify it)
    localStorage.setItem("city", JSON.stringify(citiesArray));

    getAPI(city);
}

// displays local storage 
function makeRecentCities(){
    var savedCities = JSON.parse(localStorage.getItem("city"));
    console.log(savedCities);

    savedCities.forEach(function(cityItem){
        var savedCityItems = $("<li>").text(cityItem).addClass("list-group-item py-1 my-2 d-flex justify-content-center")
    
        recentCitiesList.append(savedCityItems);
    })

    
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
            var lat = data[0].lat;
            var lon = data[0].lon;

            var url = "https://api.openweathermap.org/data/2.5/onecall?appid=9b35244b1b7b8578e6c231fd7654c186&units=imperial&lat=" + lat + "&lon=" + lon;

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

                var cityName = city.toUpperCase();
                var todayIcon = data2.current.weather[0].icon;
                var todayTemp = "Temp: " + data2.current.temp + "°F";
                var todayWind = "Wind: " + data2.current.wind_speed + " MPH";
                var todayHumidity = "Humidity: " + data2.current.humidity + "%";
                var todayUVIndex = "UV Index: " + data2.current.uvi;

                // generate current weather card
                // todo make H3 with name of city, date, and icon of current weather
                var cityHeading = $("<h2>").text(cityName + " : " + today).addClass("text-dark border-bottom border-dark");
                // todo make p's with temp, wind, humidity, and uv index
                var temp = $("<p>").text(todayTemp).addClass("text-dark mb-0");
                var wind = $("<p>").text(todayWind).addClass("text-dark mb-0");
                var humidity = $("<p>").text(todayHumidity).addClass("text-dark mb-0");
                var uvIndex = $("<p>").text(todayUVIndex).addClass("text-dark mb-0");

                currentWeatherEl.append(cityHeading, temp , wind , humidity, uvIndex); 

                // generate five day forcast cards
                // todo make card with date, icon, temp, wind, and humidity
                // these are the index numbers for next five days
                var indexNumbers = ["1", "2", "3", "4", "5"]; 

                indexNumbers.forEach(function(indexNumber){
                    var forcastDate = moment(data2.daily[indexNumber].dt,"X").format("M/D/YYYY");
                    var forcastIcon = data2.daily[indexNumber].weather[0].icon;
                    var forcastTemp = "Temp: " + data2.daily[indexNumber].temp.day + "°F";
                    var forcastWind = "Wind: " + data2.daily[indexNumber].wind_speed + " MPH";
                    var forcastHumidity = "Humidity: " + data2.daily[indexNumber].humidity + "%";

                    var cardBodyEl = $("<div>").addClass("card-body my-2");
                    
                    var dateCard = $("<h5>").text(forcastDate).addClass("card-title");
                    var iconCard = $("<p>").text(forcastIcon).addClass("card-text");
                    var tempCard = $("<p>").text(forcastTemp).addClass("card-text");
                    var windCard = $("<p>").text(forcastWind).addClass("card-text");
                    var humidityCard = $("<p>").text(forcastHumidity).addClass("card-text");

                    fiveDayForcastEl.addClass("card text-white bg-secondary mb-3");
                    fiveDayForcastEl.append(cardBodyEl);
                    cardBodyEl.append(dateCard , iconCard , tempCard , windCard , humidityCard);

                })


            })
        });
}

searchBtnEl.on("click", getCity);
makeRecentCities();


// todo better weather icons 
//https://erikflowers.github.io/weather-icons/
