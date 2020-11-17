console.log("hi")
$("#searchBtn").on("click", function(event) {
    event.preventDefault()
    let userCity = $("#userCity").val()
    console.log(userCity)
    lookupCity (userCity)
}) 

function lookupCity (city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa4d71cf73d20b64aa3e608785427cd8&units=imperial
    `
   $.ajax({
       method : "GET",
        url: queryURL
   }).then (function(apiData) {
       console.log(apiData)
       $("#temperature").text(`Temperature: ${apiData.main.temp}`)
       $("#humidity").text(`Humidity: ${apiData.main.humidity}`)
       $("#windSpeed").text(`Windspeed: ${apiData.wind.speed}`)
       $("#currentCityImg").html(`<p>${apiData.weather[0].description}</p><img src="http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png"/>`)
       var lat = apiData.coord.lat
       var lon =apiData.coord.lon
       lookupUV(lat,lon)
    })
}

function lookupUV (lat,lon) {
    var queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=aa4d71cf73d20b64aa3e608785427cd8&units=imperial
    `
   $.ajax({
       method : "GET",
        url: queryURL
   }).then (function(apiData) {
       console.log(apiData)
     $("#uvIndex").val(`:humidity:${apiData.value}`)
   })
}