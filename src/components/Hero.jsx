import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen w-full bg-premiumBlack overflow-hidden flex items-center justify-center">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <img 
          src="/home-bg.png" 
          alt="Dealership Cars" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Bottom gradient specifically for the scrolling cards visibility */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-premiumBlack to-transparent pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto -mt-24">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-6 drop-shadow-2xl"
        >
          WELCOME TO <span className="text-premiumRed drop-shadow-2xl">VICTOR & BROTHER'S</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-2xl text-white font-medium mb-10 max-w-2xl mx-auto drop-shadow-2xl"
        >
          Find, test, and buy top-tier secondhand vehicles from a family dealership that puts you first.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/models"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-premiumRed border border-transparent rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-premiumRed"
          >
            Discover Models
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Infinite scrolling cards */}
      <div className="absolute bottom-4 md:bottom-8 w-full overflow-hidden z-20">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex gap-4 md:gap-6 px-6 w-max"
        >
          {[
            { id: 1, img: '/car1.png', title: 'Ford F-150' },
            { id: 2, img: '/car2.png', title: 'Hyundai Tucson' },
            { id: 3, img: '/car3.png', title: 'Toyota Land Cruiser' },
            { id: 4, img: '/car4.png', title: 'Mazda 6' },
            // Duplicated for seamless loop
            { id: 5, img: '/car1.png', title: 'Ford F-150' },
            { id: 6, img: '/car2.png', title: 'Hyundai Tucson' },
            { id: 7, img: '/car3.png', title: 'Toyota Land Cruiser' },
            { id: 8, img: '/car4.png', title: 'Mazda 6' },
          ].map((card) => (
            <div 
              key={card.id} 
              className="w-48 md:w-64 h-32 md:h-40 bg-gray-900 rounded-2xl overflow-hidden shrink-0 shadow-2xl border border-gray-800/50 relative group cursor-pointer"
            >
              <img 
                src={card.img} 
                alt={card.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-premiumBlack/90 via-premiumBlack/20 to-transparent"></div>
              <div className="absolute bottom-0 w-full p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold text-lg tracking-wide">{card.title}</p>
                <div className="w-10 h-1 bg-premiumRed mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;
