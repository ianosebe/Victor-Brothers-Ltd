import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Award, Phone } from 'lucide-react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Just fetch the first 3 cars to feature
        const q = query(collection(db, 'cars'), limit(3));
        const snapshot = await getDocs(q);
        const cars = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setFeaturedCars(cars);
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-premiumBlack min-h-screen pt-20 md:pt-0">
      {/* Hero section at the very top */}
      <Hero />
      
      {/* Featured Vehicles Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-wider">
            Featured <span className="text-premiumRed">Vehicles</span>
          </h2>
          <div className="w-20 h-1 bg-premiumRed mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hand-picked selections from our premium showroom. Exceptional quality, rigorously inspected, and ready for the road.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredCars.map((car, idx) => (
            <motion.div 
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group relative block"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-bold text-white mb-2">{car.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-premiumRed font-black text-lg">Ksh {car.price}</span>
                  <Link to="/models" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider flex items-center transition-colors">
                    View <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/models" className="inline-flex items-center justify-center px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:-translate-y-1">
            View All Inventory <ArrowRight className="ml-3 w-5 h-5 text-premiumRed" />
          </Link>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gradient-to-b from-gray-900 to-premiumBlack border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-wider">
                The Victor <span className="text-premiumRed">Experience</span>
              </h2>
              <div className="w-20 h-1 bg-premiumRed rounded-full mb-8"></div>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Buying a car is more than a transaction; it's the beginning of a journey. We redefine the dealership experience by focusing on absolute transparency, unmatched quality, and customer satisfaction.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <ShieldCheck className="w-6 h-6 text-premiumRed" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-bold text-lg">Verified Authenticity</h4>
                    <p className="text-gray-500 text-sm mt-1">Every vehicle comes with complete history checks and clear ownership trails.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Zap className="w-6 h-6 text-premiumRed" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-bold text-lg">Fast-Track Financing</h4>
                    <p className="text-gray-500 text-sm mt-1">Streamlined purchase process with flexible payment options tailored to you.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Award className="w-6 h-6 text-premiumRed" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-bold text-lg">Post-Sale Support</h4>
                    <p className="text-gray-500 text-sm mt-1">Our relationship doesn't end when you drive off. We offer dedicated after-sales care.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Link to="/experience" className="inline-flex items-center text-premiumRed font-bold hover:text-white transition-colors uppercase tracking-wider text-sm">
                  Discover Our Full Process <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-premiumRed/20 blur-[100px] rounded-full"></div>
              <img src="/home-bg.png" alt="Experience" className="relative z-10 rounded-2xl shadow-2xl border border-gray-800 object-cover h-[500px] w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Purchase / Contact Section */}
      <section id="purchase" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-premiumRed/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 border border-gray-800 rounded-3xl p-10 md:p-16 shadow-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-wider">
              Ready to <span className="text-premiumRed">Purchase?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Our team is ready to assist you in making your dream car a reality. Get in touch with us to schedule a viewing or discuss financing options.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-premiumRed text-white font-bold uppercase tracking-wider rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-premiumRed/30">
                <Phone className="w-5 h-5 mr-2" /> Contact Us
              </Link>
              <Link to="/models" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-colors">
                Browse Models
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-900 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-white tracking-wider uppercase mb-4">
            Victor <span className="text-premiumRed">&</span> Brother's Ltd
          </h3>
          <p className="text-gray-600 text-sm mb-6">Premium secondhand vehicles.</p>
          <p className="text-gray-800 text-xs">&copy; {new Date().getFullYear()} Victor & Brother's Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
