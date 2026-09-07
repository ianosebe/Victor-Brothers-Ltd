import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Models from './pages/Models';
import About from './pages/About';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import CarDetails from './pages/CarDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-premiumBlack">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:id" element={<CarDetails />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<div className="pt-40 text-white text-center text-2xl">Page Not Found. <br/> URL: {window.location.pathname}</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
