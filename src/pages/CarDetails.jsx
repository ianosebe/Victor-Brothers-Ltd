import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { cars as staticCars } from "../data/cars";
import { ArrowLeft, Check, AlertCircle, Calendar, ShieldCheck, Phone } from "lucide-react";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCar({ ...docSnap.data(), id: docSnap.id });
        } else {
          const fallback = staticCars.find(c => c.id.toString() === id);
          setCar(fallback || null);
        }
      } catch (error) {
        const fallback = staticCars.find(c => c.id.toString() === id);
        setCar(fallback || null);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-premiumBlack flex items-center justify-center pt-24">
      <div className="w-12 h-12 border-2 border-premiumRed border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!car) return (
    <div className="min-h-screen bg-premiumBlack flex flex-col items-center justify-center pt-24 text-white">
      <AlertCircle className="w-16 h-16 text-premiumRed mb-4" />
      <h2 className="text-3xl font-black mb-2">Vehicle Not Found</h2>
      <p className="text-gray-400 mb-6">This vehicle may have been removed or sold.</p>
      <Link to="/models" className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold transition">Back to Models</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-premiumBlack pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/models" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Fleet
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative rounded-3xl overflow-hidden bg-[#111] border border-white/5 shadow-2xl h-[400px] lg:h-[600px]">
            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {car.status === 'sold' && (
              <div className="absolute top-6 right-6 bg-red-600/90 backdrop-blur text-white px-6 py-2 rounded-xl font-black tracking-widest uppercase border border-red-400 shadow-2xl rotate-12">SOLD</div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><Calendar className="w-3 h-3"/> {car.year}</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><ShieldCheck className="w-3 h-3"/> Certified</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2">{car.name}</h1>
              <p className={`text-3xl font-black ${car.status === 'sold' ? 'text-gray-500 line-through' : 'text-premiumRed'}`}>Ksh {car.price}</p>
            </div>

            <div className="h-px bg-white/5 my-8" />

            <div className="mb-8">
              <h3 className="text-white font-bold text-lg mb-4">Vehicle Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {car.features?.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <Check className="w-4 h-4 text-premiumRed" /> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5 my-8" />

            <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-2">Interested in this vehicle?</h4>
              <p className="text-gray-500 text-sm mb-6">Contact our sales team directly to schedule a viewing or request more information.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/contact?vehicle=${encodeURIComponent(car.name)}`} className="flex-1 flex items-center justify-center gap-2 bg-premiumRed hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-premiumRed/20 text-sm">
                  <Phone className="w-4 h-4" /> Inquire Now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default CarDetails;
