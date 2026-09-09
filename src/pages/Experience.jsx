import React from "react";
import { motion } from "framer-motion";
import { Search, Wrench, CreditCard, Key } from "lucide-react";

const Experience = () => {
  const steps = [
    { icon: Search, title: "1. Discover", desc: "Browse our curated digital showroom or visit us in person. Our experts will help match you with the perfect vehicle for your lifestyle and budget." },
    { icon: Wrench, title: "2. Inspect & Test", desc: "Every car comes with a comprehensive health check report. Take it for a spin and experience the quality firsthand before making any commitments." },
    { icon: CreditCard, title: "3. Finance & Paperwork", desc: "We handle the heavy lifting. From flexible financing options to rapid registration transfers, we ensure a seamless and transparent process." },
    { icon: Key, title: "4. Drive Away", desc: "Receive the keys to your fully detailed, certified vehicle. Enjoy peace of mind with our dedicated post-sale support team." }
  ];

  return (
    <div className="min-h-screen bg-premiumBlack pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20 pt-10">
          <p className="text-premiumRed text-xs font-bold tracking-[0.3em] uppercase mb-4">How it works</p>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-none mb-6">The Victor <span className="text-premiumRed">Experience</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">We've eliminated the friction from buying a car. Experience a streamlined, transparent, and enjoyable journey from first click to final key handover.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Center Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-premiumBlack bg-premiumRed items-center justify-center z-10 shadow-[0_0_20px_rgba(255,42,42,0.4)]">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                
                {/* Content Box */}
                <div className="w-full md:w-1/2 bg-[#111] border border-white/5 rounded-3xl p-8 hover:border-premiumRed/30 transition-colors">
                  <div className="md:hidden w-12 h-12 rounded-xl bg-premiumRed/10 border border-premiumRed/20 flex items-center justify-center mb-6">
                    <step.icon className="w-6 h-6 text-premiumRed" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
                
                <div className="hidden md:block w-full md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Experience;
