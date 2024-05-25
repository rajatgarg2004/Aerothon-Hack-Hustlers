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
  console.log(city);
  const flaskApiUrl = 'http://localhost:5000/classify';

  try {
    // Make the POST request to the Flask classify endpoint
    const classifyResponse = await fetch(flaskApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(city)
    });
    const classifyData = await classifyResponse.json();
    // Return the classification result
    res.send(classifyData);

  } catch (error) {
    console.error('Error classifying weather condition:', error);
    res.status(500).json({ message: 'Error classifying weather condition' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
