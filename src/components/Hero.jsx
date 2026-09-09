import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, Shield, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Vehicles Sold', value: '500+' },
  { label: 'Happy Clients', value: '450+' },
  { label: 'Years of Trust', value: '10+' },
  { label: 'Top Brands', value: '20+' },
];

const Hero = () => {
  return (
    <div className="relative h-screen w-full bg-premiumBlack overflow-hidden flex items-center justify-center">

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/home-bg.png"
          alt="Dealership showroom"
          className="w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(0.45) saturate(1.1)' }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-premiumBlack pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

      {/* Red glow accent */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,42,42,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto" style={{ marginTop: '-6rem' }}>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-premiumRed/40 bg-premiumRed/10 backdrop-blur-sm"
        >
          <Shield className="w-4 h-4 text-premiumRed" />
          <span className="text-xs md:text-sm font-semibold text-white/90 tracking-widest uppercase">
            Kenya's Trusted Auto Dealer
          </span>
          <Star className="w-4 h-4 text-premiumRed fill-premiumRed" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 leading-none"
        >
          Drive Your{' '}
          <span
            className="text-premiumRed relative inline-block"
            style={{ textShadow: '0 0 40px rgba(255,42,42,0.5)' }}
          >
            Dream
            {/* Underline accent */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="absolute left-0 -bottom-1 w-full h-1 bg-premiumRed rounded-full origin-left"
            />
          </span>{' '}
          Today
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="text-base md:text-xl text-white/70 font-light mb-3 max-w-2xl mx-auto leading-relaxed"
        >
          At <span className="text-white font-semibold">Victor &amp; Brother's</span>, we connect you with
          premium secondhand vehicles which are inspected, certified, and priced to fit your budget.
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-16 h-0.5 bg-premiumRed mx-auto mb-8 rounded-full"
        />

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            to="/models"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base bg-premiumRed hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-premiumRed/40 hover:shadow-xl hover:-translate-y-0.5"
          >
            Browse Our Fleet
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="inline-flex flex-wrap justify-center gap-6 md:gap-10 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center min-w-[60px]">
              <p className="text-2xl md:text-3xl font-black text-premiumRed leading-none">{stat.value}</p>
              <p className="text-xs text-white/50 mt-1 tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-52 md:bottom-60 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>

      {/* Fade to scrolling cards */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-premiumBlack via-premiumBlack/80 to-transparent pointer-events-none z-10" />

      {/* Infinite scrolling car cards */}
      <div className="absolute bottom-4 md:bottom-6 w-full overflow-hidden z-20">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
          className="flex gap-3 md:gap-5 px-4 w-max"
        >
          {[
            { id: 1, img: '/car1.png', title: 'Ford F-150', tag: 'Pick-Up' },
            { id: 2, img: '/car2.png', title: 'Hyundai Tucson', tag: 'SUV' },
            { id: 3, img: '/car3.png', title: 'Toyota Land Cruiser', tag: 'SUV' },
            { id: 4, img: '/car4.png', title: 'Mazda 6', tag: 'Sedan' },
            // Duplicated for seamless loop
            { id: 5, img: '/car1.png', title: 'Ford F-150', tag: 'Pick-Up' },
            { id: 6, img: '/car2.png', title: 'Hyundai Tucson', tag: 'SUV' },
            { id: 7, img: '/car3.png', title: 'Toyota Land Cruiser', tag: 'SUV' },
            { id: 8, img: '/car4.png', title: 'Mazda 6', tag: 'Sedan' },
          ].map((card) => (
            <div
              key={card.id}
              className="w-44 md:w-60 h-28 md:h-38 bg-gray-900 rounded-2xl overflow-hidden shrink-0 shadow-2xl border border-white/5 relative group cursor-pointer"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Card gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              {/* Category tag */}
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-premiumRed/80 backdrop-blur-sm">
                <span className="text-[9px] text-white font-bold tracking-wider uppercase">{card.tag}</span>
              </div>
              {/* Title */}
              <div className="absolute bottom-0 w-full px-3 py-2">
                <p className="text-white font-bold text-sm tracking-wide truncate">{card.title}</p>
                <motion.div
                  className="h-0.5 bg-premiumRed mt-1 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;
