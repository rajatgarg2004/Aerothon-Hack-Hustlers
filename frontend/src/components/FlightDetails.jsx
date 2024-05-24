import React from 'react';
import airplane from '../assets/airplane.png';

const FlightDetails = ({ departureLocation, arrivalLocation }) => {
  return (
    <div className='w-full bg-gray-100 p-4 rounded-lg'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='flex flex-col items-center md:items-start'>
          <h1 className='font-bold'>Flight No: XYZ123</h1>
          <p>Indian Airlines</p>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <div className='flex flex-col justify-center items-center mx-4'>
            <h1 className='font-bold text-4xl'>{departureLocation}</h1>
          </div>
          <div className='flex justify-center items-center mx-4'>
            <img src={airplane} alt="airplane" className='w-16 md:w-24 lg:w-30' style={{ minWidth: '4rem' }} />
          </div>
          <div className='flex flex-col justify-center items-center mx-4'>
            <h1 className='font-bold text-4xl'>{arrivalLocation}</h1>
          </div>
        </div>
        <div className='flex flex-col items-center md:items-end'>
          <h1 className='font-bold text-xl'>Status: ON TIME</h1>
        </div>
      </div>
      <div className='w-full bg-gray-100 p-4 rounded-lg mt-1'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col items-center border-r-2 border-black'>
            <div className='rounded-xl bg-gray-400 px-2'>
              <h1 className='font-bold'>Departure</h1>
            </div>
            <p className='font-bold'>Terminal: A</p>
            <p>Gate: 12</p>
          </div>
          <div className='flex flex-col items-center'>
            <div className='rounded-xl bg-gray-400 px-2'>
              <h1 className='font-bold'>Arrival</h1>
            </div>
            <p className='font-bold'>Terminal: B</p>
            <p>Gate: 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
