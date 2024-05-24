import React from 'react';
import searchicon from '../assets/searchicon.png';

const SearchForm = ({
  inputDepartureLocation,
  setInputDepartureLocation,
  inputArrivalLocation,
  setInputArrivalLocation,
  handleSearch
}) => {
  return (
    <div className='flex flex-row items-center mb-6 justify-center relative'>
      <div className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <img src={searchicon} alt="Search Icon" className="h-6 w-6" />
        </span>
        <input
          type="text"
          className="pl-12 pr-4 py-2 w-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 transition duration-150 ease-in-out mr-2"
          placeholder="Departure"
          value={inputDepartureLocation}
          onChange={(e) => setInputDepartureLocation(e.target.value)}
        />
      </div>
      <div className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <img src={searchicon} alt="Search Icon" className="h-6 w-6" />
        </span>
        <input
          type="text"
          className="pl-12 pr-4 py-2 w-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
          placeholder="Arrival"
          value={inputArrivalLocation}
          onChange={(e) => setInputArrivalLocation(e.target.value)}
        />
      </div>
      <button
        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchForm;
