console.log("hi")
$("#searchBtn").on("click", function (event) {
    event.preventDefault()
    let userCity = $("#userCity").val()
   // console.log(userCity)
    lookupCity(userCity)
    $("#currentCityName").text(userCity)
    fiveDayForecast(userCity)
})

function lookupCity(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa4d71cf73d20b64aa3e608785427cd8&units=imperial`
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (apiData) {
      //  console.log(apiData)
        $("#temperature").text(`Temperature: ${apiData.main.temp} °F`)
        $("#humidity").text(`Humidity: ${apiData.main.humidity}%`)
        $("#windSpeed").text(`Windspeed: ${apiData.wind.speed} MPH`)
        $("#currentCityName").html(`<img src="http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png"/>`)
        var lat = apiData.coord.lat
        var lon = apiData.coord.lon
        lookupUV(lat, lon)
        var previousCity = JSON.parse(localStorage.getItem("weatherAPI")) || []
       // console.log(previousCity)
        if (previousCity.indexOf(city) === -1) {
            previousCity.push(city)
            localStorage.setItem("weatherAPI", JSON.stringify(previousCity))
            displayLocalStorage()
        }
    })

}

function lookupUV(lat, lon) {
    var queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=aa4d71cf73d20b64aa3e608785427cd8&units=imperial`
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (apiData) {
       // console.log(apiData)
        $("#uvIndex").text(`UV index: ${apiData.value}`)
    })
}

function fiveDayForecast(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=aa4d71cf73d20b64aa3e608785427cd8&units=imperial`
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (apiData) {
 //       console.log(apiData)
        for (var i = 1; i < 6; i++) {
         //   console.log(apiData.list[i].weather[0].icon)
            var icon = apiData.list[i].weather[0].icon
            $("#" + i + "-currentCityImg").html(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png"/>`)
            $("#" + i + "-temperature").text(`Temp: ${apiData.list[i].main.temp} °F`)
            $("#" + i + "-humidity").text(`Humidity: ${apiData.list[i].main.humidity}%`)
        }
    })
}

function displayLocalStorage() {
    var previousCities = JSON.parse(localStorage.getItem("weatherAPI")) || []
    var allCities = ""
    for (var i = 0; i < previousCities.length; i++) {
        allCities += `<button class="previousCity">${previousCities[i]}</button>`
    }
    $("#previousCitiesList").append(allCities)
}

displayLocalStorage()

$(".previousCity").on("click",function(){
   // console.log("hi")
 //   console.log(this.textContent)
    var localStorageCity = this.textContent
    lookupStorageCity(localStorageCity)
    fiveDayForecast(localStorageCity)
    $("#currentCityName").text(localStorageCity)

})

function lookupStorageCity(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa4d71cf73d20b64aa3e608785427cd8&units=imperial`
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (apiData) {
        $("#temperature").text(`Temperature: ${apiData.main.temp} °F`)
        $("#humidity").text(`Humidity: ${apiData.main.humidity}%`)
        $("#windSpeed").text(`Windspeed: ${apiData.wind.speed} MPH`)
        $("#currentCityName").append(`<img src="http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png"/>`)
        var lat = apiData.coord.lat
        var lon = apiData.coord.lon
        lookupUV(lat, lon)
    })

}