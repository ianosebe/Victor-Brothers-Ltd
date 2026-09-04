import React from 'react';
import { Menu, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed w-full z-50 bg-premiumBlack/80 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white tracking-wider uppercase">
              Victor <span className="text-premiumRed">&</span> Brother's Ltd
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Models', 'Purchase', 'Experience', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-premiumRed transition-colors duration-300 text-sm font-medium tracking-wide uppercase">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-6 text-gray-300">
            <Search className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <User className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <div className="md:hidden">
              <Menu className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
