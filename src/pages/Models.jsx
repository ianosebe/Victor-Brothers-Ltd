import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { cars as staticCars } from "../data/cars";
import { Search, ChevronRight, Filter, AlertCircle } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay },
});

const Models = () => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        let fetched = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // Fallback to static data if Firestore is empty
        if (fetched.length === 0) {
          fetched = staticCars;
        }
        setModels(fetched);
        setFilteredModels(fetched);
      } catch (error) {
        console.error("Error fetching models:", error);
        setModels(staticCars);
        setFilteredModels(staticCars);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  useEffect(() => {
    let result = models;
    // Filter by search
    if (searchTerm) {
      result = result.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        car.year.toString().includes(searchTerm)
      );
    }
    // Filter by status tab
    if (activeFilter === "available") {
      result = result.filter(car => car.status !== "sold");
    } else if (activeFilter === "sold") {
      result = result.filter(car => car.status === "sold");
    }
    setFilteredModels(result);
  }, [searchTerm, activeFilter, models]);

  if (loading) {
    return (
      <div className="min-h-screen bg-premiumBlack flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-premiumRed border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Loading Fleet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-premiumBlack pt-24 pb-28">
      {/* ── Page Header ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 pt-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-premiumRed/10 blur-[100px] rounded-full pointer-events-none" />
        <motion.div {...fadeUp()} className="text-center relative z-10">
          <p className="text-premiumRed text-xs font-bold tracking-[0.3em] uppercase mb-4">Our Collection</p>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6">
            The <span className="text-premiumRed">Fleet</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Discover a curated selection of premium vehicles. Precision engineering, unmatched luxury, and performance that speaks for itself.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Search & Filter Bar ── */}
        <motion.div 
          {...fadeUp(0.2)}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-[#111111] p-2 pr-2 md:pr-4 rounded-2xl border border-white/5 shadow-2xl"
        >
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by make, model, or year..."
              className="w-full bg-transparent text-white pl-12 pr-4 py-3 focus:outline-none placeholder-gray-600 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 p-2 md:p-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-6 overflow-x-auto">
            {["all", "available", "sold"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  activeFilter === tab 
                    ? "bg-premiumRed text-white shadow-lg shadow-premiumRed/20" 
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Fleet Grid ── */}
        {filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredModels.map((model, idx) => (
                <motion.div
                  key={model.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-[#111111] rounded-3xl overflow-hidden border border-white/5 shadow-2xl hover:border-premiumRed/30 transition-all duration-500 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-black flex-shrink-0">
                    <img 
                      src={model.image} 
                      alt={model.name} 
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${model.status !== 'sold' ? 'group-hover:scale-110' : ''}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/20 to-transparent" />
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/10 z-10">
                      <span className="text-white text-xs font-bold">{model.year}</span>
                    </div>

                    {/* Sold Overlay */}
                    {model.status === "sold" && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-20">
                        <div className="border-2 border-red-500 text-red-500 font-black text-3xl uppercase tracking-[0.3em] px-6 py-2 rotate-[-15deg] bg-black/40 backdrop-blur-md rounded-xl">
                          Sold
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-black text-white mb-2 truncate" title={model.name}>
                      {model.name}
                    </h3>
                    
                    {/* Features Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {(model.features || []).slice(0, 4).map((feature, i) => (
                        <span key={i} className="text-[10px] text-gray-400 bg-white/5 border border-white/10 px-2 py-1 rounded-md whitespace-nowrap">
                          {feature}
                        </span>
                      ))}
                      {(model.features || []).length > 4 && (
                        <span className="text-[10px] text-gray-500 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                          +{(model.features.length - 4)}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Price</p>
                        <p className={`text-2xl font-black ${model.status === 'sold' ? 'text-gray-500 line-through' : 'text-premiumRed'}`}>
                          Ksh {model.price}
                        </p>
                      </div>
                      <Link 
                        to={`/models/${model.id}`}
                        className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 ${
                          model.status === 'sold' 
                            ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                            : 'bg-premiumRed text-white shadow-lg shadow-premiumRed/20 hover:bg-red-600 hover:-translate-y-0.5'
                        }`}
                      >
                        Details <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-[#111111] border border-white/5 rounded-3xl p-16 text-center max-w-2xl mx-auto"
          >
            <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Vehicles Found</h3>
            <p className="text-gray-500 text-sm">
              We couldn't find any models matching your criteria. Try adjusting your search or filters.
            </p>
            <button 
              onClick={() => { setSearchTerm(""); setActiveFilter("all"); }}
              className="mt-6 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Models;
