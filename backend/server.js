const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Endpoint to fetch weather data
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=9e75102f2a1049a78a382719242005&q=${city}&aqi=no`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Endpoint to classify weather condition
app.post('/api/classify', async (req, res) => {
  const { city } = req.body;
  const flaskApiUrl = 'http://localhost:5000/classify';

  try {
    // First, fetch the weather data
    const weatherResponse = await axios.get(`http://localhost:3000/api/weather?city=${city}`);
    const weatherData = weatherResponse.data;

    // Get the weather condition
    const condition = weatherData.current.condition.text;

    // Make the POST request to the Flask classify endpoint
    const classifyResponse = await axios.post(flaskApiUrl, { city: city });

    // Return the classification result
    res.json(classifyResponse.data);
  } catch (error) {
    console.error('Error classifying weather condition:', error);
    res.status(500).json({ message: 'Error classifying weather condition' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
