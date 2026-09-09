import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname + location.hash);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActiveTab(location.pathname + location.hash || '/');
    // Close mobile menu when navigating
    setIsOpen(false);
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
      className="fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 relative">
          {/* Logo */}
          <div className="flex items-stretch self-stretch">
            <Link
              to="/"
              className="flex items-center hover:opacity-90 transition-opacity duration-300"
            >
              <img
                src="/vb-logo.png"
                alt="Victor & Brothers Ltd"
                className="h-24 w-auto object-contain"
                style={{ mixBlendMode: 'lighten' }}
              />
            </Link>
          </div>
          
          {/* Navigation Links — clean, no box (Desktop) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => {
              const isActive = activeTab === item.path || (item.path === '/' && activeTab === '');
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="relative group flex flex-col items-center pb-1"
                >
                  <span 
                    className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Animated red underline indicator */}
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-premiumRed rounded-full"
                    style={{ opacity: isActive ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />

                  {/* Hover underline (inactive links only) */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white/25 rounded-full group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side — Contact & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link 
              to="/contact" 
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-premiumRed text-white font-bold uppercase tracking-wider rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg shadow-premiumRed/20 hover:shadow-premiumRed/40 hover:-translate-y-0.5 text-sm"
            >
              Contact Us
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 hover:text-premiumRed transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6 text-premiumRed" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 bg-black/90 backdrop-blur-2xl border border-gray-800 rounded-2xl overflow-hidden shadow-2xl md:hidden"
          >
            <div className="flex flex-col py-4">
              {navItems.map((item) => {
                const isActive = activeTab === item.path || (item.path === '/' && activeTab === '');
                return (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    className={`px-6 py-4 transition-colors font-bold tracking-wider uppercase border-b border-gray-800/50 last:border-0 ${
                      isActive 
                        ? 'text-premiumRed bg-white/5' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link 
                to="/contact" 
                className="mx-6 mt-4 px-6 py-3 bg-premiumRed text-white font-bold uppercase tracking-wider rounded-xl text-center shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
