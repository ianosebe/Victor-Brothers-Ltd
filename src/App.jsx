import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="min-h-screen bg-premiumBlack">
      <Navbar />
      <Hero />
      
      {/* Placeholder for other sections */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Engineered for Perfection</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Scroll down to discover our lineup of exclusive supercars.
        </p>
      </section>
    </div>
  );
}

export default App;
