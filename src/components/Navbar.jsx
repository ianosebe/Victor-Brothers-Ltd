import React, { useState, useEffect } from 'react';
import { Menu, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname + location.hash);

  useEffect(() => {
    setActiveTab(location.pathname + location.hash || '/');
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/#home' },
    { name: 'Models', path: '/models' },
    { name: 'Experience', path: '/#experience' },
    { name: 'About', path: '/about' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed w-full z-50 bg-premiumBlack/70 backdrop-blur-lg border-b border-white/5 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white tracking-wider uppercase drop-shadow-md">
              Victor <span className="text-premiumRed">&</span> Brother's Ltd
            </Link>
          </div>
          
          {/* Glassmorphic Navigation Rectangle */}
          <div className="hidden md:flex items-center space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-2xl shadow-inner">
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

          {/* Icons */}
          <div className="flex items-center space-x-6 text-gray-300">
            <div className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
              <Search className="w-5 h-5 hover:text-white transition-colors" />
            </div>
            <div className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
              <User className="w-5 h-5 hover:text-white transition-colors" />
            </div>
            <div className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
              <Menu className="w-6 h-6 hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
