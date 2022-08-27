// defining variables

// functions 

// todo add fetch call for weather api 
function getAPI(){
    var requestURL = "";
    // API KEY : f18de7fe10f46ccca13adc41b61d567d

    fetch(requestURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })
}
