import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RoutesPage from './pages/Routes';
import './App.css';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  return (
    <div className='bg-gradient-to-br from-[#061c07] from-0% via-black via-50% to-[#061c07] to-95%'>
    <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/routes" element={<RoutesPage />} />
        </Routes>
      </BrowserRouter>
    <Footer/>
    </div>

  );
}

export default App;
