import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RoutesPage from './pages/Routes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/routes" element={<RoutesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
