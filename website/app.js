/* Global Variables */
// let zip = document.querySelector('#zip');
// let countryCode = document.querySelector('#countryCode');
// countryCode.value.toUpperCase();
// let feelings = document.querySelector('#feelings');
// let units = document.querySelector('#units');
let notificationPopUp = document.querySelector('#notificationPopUp');
// let content = document.querySelector('#content');
// let date = document.querySelector('#date');
const submitbtn = document.querySelector('#generate');
// const apiKey = '0cbd903252e3f29c6f6ad83595b63ba3';
// const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let currentDate = new Date();
let newDate = currentDate.getMonth()+'.'+ currentDate.getDate()+'.'+ currentDate.getFullYear();

// App data
const currentWeather = {};

// Check for geolocation of user
function geolocationCheck () {
  if(!'geolocation' in navigator) {
    notificationPopUp.style.display = 'block';
    notificationPopUp.innerHTML = '<p>Sorry, it looks like your device does not support geolocation. <br> Please enter your zip code and country code</p>';
    getWeatherDataZip(zip, countryCode, units);
  } else {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  }

  // Set the user's position
  function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeatherDataLL(latitude, longitude);
  }

  // Error handling for geolocation
  function showError(error) {
    notificationPopUp.style.display = "block";
    notificationPopUp.innerHTML = `<p> ${error.message} </p>`;  // Note: should not display standard app error messages as they can display sensitive information
  }
}

// Retrieve data from API provider using geolocation data
function getWeatherDataLL(latitude, longitude) {
  // let apiLatLon = `baseUrl?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  // Check for data retrieval
  // console.log(apiLatLon);

  fetch(apiLatLon)
    .then(function(response){
      let data = response.json();
      return data;
    })
    .then(function(data) {
      currentWeather.temperature.value = Math.floor(data.main.temp);
      currentWeather.description = data.weather[0].description;
      currentWeather.city = data.name;
      currentWeather.country = data.sys.country;
    })
    .then(function() {
      updateUI();
  });
}

const getWeatherDataZip = async (zip, countryCode, units) => {
  // let zip = document.querySelector('#zip');
  // let countryCode = document.querySelector('#countryCode');
  // countryCode.value.toUpperCase();
  // let units = document.querySelector('#units');
  let apiByZipCode = `baseUrl?zip=${zip},${countryCode}&units=${units}&appid=${apiKey}`;
  const response = await fetch(apiByZipCode);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
};

// Update the user's UI with current weather information
function udpateUI() {
  let feelings = document.querySelector('#feelings');
  let content = document.querySelector('#content');
  let date = document.querySelector('#date');
  date.innerHTML = newDate;
  temp.innerHTML = `${currentWeather.temperature.value}◘<span>C</span>`;
  content.innerHTML = `The weather in ${currentWeather.city}, ${currentWeather.country} is ${currentWeather.description} and you are feeling ${feelings}.`
}


document.getElementById('generate').addEventListener('click', async () => {
  // if geolocationCheck ()

  const postData = async (url = '', data = {}) => {
    const response = await fetch('http://localhost:5501/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log('error', error);
    }
  };

  postData('/', {zip: 74401, countryCode: US, units: imperial});

});