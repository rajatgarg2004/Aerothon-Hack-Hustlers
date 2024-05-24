import React, { useEffect, useState } from 'react';
import Map from '../containers/Map';
import { useLocation, useNavigate } from 'react-router-dom';
import WeatherDetails from '../components/WeatherDetails';

const Routes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { departure, arrival, departureCoords, arrivalCoords } = location.state || {};
    const [departureWeather, setDepartureWeather] = useState(null);
    const [arrivalWeather, setArrivalWeather] = useState(null);
    const [puneWeather, setPuneWeather] = useState(null);
    const [ranchiWeather, setRanchiWeather] = useState(null);
    const [lucknowWeather, setLucknowWeather] = useState(null);
    const arrivalLocation = arrival;
    const departureLocation = departure;

    useEffect(() => {
        const fetchWeather = async (coords) => {
            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=9e75102f2a1049a78a382719242005&q=${coords.lat},${coords.lon}`;
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Could not get weather data');
            const data = await response.json();
            return data;
        };

        const fetchWeatherByCity = async (city) => {
            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=9e75102f2a1049a78a382719242005&q=${city}`;
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Could not get weather data');
            const data = await response.json();
            return data;
        };

        const fetchAllWeather = async () => {
            try {
                const [depWeather, arrWeather] = await Promise.all([
                    fetchWeather(departureCoords),
                    fetchWeather(arrivalCoords),
                ]);
                setDepartureWeather(depWeather);
                setArrivalWeather(arrWeather);

                if (['Bangalore', 'Mumbai', 'Hyderabad'].includes(arrival)) {
                    const puneWeatherData = await fetchWeatherByCity('Pune');
                    setPuneWeather(puneWeatherData);
                }

                if (['New Delhi', 'Kolkata'].includes(arrival)) {
                    const [ranchiWeatherData, lucknowWeatherData] = await Promise.all([
                        fetchWeatherByCity('Ranchi'),
                        fetchWeatherByCity('Lucknow'),
                    ]);
                    setRanchiWeather(ranchiWeatherData);
                    setLucknowWeather(lucknowWeatherData);
                }
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            }
        };

        fetchAllWeather();
    }, [departureCoords, arrivalCoords, arrival]);

    const handleRoute = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between min-h-screen p-4">
            <div className='flex flex-col 2xl:w-[48%] xl:w-[48%] lg:w-[48%] w-[100%]'>
                <div className="bg-white p-5 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-bold">Description</h2>
                </div>

                <div className="bg-white p-5 rounded-lg mb-4 flex flex-col text-center">
                    <div className="flex flex-row">
                        {departureWeather && (
                            <div className="w-1/2 p-2">
                                <WeatherDetails
                                    location={departureLocation}
                                    weather={departureWeather}
                                    latitude={departureCoords ? departureCoords.lat : null}
                                    longitude={departureCoords ? departureCoords.lon : null}
                                />
                            </div>
                        )}
                        {arrivalWeather && (
                            <div className="w-1/2 p-2">
                                <WeatherDetails
                                    location={arrivalLocation}
                                    weather={arrivalWeather}
                                    latitude={arrivalCoords ? arrivalCoords.lat : null}
                                    longitude={arrivalCoords ? arrivalCoords.lon : null}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        {puneWeather && (
                            <div className="w-full p-2">
                                <div className="bg-white p-5 rounded-lg">
                                    <WeatherDetails
                                        location="Pune"
                                        weather={puneWeather}
                                        latitude={puneWeather.location.lat}
                                        longitude={puneWeather.location.lon}
                                    />
                                </div>
                            </div>
                        )}
                        {ranchiWeather && lucknowWeather && (
                            <div className="flex flex-row w-full p-2">
                                <div className="w-1/2 p-2">
                                    <div className="bg-white p-5 rounded-lg">
                                        <WeatherDetails
                                            location="Ranchi"
                                            weather={ranchiWeather}
                                            latitude={ranchiWeather.location.lat}
                                            longitude={ranchiWeather.location.lon}
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2 p-2">
                                    <div className="bg-white p-5 rounded-lg">
                                        <WeatherDetails
                                            location="Lucknow"
                                            weather={lucknowWeather}
                                            latitude={lucknowWeather.location.lat}
                                            longitude={lucknowWeather.location.lon}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-col 2xl:w-[48%] xl:w-[48%] lg:w-[48%] w-[100%]'>
                <div className="bg-white p-3 rounded-lg shadow-md mb-5 h-auto">
                    <h2 className="text-xl font-bold mb-4">MAP</h2>
                    <div >
                        <Map
                            departureCoords={departureCoords}
                            arrivalCoords={arrivalCoords}
                        />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md  mb-4 h-auto">
                    <h2 className="text-xl font-bold">Challenges</h2>
                </div>

                <div className='w-full flex justify-center items-center'>
                    <button className='ml-2 mt-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mb-1' onClick={handleRoute}>Dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default Routes;

