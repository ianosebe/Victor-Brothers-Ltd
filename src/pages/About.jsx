import React from "react";
import { motion } from "framer-motion";
import { Shield, Award, Users, Target } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const About = () => {
  return (
    <div className="min-h-screen bg-premiumBlack pt-24 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden mb-20 py-20 border-b border-white/5">
        <div className="absolute inset-0 bg-premiumRed/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeUp}>
            <p className="text-premiumRed text-xs font-bold tracking-[0.3em] uppercase mb-4">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Driven by <span className="text-premiumRed">Excellence.</span></h1>
            <p className="text-gray-400 text-lg leading-relaxed">Victor & Brothers Ltd was founded with a single mission: to redefine the pre-owned automotive market in Kenya by delivering uncompromised quality, transparency, and premium service.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "5+", l: "Years Active" }, { v: "50+", l: "Vehicles Sold" },
            { v: "100%", l: "Verified History" }, { v: "24/7", l: "Client Support" }
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-[#111] border border-white/5 rounded-3xl p-8 text-center">
              <h3 className="text-4xl font-black text-premiumRed mb-2">{s.v}</h3>
              <p className="text-gray-500 text-xs uppercase tracking-widest">{s.l}</p>
            </motion.div>
          ))}
        </div>

        {/* Pillars */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { i: Shield, t: "Unmatched Integrity", d: "Every vehicle is thoroughly inspected, and its history is fully disclosed. No hidden flaws." },
              { i: Award, t: "Premium Quality", d: "We source only the best. If it doesn't meet our rigorous standards, it doesn't make it to our showroom." },
              { i: Users, t: "Customer First", d: "Your satisfaction is our benchmark. We guide you through the process tailored to your needs." },
              { i: Target, t: "Long-Term Relationships", d: "We don't just sell cars; we aim to be your lifelong automotive partner." }
            ].map((p, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-3xl p-8 flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-premiumRed/10 border border-premiumRed/20 flex items-center justify-center flex-shrink-0"><p.i className="w-6 h-6 text-premiumRed" /></div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">{p.t}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
