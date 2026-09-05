import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Tags, ThumbsUp, Car } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Car className="w-8 h-8 text-premiumRed" />,
      title: "Premium Selection",
      description: "We carefully source the finest pre-owned and refurbished vehicles, ensuring every car on our lot meets strict standards for performance and aesthetics."
    },
    {
      icon: <Tags className="w-8 h-8 text-premiumRed" />,
      title: "Absolute Value",
      description: "Luxury and reliability shouldn't break the bank. We offer highly competitive, suitable prices so you can drive your dream car without compromise."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-premiumRed" />,
      title: "Trusted Quality",
      description: "Every vehicle undergoes rigorous mechanical inspection and detailing. When you buy from us, you buy with absolute confidence and peace of mind."
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-premiumRed" />,
      title: "Customer First",
      description: "We believe in building relationships, not just making sales. Our team is dedicated to giving you a seamless, transparent, and joyful buying experience."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-premiumBlack px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 mt-10"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-wider">
            About <span className="text-premiumRed">Us</span>
          </h1>
          <div className="w-24 h-1 bg-premiumRed mx-auto rounded-full mb-8"></div>
          
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            At <strong className="text-white">Victor & Brother's Ltd</strong>, we believe that driving a phenomenal car should be an accessible reality, not a distant dream. 
            We specialize in delivering exceptionally clean, high-quality <span className="text-premiumRed font-semibold">refurbished and pre-owned vehicles</span> that look, feel, and drive like new. 
            By bridging the gap between top-tier automotive quality and absolutely suitable prices, we ensure that you never have to compromise on style or reliability.
          </p>
        </motion.div>

        {/* Why Choose Us Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:bg-gray-800 transition-colors duration-300 group"
            >
              <div className="bg-black/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-800 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background red glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-premiumRed/5 blur-[100px] pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            Ready to find your perfect ride?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg relative z-10">
            Browse our extensive collection of carefully vetted vehicles and drive away with confidence. Exceptional quality is just a click away.
          </p>
          <a href="/models" className="inline-block bg-premiumRed text-white font-bold tracking-wider uppercase px-8 py-4 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-lg shadow-premiumRed/30 relative z-10">
            Explore Our Models
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
