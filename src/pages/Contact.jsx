import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
        read: false
      });
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error("Error submitting message:", error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-premiumBlack px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-wider">
            Contact <span className="text-premiumRed">Us</span>
          </h1>
          <div className="w-20 h-1 bg-premiumRed mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We are here to assist you with any inquiries. Reach out to us via email, phone, or WhatsApp, and we'll get back to you promptly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Phone & WhatsApp */}
            <a 
              href="https://wa.me/254748448411" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl hover:border-premiumRed transition-colors group"
            >
              <div className="flex-shrink-0 bg-black p-4 rounded-xl group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-premiumRed" />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold text-white mb-1">WhatsApp</h3>
                <p className="text-gray-400">0748 448 411</p>
                <p className="text-sm text-premiumRed mt-2 font-medium uppercase tracking-wider">Click to chat</p>
              </div>
            </a>

            {/* Email */}
            <a 
              href="mailto:osorovictor375@gmail.com" 
              className="flex items-start p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl hover:border-premiumRed transition-colors group"
            >
              <div className="flex-shrink-0 bg-black p-4 rounded-xl group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-premiumRed" />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold text-white mb-1">Email Us</h3>
                <p className="text-gray-400">osorovictor375@gmail.com</p>
                <p className="text-sm text-premiumRed mt-2 font-medium uppercase tracking-wider">Send a message</p>
              </div>
            </a>
            
            {/* Direct Call */}
            <a 
              href="tel:0748448411" 
              className="flex items-start p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl hover:border-premiumRed transition-colors group"
            >
              <div className="flex-shrink-0 bg-black p-4 rounded-xl group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-premiumRed" />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold text-white mb-1">Direct Call</h3>
                <p className="text-gray-400">0748 448 411</p>
                <p className="text-sm text-premiumRed mt-2 font-medium uppercase tracking-wider">Call Sales</p>
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Send an <span className="text-premiumRed">Inquiry</span></h3>
            
            {status === 'success' ? (
              <div className="bg-green-900/30 border border-green-800 text-green-400 p-6 rounded-xl text-center">
                <h4 className="text-lg font-bold mb-2">Message Sent!</h4>
                <p className="text-sm">Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-white underline">Send another message</button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {status === 'error' && (
                  <div className="bg-red-900/30 border border-red-800 text-red-400 p-3 rounded-lg text-sm text-center">
                    Failed to send message. Please try again or call us.
                  </div>
                )}
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Your Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="John Doe" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-premiumRed focus:ring-1 focus:ring-premiumRed outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Phone Number</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" placeholder="07XX XXX XXX" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-premiumRed focus:ring-1 focus:ring-premiumRed outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">Message</label>
                  <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows="4" placeholder="I'm interested in..." className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-premiumRed focus:ring-1 focus:ring-premiumRed outline-none transition-all"></textarea>
                </div>
                <button disabled={status === 'submitting'} type="submit" className="w-full bg-premiumRed text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors uppercase tracking-widest mt-4 disabled:opacity-50">
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
