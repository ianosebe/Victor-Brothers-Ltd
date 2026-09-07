import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Award, Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Experience = () => {
  return (
    <div className="bg-premiumBlack min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-wider">
            The Victor <span className="text-premiumRed">Experience</span>
          </h1>
          <div className="w-24 h-1 bg-premiumRed mx-auto rounded-full mb-8"></div>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We don't just sell cars; we deliver peace of mind, premium quality, and a relationship that lasts long after you drive off our lot. Discover what sets us apart.
          </p>
        </motion.div>
      </div>

      {/* Core Values / Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck className="w-10 h-10 text-premiumRed" />,
              title: "Verified Authenticity",
              desc: "Every vehicle undergoes a rigorous 150-point inspection. We provide complete history checks, clear ownership trails, and guarantee the mileage."
            },
            {
              icon: <Zap className="w-10 h-10 text-premiumRed" />,
              title: "Fast-Track Financing",
              desc: "We have partnered with top financial institutions to ensure you get the best rates. Our streamlined process gets you approved and driving in record time."
            },
            {
              icon: <Award className="w-10 h-10 text-premiumRed" />,
              title: "Premium Post-Sale Support",
              desc: "Our relationship doesn't end at the sale. Enjoy dedicated after-sales care, maintenance advice, and priority booking for future services."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl hover:border-premiumRed/50 transition-colors group"
            >
              <div className="bg-black w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The Process */}
      <div className="bg-gray-900 py-24 border-y border-gray-800 mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-premiumRed/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-premiumRed/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-wider">Our Seamless <span className="text-premiumRed">Process</span></h2>
            <p className="text-gray-400">How we get you behind the wheel of your dream car.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line for desktop */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-800 -z-10"></div>
            
            {[
              { step: "01", title: "Browse & Select", desc: "Explore our premium inventory online or visit our showroom." },
              { step: "02", title: "Test Drive", desc: "Experience the thrill and comfort firsthand before making a decision." },
              { step: "03", title: "Finance & Paperwork", desc: "We handle the heavy lifting, making the paperwork breeze by." },
              { step: "04", title: "Drive Away", desc: "Receive your keys and enjoy your new premium vehicle." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto bg-black border-4 border-gray-800 text-premiumRed font-black text-3xl flex items-center justify-center rounded-full mb-6 relative shadow-xl">
                  {item.step}
                  {idx < 3 && <div className="md:hidden absolute -bottom-8 left-1/2 w-0.5 h-8 bg-gray-800"></div>}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm px-4">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials / Trust */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black border border-gray-800 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-wider">
              Trusted by <span className="text-premiumRed">Hundreds</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Our commitment to excellence has earned us the trust of hundreds of satisfied clients across the region. We are proud to be the premier destination for high-quality vehicles.
            </p>
            <div className="flex gap-4">
              <Link to="/models" className="px-8 py-4 bg-premiumRed text-white font-bold uppercase tracking-wider rounded-full hover:bg-red-700 transition-colors shadow-lg">
                View Inventory
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:w-1/2 w-full grid grid-cols-2 gap-4"
          >
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-black text-white mb-1">4.9/5</div>
              <div className="text-sm text-gray-400">Customer Rating</div>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center">
              <ThumbsUp className="w-8 h-8 text-premiumRed mx-auto mb-3" />
              <div className="text-3xl font-black text-white mb-1">100%</div>
              <div className="text-sm text-gray-400">Satisfaction Guarantee</div>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 text-center col-span-2">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-black text-white mb-1">Thoroughly Inspected</div>
              <div className="text-sm text-gray-400">Every vehicle meets our strict quality standards</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
