// defining variables
var searchBtnEl = $("#searchBtn");
var searchCityEl = $("#searchCity");
var recentCitiesList = $(".list-group");


// functions 
// get city, add it to local storage
// todo get its long and lat
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
            })
        });
}

searchBtnEl.on("click", getCity);
makeRecentCities();


// todo when search city, add to local storage, get the calls for the apis 

// todo pass city, get longitude
// geodirect - https://openweathermap.org/api/geocoding-api

// todo five days weather forcast creating card for five day, pushing info onto card
// one call api - https://openweathermap.org/api/one-cal


// todo better weather icons 
//https://erikflowers.github.io/weather-icons/
