import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname + location.hash);

  useEffect(() => {
    setActiveTab(location.pathname + location.hash || '/');
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Models', path: '/models' },
    { name: 'Experience', path: '/experience' },
    { name: 'About', path: '/about' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed w-full z-50 pt-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 relative">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center drop-shadow-md hover:scale-105 transition-transform duration-300">
              <img src="/shield-logo.png" alt="Victor & Brother's Ltd" className="h-16 md:h-20 w-auto object-contain" />
            </Link>
          </div>
          
          {/* Glassmorphic Navigation Rectangle - Centered */}
          <div className="hidden md:flex items-center space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-2xl shadow-inner absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => {
              const isActive = activeTab === item.path || (item.path === '/' && activeTab === '');
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm font-bold tracking-wider uppercase ${
                    isActive 
                      ? 'text-premiumRed bg-white/10 shadow-sm' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side - Contact Button */}
          <div className="flex items-center">
            <Link to="/contact" className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-premiumRed text-white font-bold uppercase tracking-wider rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-premiumRed/20 text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
