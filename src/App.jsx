import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Models from './pages/Models';
import About from './pages/About';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-premiumBlack">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div className="pt-40 text-white text-center text-2xl">Page Not Found. <br/> URL: {window.location.pathname}</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
