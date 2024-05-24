import React from 'react';
import logo from '../assets/logo.png';

const NavBar = () => {
  return (
    <nav className='bg-[rgb(6,25,58)] p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white font-bold text-lg flex items-center'>
          <img src={logo} alt="logo" className='w-32 h-auto ml-3' />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
