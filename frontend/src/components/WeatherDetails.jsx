import React, { useEffect } from 'react';

const WeatherDetails = ({ location, weather }) => {
  useEffect(() => {
    if (weather) {
      console.log(`Longitude: ${weather.location.lon}, Latitude: ${weather.location.lat}`);
    }
  }, [location, weather]);

  return (
    <div className='w-auto shadow-xl p-5 rounded-lg border-t-4 mx-5 mb-2 bg-white'>
      {weather && (
        <div>
          <h1 className='text-2xl font-bold'>Weather in {location}</h1>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_kph} kph {weather.current.wind_dir}</p>
          <p>Visibility: {weather.current.vis_km} km</p>
          <p>Latitude: {weather.location.lat}</p>
          <p>Longitude: {weather.location.lon}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDetails;
