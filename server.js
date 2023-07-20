// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Set port
const port = process.env.PORT || 5501;

require('dotenv').config();

// To make requests
const axios = require('axios');

// Require Express to run server and routes
const express = require('express');
// app.use(express());

// Start up an instance of app
const app = express();

/* Middleware*/
// Parse responses
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the app
app.use(express.static('website'));

// Returns weather data as an object
app.get('/', (req, res) => {
  let zip = document.querySelector('#zip').value;
  let countryCode = document.querySelector('#countryCode').value;
  countryCode.toUpperCase();
  let units = document.querySelector('#units').value;
  const options = {
    method: 'GET',
    url: `http://openweathermap/data/2.5/weather?zip=${zip},${countryCode}&units=${units}&appid=${process.env.API_KEY}`,
    headers: {
    //   'X-OpenWeatherMap-Key': process.env.API_Key,
    //   'X-OpenWeatherMap-Host': 'api.openweathermap.org'
      'Content-Type': 'application/json'
    }
  }

  axios.request(options)
    .then(function(response) {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.post('/', getWeatherData);

function getWeatherData(req, res) {
  projectData.push(req.body);
}

// app.post('/data', (req, res) => {
//   projectData = req.body;
//   projectData.temperature = newData.tempature;
//   projectData.date = newData.date;
//   projectData.userResponse = newData.userResponse;
//   res.send(projectData);
// })


// Setup Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});