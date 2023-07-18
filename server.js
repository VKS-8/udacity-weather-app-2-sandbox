// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Set port
const port = 5500;

// Require Express to run server and routes
const express = require('express');
app.use(express());

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Test server
app.get('/', (req, res) => {
  res.send("Your server is working");
});


// Setup Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});