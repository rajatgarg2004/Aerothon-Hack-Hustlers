import React from 'react'
import airplane from '../assets/airplane.png';
import { useNavigate } from 'react-router-dom';

const MainRoutes = () => {

    const navigate = useNavigate();

  const handleRouteClick = async (departure, arrival) => {
    console.log(departure);
    console.log(arrival);
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

    try {
      const [departureCoords, arrivalCoords] = await Promise.all([
        fetchCoordinates(departure),
        fetchCoordinates(arrival),
      ]);

      navigate('/routes', { state: { departureCoords, arrivalCoords, departure, arrival } });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

    return (
        <div className='bg-cover mt-5 flex flex-col justify-center items-center'>
            <div>
                <h1 className='text-3xl font-bold text-white text-center mb-4'>Available Flight Routes</h1>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg mb-4 w-full max-w-4xl cursor-pointer' onClick={() => handleRouteClick('Mumbai', 'Bangalore')}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='flex flex-col items-center md:items-start'>
                        <h1 className='font-bold'>Flight No: LKM752</h1>
                        <p>Indian Airlines</p>
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                        <div className='flex flex-col justify-center items-center mx-4'>
                            <h1 className='font-bold text-4xl'>Mumbai</h1>
                        </div>
                        <div className='flex justify-center items-center mx-4'>
                            <img src={airplane} alt="airplane" className='w-16 md:w-24 lg:w-30' style={{ minWidth: '4rem' }} />
                        </div>
                        <div className='flex flex-col justify-center items-center mx-4'>
                            <h1 className='font-bold text-4xl'>Bangalore</h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center md:items-end'>
                        <div className='felx flex-row'>
                            <div>
                                <h1 className='font-bold text-xl'>Status</h1>
                            </div>
                            <div>
                                <h1 className='font-bold text-green-500'>ON TIME</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg mb-4 w-full max-w-4xl cursor-pointer' onClick={() => handleRouteClick('Hyderabad', 'Kolkata')}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='flex flex-col items-center md:items-start'>
                        <h1 className='font-bold'>Flight No: QWE347</h1>
                        <p>Indian Airlines</p>
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                        <div className='flex flex-col justify-center items-center mx-4'>
                            <h1 className='font-bold text-4xl'>Hyderabad</h1>
                        </div>
                        <div className='flex justify-center items-center mx-4'>
                            <img src={airplane} alt="airplane" className='w-16 md:w-24 lg:w-30' style={{ minWidth: '4rem' }} />
                        </div>
                        <div className='flex flex-col justify-center items-center mx-4'>
                            <h1 className='font-bold text-4xl'>Kolkata</h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center md:items-end'>
                        <div className='felx flex-row'>
                            <div>
                                <h1 className='font-bold text-xl'>Status</h1>
                            </div>
                            <div>
                                <h1 className='font-bold text-green-500'>ON TIME</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg mb-4 w-full max-w-4xl cursor-pointer' onClick={() => handleRouteClick('New Delhi', 'Mumbai')}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='flex flex-col items-center md:items-start'>
                        <h1 className='font-bold'>Flight No: EXT246</h1>
                        <p>Indian Airlines</p>
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                        <div className='flex flex-col justify-center items-center mx-4 whitespace-nowrap'>
                            <h1 className='font-bold text-4xl'>New Delhi</h1>
                        </div>
                        <div className='flex justify-center items-center mx-4'>
                            <img src={airplane} alt="airplane" className='w-16 md:w-24 lg:w-30' style={{ minWidth: '4rem' }} />
                        </div>
                        <div className='flex flex-col justify-center items-center mx-4'>
                            <h1 className='font-bold text-4xl'>Mumbai</h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center md:items-end'>
                        <div className='felx flex-row'>
                            <div>
                                <h1 className='font-bold text-xl'>Status</h1>
                            </div>
                            <div>
                                <h1 className='font-bold text-green-500'>ON TIME</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg mb-4 w-full max-w-4xl cursor-pointer' onClick={() => handleRouteClick('Bangalore', 'Hyderabad')}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='flex flex-col items-center md:items-start'>
                        <h1 className='font-bold'>Flight No: POK370</h1>
                        <p>Indian Airlines</p>
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                        <div className='flex flex-col justify-center items-center mx-4'>
                            <h1 className='font-bold text-4xl'>Bangalore</h1>
                        </div>
                        <div className='flex justify-center items-center mx-4'>
                            <img src={airplane} alt="airplane" className='w-16 md:w-24 lg:w-30' style={{ minWidth: '4rem' }} />
                        </div>
                        <div className='flex flex-col justify-center items-center mx-4'>
                            <h1 className='font-bold text-4xl'>Hyderabad</h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center md:items-end'>
                        <div className='felx flex-row'>
                            <div>
                                <h1 className='font-bold text-xl'>Status</h1>
                            </div>
                            <div>
                                <h1 className='font-bold text-green-500'>ON TIME</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg mb-4 w-full max-w-4xl cursor-pointer' onClick={() => handleRouteClick('Kolkata', 'New Delhi')}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='flex flex-col items-center md:items-start'>
                        <h1 className='font-bold'>Flight No: EVR350</h1>
                        <p>Indian Airlines</p>
                    </div>
                    <div className='flex flex-row items-center justify-center'>
                        <div className='flex flex-col justify-center items-center mx-4 whitespace-nowrap'>
                            <h1 className='font-bold text-4xl'>Kolkata</h1>
                        </div>
                        <div className='flex justify-center items-center mx-4'>
                            <img src={airplane} alt="airplane" className='w-16 md:w-24 lg:w-30' style={{ minWidth: '4rem' }} />
                        </div>
                        <div className='flex flex-col justify-center items-center mx-4 whitespace-nowrap'>
                            <h1 className='font-bold text-4xl'>New Delhi</h1>
                        </div>
                    </div>
                    <div className='flex flex-col items-center md:items-end'>
                        <div className='felx flex-row'>
                            <div>
                                <h1 className='font-bold text-xl'>Status</h1>
                            </div>
                            <div>
                                <h1 className='font-bold text-green-500'>ON TIME</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainRoutes;
