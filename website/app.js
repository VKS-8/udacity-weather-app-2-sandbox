/* Global Variables */
let zip = document.querySelector('#zip');
let countryCode = document.querySelector('#countryCode');
countryCode.value.toUpperCase();
let feelings = document.querySelector('#feelings');
let units = document.querySelector('#units');
let notificationPopUp = document.querySelector('#notificationPopUp');
let content = document.querySelector('#content');
let date = document.querySelector('#date');
let temp = document.querySelector('#temp');
const submitbtn = document.querySelector('#generate');


// Create a new date instance dynamically with JS
let currentDate = new Date();
let newDate = currentDate.getMonth()+'.'+ currentDate.getDate()+'.'+ currentDate.getFullYear();

// App data
const currentWeather = {};

// currentWeather = {
//   units: "celsius"
// }

// App base tempurature scale
const Kelvin = 273;

// Api key (not secured)
const apiKey = '0cbd903252e3f29c6f6ad83595b63ba3';

// Check for geolocation of user
function geolocationCheck () {
  if(!'geolocation' in navigator) {
    notificationPopUp.style.display = 'block';
    notificationPopUp.innerHTML = '<p>Sorry, it looks like your device does not support geolocation. <br> Please enter your zip code and country code</p>';
    return;
  } else {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  }

  // Set the user's position
  function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeatherData(latitude, longitude);
  }

  // Error handling for geolocation
  function showError(error) {
    notificationPopUp.style.display = "block";
    notificationPopUp.innerHTML = `<p> ${error.message} </p>`;  // Note: should not display standard app error messages as they can display sensitive information
  }

  // Retrieve data from API provider using geolocation data
  function getWeatherData(latitude, longitude) {
    let apiLatLon = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    // Check for data retrieval
    console.log(apiLatLon);

    fetch(apiLatLon)
      .then(function(response){
        let data = response.json();
        return data;
      })
      .then(function(data) {
        currentWeather.temperature.value = Math.floor(data.main.temp - kelvin);
        currentWeather.description = data.weather[0].description;
        currentWeather.city = data.name;
        currentWeather.country = data.sys.country;
      })
      .then(function() {
        updateUI();
    });
  }
}
// Update the user's UI with current weather information
function udpateUI() {
  date.innerHTML = newDate;
  temp.innerHTML = `${currentWeather.temperature.value}◘<span>C</span>`;
  content.innerHTML = `The weather in ${currentWeather.city}, ${currentWeather.country} is ${currentWeather.description}.`
}


// submitbtn.addEventListener('click', getWeatherData());