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
    const [betweenData, setBetweenData] = useState([]);
    const [optimalPath, setOptimalPath] = useState("");
    const [optimalPathColor, setOptimalPathColor] = useState('');

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

        const dataFetch = async (city) => {
            const backendUrl = window.env.REACT_APP_backend_url;
            const apiUrl = `${backendUrl}/api/classify`; 
            const data1 = { city: city };
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data1),
                });
                if (!response.ok) throw new Error('Could not get weather data');
                const data = await response.json();
                console.log(data);
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
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
                    let condition = await dataFetch('Pune');
                    condition.city = 'Pune';
                    let data = [];
                    data.push(condition);
                    setBetweenData(data);
                }

                if (['New Delhi', 'Kolkata'].includes(arrival)) {
                    const [ranchiWeatherData, lucknowWeatherData] = await Promise.all([
                        fetchWeatherByCity('Ranchi'),
                        fetchWeatherByCity('Lucknow'),
                    ]);
                    setRanchiWeather(ranchiWeatherData);
                    setLucknowWeather(lucknowWeatherData);
                    let data = [];
                    let dataRanchi = await dataFetch('Ranchi');
                    dataRanchi.city = 'Ranchi';
                    data.push(dataRanchi);
                    let dataLucknow = await dataFetch('Lucknow');
                    dataLucknow.city = 'Lucknow';
                    data.push(dataLucknow);
                    console.log(data);
                    setBetweenData(data);
                }
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            }
        };

        fetchAllWeather();
    }, [departureCoords, arrivalCoords, arrival]);

    useEffect(() => {
        if (betweenData.length > 0) {
            const optimalPathData = betweenData.find(data => data.flight_condition === 'optimal');
            if (optimalPathData) {
                const directPath = `The optimal path is from ${departure} -> ${arrival} [BLUE]`;
                const optimalRouteViaCity = `Alternative path: ${departure} -> ${optimalPathData.city} -> ${arrival} [YELLOW]`;
                setOptimalPath(`${directPath}\n${optimalRouteViaCity}`);
                setOptimalPathColor(''); // No need to set a color since we're including it in the strings
            } else {
                setOptimalPath(`The optimal path is from ${departure} to ${arrival} [BLUE]`);
                setOptimalPathColor('BLUE');
            }
        } else {
            setOptimalPath(`The optimal path is from ${departure} to ${arrival} [BLUE]`);
            setOptimalPathColor('BLUE');
        }
    }, [betweenData, arrival, departure]);

    const handleRoute = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between min-h-screen p-4">
            <div className='flex flex-col 2xl:w-[48%] xl:w-[48%] lg:w-[48%] w-[100%]'>
                <div className="bg-white p-5 rounded-lg shadow-md mb-4">
                    <h2 className="text-2xl font-bold mb-2">Available Routes</h2>
                    <div className='flex flex-row justify-between'>
                        {betweenData.map((condition, index) => (
                            <li key={index} className='list-none'>
                                <h1 className='text-xl'>
                                    Route {index + 1}
                                </h1>
                                <ul className='text-xl'>
                                    <li><b>City</b>: <b>{condition.city}</b></li>
                                    <li><b>Cluster Label</b>: {condition.cluster_label}</li>
                                    <li><b>Condition</b>: {condition.condition}</li>
                                    <li><b>Flight Condition</b>: {condition.flight_condition}</li>
                                    <li><b>Float Value</b>: {condition.float_value.toPrecision(6)}</li>
                                    <li><b>Score</b>: {condition.score.toPrecision(6)}</li>
                                </ul>
                            </li>
                        ))}
                    </div>
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
                    <div>
                        <Map
                            departureCoords={departureCoords}
                            arrivalCoords={arrivalCoords}
                        />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md mb-4 h-auto">
                    <h2 className="text-2xl font-bold mb-2">Optimal Routes</h2>
                    <div className="text-xl whitespace-pre-wrap">{optimalPath}</div>
                </div>

                <div className='w-full flex justify-center items-center'>
                    <button className='ml-2 mt-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mb-1' onClick={handleRoute}>Dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default Routes;
