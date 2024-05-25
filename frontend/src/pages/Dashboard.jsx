import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import FlightDetails from '../components/FlightDetails';
import WeatherDetails from '../components/WeatherDetails';
import MainRoutes from '../components/MainRoutes';


const Dashboard = () => {
  const [inputDepartureLocation, setInputDepartureLocation] = useState('');
  const [inputArrivalLocation, setInputArrivalLocation] = useState('');
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [showLocations, setShowLocations] = useState(false);
  const [departureWeather, setDepartureWeather] = useState(null);
  const [arrivalWeather, setArrivalWeather] = useState(null);
  const [departureCoords, setDepartureCoords] = useState(null);
  const [arrivalCoords, setArrivalCoords] = useState(null);
  const navigate = useNavigate();

 

  const handleSearch = async () => {
    setDepartureLocation(inputDepartureLocation);
    setArrivalLocation(inputArrivalLocation);
    setShowLocations(true);

    const [departureWeatherData, arrivalWeatherData, departureCoordsData, arrivalCoordsData] = await Promise.all([
      fetchWeather(inputDepartureLocation),
      fetchWeather(inputArrivalLocation),
      fetchCoordinates(inputDepartureLocation),
      fetchCoordinates(inputArrivalLocation),
    ]);

    setDepartureWeather(departureWeatherData);
    setArrivalWeather(arrivalWeatherData);
    setDepartureCoords(departureCoordsData);
    setArrivalCoords(arrivalCoordsData);

    console.log(departureCoordsData);
    console.log(arrivalCoordsData);
  };

  const fetchWeather = async (city) => {
    const apiUrl = `http://localhost:3000/api/weather?city=${city}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Could not get weather data');
    const data = await response.json();
    return data;
  };

  const fetchCoordinates = async (city) => {
    const apiUrl = `http://localhost:3000/api/weather?city=${city}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Could not get coordinates');
    const data = await response.json();
    const coords = {
      lon: data.location.lon,
      lat: data.location.lat,
    };
    return coords;
  };

  const handleViewRoutes = () => {
    navigate('/routes', { state: { departureCoords, arrivalCoords } });
    window.location.reload();
  };

  return (
    <div className='bg-cover bg-gradient-to-br p-6 from-[#061c07] from-0% via-black via-50% to-[#061c07] to-95%'>
      <div className='flex justify-center items-center mt-8'>
        <div className='relative flex flex-col items-center w-10/12 md:w-7/12'>
          <div className='w-full shadow-2xl p-5 rounded-lg border-t-4 mb-5 bg-white'>
            <div className='flex justify-center items-center mb-6'>
              <h1 className='font-bold text-3xl md:text-5xl'>Flight Route</h1>
            </div>
            <SearchForm
              inputDepartureLocation={inputDepartureLocation}
              setInputDepartureLocation={setInputDepartureLocation}
              inputArrivalLocation={inputArrivalLocation}
              setInputArrivalLocation={setInputArrivalLocation}
              handleSearch={handleSearch}
            />
            {showLocations && (
              <FlightDetails
                departureLocation={departureLocation}
                arrivalLocation={arrivalLocation}
              />
            )}
          </div>
        </div>
      </div>
      {showLocations && (
        <div className='flex justify-center items-center'>
          <div className='relative flex flex-row items-center w-10/12 md:w-7/12'>
            <WeatherDetails location={departureLocation} weather={departureWeather} latitude={departureCoords ? departureCoords.lat : null} longitude={departureCoords ? departureCoords.lon : null} />
            <WeatherDetails location={arrivalLocation} weather={arrivalWeather} latitude={arrivalCoords ? arrivalCoords.lat : null} longitude={arrivalCoords ? arrivalCoords.lon : null} />
          </div>
        </div>
      )}
      {showLocations && (
        <div className='flex justify-center items-center'>
          <button
            className='ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mb-5'
            onClick={handleViewRoutes}
          >
            View Routes
          </button>
        </div>
      )}
      <MainRoutes/>
    </div>
  );
};

export default Dashboard;

