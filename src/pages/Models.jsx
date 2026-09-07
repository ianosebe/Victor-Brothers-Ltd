import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Models = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cars'));
        const carsList = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setModels(carsList);
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  if (loading) {
    return <div className="pt-24 min-h-screen bg-premiumBlack text-white text-center text-xl font-bold">Loading Vehicles...</div>;
  }

  return (
    <div className="pt-24 min-h-screen bg-premiumBlack px-4 sm:px-6 lg:px-8 pb-20">

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            OUR <span className="text-premiumRed">MODELS</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover the perfect blend of performance, luxury, and innovation.
          </p>
        </motion.div>

        {/* Using a grid with 4 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {models.map((model, index) => (
            <div
              key={model.id}
              className="relative w-full h-72 sm:h-80 md:h-64 lg:h-72 rounded-xl overflow-hidden shadow-lg group bg-gray-900"
            >
              {/* Full Background Image */}
              {model.image ? (
                <img 
                  src={model.image} 
                  alt={model.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  <span>Image Coming Soon</span>
                </div>
              )}
              
              {/* Gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>

              {model.status === 'sold' && (
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg transform rotate-12 z-10">
                  SOLD
                </div>
              )}
              
              {/* Description Box Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="bg-white rounded-lg p-3 shadow-2xl transform translate-y-1 group-hover:-translate-y-1 transition-transform duration-300">
                  
                  <div className="flex justify-between items-center mb-1.5">
                    <h3 className="text-sm font-extrabold text-gray-900 truncate pr-2">{model.name}</h3>
                    <span className="bg-premiumRed text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                      {model.year}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {model.features.map((feature, i) => (
                      <span key={i} className="text-[9px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <div className="text-sm font-black text-gray-900">Ksh {model.price}</div>
                    <Link 
                      to={`/models/${model.id}`}
                      className="bg-black text-[10px] font-bold text-premiumRed hover:bg-gray-800 uppercase tracking-wider flex items-center px-2.5 py-1.5 rounded-md transition-colors"
                    >
                      Details
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          ))}
          
          
        </div>
      </div>
    </div>
  );
};

export default Models;
