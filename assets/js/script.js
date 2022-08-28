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
    console.log(city);
    localStorage.setItem("city", city);

    makeRecentCities();
}

function makeRecentCities(){
    var savedCities = localStorage.getItem("city");
    var savedCity1 = $("<li>").text(savedCities).addClass("list-group-item")
    recentCitiesList.append(savedCity1);
}

// todo add fetch call for weather api 
function getAPI(){
    var requestURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=f18de7fe10f46ccca13adc41b61d567d";
    // API KEY : f18de7fe10f46ccca13adc41b61d567d

    fetch(requestURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })
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
