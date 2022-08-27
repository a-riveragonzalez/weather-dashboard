// defining variables

// functions 

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

getAPI();

// when search city, add to local storage, get the calls for the apis 

// geodirect - https://openweathermap.org/api/geocoding-api
// pass city, get longitude

// one call api - https://openweathermap.org/api/one-cal
// five days weather forcast 
// creating card for five day, pushing info onto card 

//better weather icons 
//https://erikflowers.github.io/weather-icons/
