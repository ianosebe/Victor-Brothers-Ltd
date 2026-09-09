import React, { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const initialVehicle = searchParams.get("vehicle") || "";

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: initialVehicle ? `I'm interested in the ${initialVehicle}.` : "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await addDoc(collection(db, "messages"), { ...formData, createdAt: serverTimestamp(), read: false });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const inputCls = "w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-premiumRed/60 focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-premiumBlack pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-premiumRed text-xs font-bold tracking-[0.3em] uppercase mb-4">Get in touch</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Contact <span className="text-premiumRed">Us</span></h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Showroom Details</h3>
              <div className="space-y-6">
                <div className="flex gap-4"><Phone className="w-6 h-6 text-premiumRed flex-shrink-0" /><div><p className="text-white font-bold mb-1">Phone</p><p className="text-gray-500 text-sm">+254 748 448411</p></div></div>
                <div className="flex gap-4"><Mail className="w-6 h-6 text-premiumRed flex-shrink-0" /><div><p className="text-white font-bold mb-1">Email</p><p className="text-gray-500 text-sm"> osorovictor375@gmail.com</p></div></div>
                <div className="flex gap-4"><Clock className="w-6 h-6 text-premiumRed flex-shrink-0" /><div><p className="text-white font-bold mb-1">Business Hours</p><p className="text-gray-500 text-sm">Mon - Sat: 8:00 AM - 6:00 PM<br/>Sunday: Closed</p></div></div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Send an Inquiry</h3>
              {status === "success" ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-400">Thank you. Our team will contact you shortly.</p>
                  <button onClick={() => setStatus("idle")} className="mt-8 text-premiumRed font-bold text-sm">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input required type="text" placeholder="Your Name" className={inputCls} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="email" placeholder="Email Address" className={inputCls} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <input required type="tel" placeholder="Phone Number" className={inputCls} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <textarea required placeholder="How can we help you?" rows="5" className={inputCls} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                  {status === "error" && <p className="text-red-500 text-xs">Error sending message. Try again.</p>}
                  <button disabled={status === "sending"} className="w-full flex items-center justify-center gap-2 bg-premiumRed hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 mt-2">
                    {status === "sending" ? "Sending..." : <><Send className="w-4 h-4"/> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
