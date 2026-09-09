import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ShieldCheck, Zap, Award, Phone,
  MapPin, Mail, Clock, Star, ChevronRight,
} from "lucide-react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase";
import { cars as staticCars } from "../data/cars";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

const trustItems = [
  "? 500+ Vehicles Sold",
  "? 10 Years in Business",
  "? Certified Pre-Owned",
  "? Flexible Financing",
  "? 450+ Happy Clients",
  "? Post-Sale Support",
  "? 20+ Top Brands",
  "? Free Test Drive",
];

const pillars = [
  { icon: ShieldCheck, title: "Verified & Certified", desc: "Every vehicle undergoes a rigorous multi-point inspection with full history and ownership checks." },
  { icon: Zap, title: "Fast-Track Purchase", desc: "Streamlined paperwork and flexible payment plans so you drive away sooner." },
  { icon: Award, title: "Award-Winning Service", desc: "Consistently rated top dealership in the region for transparency and customer care." },
  { icon: Star, title: "Premium Selection", desc: "Hand-curated inventory from the world's most trusted automotive brands." },
];

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, "cars"), limit(6));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setFeaturedCars(fetched.length > 0 ? fetched : staticCars.slice(0, 6));
      } catch {
        setFeaturedCars(staticCars.slice(0, 6));
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-premiumBlack min-h-screen">
      <Hero />

      {/* Trust Marquee Strip */}
      <div className="relative overflow-hidden bg-premiumRed py-3 border-y border-red-800">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
          className="flex gap-10 w-max whitespace-nowrap"
        >
          {[...trustItems, ...trustItems].map((item, i) => (
            <span key={i} className="text-white text-xs font-bold tracking-widest uppercase">{item}</span>
          ))}
        </motion.div>
      </div>

      {/* Featured Vehicles */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="text-premiumRed text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Inventory</p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-none">
              Featured <br /><span className="text-premiumRed">Vehicles</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-gray-400 leading-relaxed text-sm">
              Hand-picked from our showroom � each vehicle rigorously inspected, certified, and ready to deliver an outstanding ownership experience.
            </p>
            <Link to="/models" className="inline-flex items-center gap-2 mt-4 text-premiumRed text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all duration-300">
              Browse all inventory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car, idx) => (
            <motion.div
              key={car.id}
              {...fadeUp(idx * 0.1)}
              className="group relative bg-[#111111] rounded-3xl overflow-hidden border border-white/5 shadow-2xl hover:border-premiumRed/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
                  <span className="text-white text-xs font-bold">{car.year}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to="/models" className="flex items-center gap-2 px-5 py-2.5 bg-premiumRed text-white text-sm font-bold rounded-full shadow-lg -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    View Details <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-white mb-1 truncate">{car.name}</h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(car.features || []).slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[10px] text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
                <div className="h-px bg-white/5 mb-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Price</p>
                    <p className="text-2xl font-black text-premiumRed">Ksh {car.price}</p>
                  </div>
                  <Link to="/contact" className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/5 hover:bg-premiumRed border border-white/10 hover:border-premiumRed px-4 py-2 rounded-full transition-all duration-300">
                    Inquire <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.2)} className="text-center mt-14">
          <Link to="/models" className="inline-flex items-center gap-3 px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:-translate-y-0.5 text-sm">
            View Full Inventory <ArrowRight className="w-5 h-5 text-premiumRed" />
          </Link>
        </motion.div>
      </section>

      {/* Why Victor & Brothers */}
      <section className="py-28 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-premiumBlack via-[#0f0f0f] to-premiumBlack pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-premiumRed/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-premiumRed text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Promise</p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              Why Choose <span className="text-premiumRed">Victor &amp; Brothers?</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              We don't just sell cars � we build lasting relationships rooted in trust, quality, and care.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.12)}
                className="group relative p-7 rounded-3xl border border-white/6 bg-white/3 backdrop-blur-sm hover:border-premiumRed/40 hover:bg-premiumRed/5 transition-all duration-500 cursor-default overflow-hidden"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-premiumRed/10 border border-premiumRed/20 mb-5 group-hover:bg-premiumRed/20 transition-colors duration-300">
                  <p.icon className="w-6 h-6 text-premiumRed" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-premiumRed scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Victor Experience */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp()}>
              <p className="text-premiumRed text-xs font-bold tracking-[0.3em] uppercase mb-4">The Experience</p>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                A Dealership <br /><span className="text-premiumRed">Built for You</span>
              </h2>
              <div className="w-16 h-0.5 bg-premiumRed rounded-full mb-8" />
              <p className="text-gray-400 text-base mb-10 leading-relaxed max-w-lg">
                Buying a car is more than a transaction � it's the beginning of a journey. We've reimagined every step so it's simple, transparent, and centred around you.
              </p>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Verified Authenticity", desc: "Complete history checks and clear ownership trails on every vehicle." },
                  { icon: Zap, title: "Fast-Track Financing", desc: "Flexible payment options tailored to your budget, processed in days." },
                  { icon: Award, title: "Post-Sale Support", desc: "Dedicated after-sales care long after you drive off our lot." },
                ].map((item, i) => (
                  <motion.div key={i} {...fadeUp(0.1 + i * 0.1)} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-premiumRed/10 border border-premiumRed/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-premiumRed" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/experience" className="inline-flex items-center gap-2 text-premiumRed font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all duration-300">
                  Discover Our Full Process <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-premiumRed/15 blur-[80px] rounded-full pointer-events-none" />
              <img src="/home-bg.png" alt="Showroom" className="relative z-10 rounded-3xl shadow-2xl border border-white/8 object-cover w-full h-[520px]" style={{ filter: "brightness(0.9) saturate(1.1)" }} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 z-20 bg-[#111111] border border-white/10 rounded-2xl px-6 py-4 shadow-2xl"
              >
                <p className="text-4xl font-black text-premiumRed leading-none">10+</p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Years of Trust</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-6 -right-6 z-20 bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-premiumRed text-premiumRed" />))}
                </div>
                <div>
                  <p className="text-white text-sm font-bold">4.9 / 5.0</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">Client Rating</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-28 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0">
          <img src="/home-bg.png" alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.2) saturate(0.6)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-premiumBlack via-premiumBlack/80 to-premiumBlack" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp()}>
            <p className="text-premiumRed text-xs font-bold tracking-[0.3em] uppercase mb-4">Get Started Today</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Your Dream Car <br /><span className="text-premiumRed">Awaits You</span>
            </h2>
            <p className="text-gray-400 text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Our team is standing by to help you find the perfect vehicle, arrange financing, and get you on the road � fast.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 bg-premiumRed text-white font-bold uppercase tracking-wider rounded-full hover:bg-red-600 transition-all duration-300 shadow-xl shadow-premiumRed/30 hover:-translate-y-0.5 text-sm">
                <Phone className="w-4 h-4" /> Contact Us Now
              </Link>
              <Link to="/models" className="flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 bg-transparent border border-white/25 text-white font-bold uppercase tracking-wider rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:-translate-y-0.5 text-sm">
                Browse Models <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-b border-white/5">
            <div>
              <img src="/vb-logo.png" alt="Victor & Brothers Ltd" className="h-14 w-auto object-contain mb-5" style={{ mixBlendMode: "lighten" }} />
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Kenya's trusted premium secondhand vehicle dealership. Quality, transparency, and service � since day one.
              </p>
              <div className="flex gap-3 mt-6">
                {["FB", "IG", "WA"].map((s) => (
                  <div key={s} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:border-premiumRed/50 hover:bg-premiumRed/10 transition-all duration-300">
                    <span className="text-[9px] font-bold text-gray-400">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", to: "/" },
                  { label: "Our Models", to: "/models" },
                  { label: "The Experience", to: "/experience" },
                  { label: "About Us", to: "/about" },
                  { label: "Contact", to: "/contact" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-gray-500 hover:text-premiumRed text-sm transition-colors duration-200 flex items-center gap-2 group">
                      <ChevronRight className="w-3 h-3 text-premiumRed opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Get In Touch</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-premiumRed mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500 text-sm leading-relaxed">Nairobi, Kenya</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-premiumRed flex-shrink-0" />
                  <span className="text-gray-500 text-sm">0748448411</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-premiumRed flex-shrink-0" />
                  <span className="text-gray-500 text-sm"> osorovictor375@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-700 text-xs">&copy; {new Date().getFullYear()} Victor &amp; Brothers Ltd. All rights reserved.</p>
            <p className="text-gray-700 text-xs">Motor Dealers Established in kenya</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
