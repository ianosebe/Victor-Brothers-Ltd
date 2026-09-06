import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const docRef = doc(db, 'cars', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setCar({ id: docSnap.id, ...docSnap.data() });
        } else {
          setCar(null);
        }
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) {
    return <div className="pt-40 min-h-screen bg-premiumBlack text-white text-center text-xl font-bold">Loading Details...</div>;
  }

  if (!car) {
    return (
      <div className="pt-40 min-h-screen bg-premiumBlack text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Car Not Found</h2>
        <Link to="/models" className="text-premiumRed hover:underline">
          Back to Models
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-premiumBlack px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-5xl mx-auto">
        <Link to="/models" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Models
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
            {car.image ? (
              <img 
                src={car.image} 
                alt={car.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Image Coming Soon
              </div>
            )}
            {car.status === 'sold' && (
              <div className="absolute top-4 right-4 bg-red-600 text-white text-lg font-bold px-4 py-2 rounded shadow-2xl transform rotate-12 z-10">
                SOLD
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-900">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                {car.name}
              </h1>
              <span className="bg-premiumRed text-white text-sm font-bold px-3 py-1 rounded">
                {car.year}
              </span>
            </div>

            <div className="text-2xl font-black text-premiumRed mb-8">
              Ksh {car.price}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                Features & Specifications
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 text-premiumRed mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/contact" className="w-full inline-block text-center bg-premiumRed text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors uppercase tracking-widest text-sm">
              Contact Us About This Car
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarDetails;
