import React from 'react';
import { motion } from 'framer-motion';

const Models = () => {
  // Data for models
  const models = [
    { 
      id: 1, 
      name: 'Toyota Sienta', 
      year: '2019',
      features: ['Fully loaded', '2WD', '1500cc'],
      price: '1.65M',
      image: '/toyota-sienta.png'
    },
    {
      id: 2,
      name: 'Toyota Rav4',
      year: '2007',
      features: ['4WD', '2400cc', 'Automatic', 'Accident Free'],
      price: '1.45M',
      image: '/toyota-rav4.png'
    },
    {
      id: 3,
      name: 'Toyota Harrier',
      year: '2014',
      features: ['2000cc', 'Petrol', 'Sunroof', 'Quick Sale'],
      price: '2.35M',
      image: '/toyota-harrier.png'
    },
    {
      id: 4,
      name: 'Land Cruiser Mabati',
      year: '2017',
      features: ['Zero accident', 'Extremely clean', 'New Registration'],
      price: '4.6M',
      image: '/land-cruiser-mabati.png'
    },
    {
      id: 5,
      name: 'Land Rover Discovery 4',
      year: '2013',
      features: ['Diesel', 'Automatic', 'Leather', 'Rotor gear'],
      price: '3.5M',
      image: '/discovery-4.png'
    },
    {
      id: 6,
      name: 'Nissan Hardbody',
      year: '2015',
      features: ['Locally Assembled', '4WD optional', 'Very Clean'],
      price: '1.55M',
      image: '/nissan-hardbody.png'
    },
    {
      id: 7,
      name: 'Land Cruiser Prado J150',
      year: '2014',
      features: ['7 Seater', '2700cc', 'Petrol', 'Fully Loaded'],
      price: '3.3M',
      image: '/prado-j150.png'
    },
    {
      id: 8,
      name: 'Subaru Outback BP9',
      year: '2007',
      features: ['2500cc', 'Petrol', '120k kms', '1 Owner'],
      price: '980K',
      image: '/subaru-outback.png'
    },
    {
      id: 9,
      name: 'Honda CR-V',
      year: '2007',
      features: ['2400cc', 'Petrol', 'Automatic', 'Accident free'],
      price: '1.34M',
      image: '/honda-crv.png'
    },
    {
      id: 10,
      name: 'Toyota Fielder',
      year: '2007',
      features: ['1800cc', 'Nairobi'],
      price: '880K',
      image: '/toyota-fielder.png'
    },
    {
      id: 11,
      name: 'Nissan X-Trail',
      year: '2011',
      features: ['2.0L', 'Original Paint', 'Leather', '4x4'],
      price: '1.28M',
      image: '/nissan-xtrail.png'
    },
    {
      id: 12,
      name: 'Toyota Landcruiser ZX',
      year: '2018',
      features: ['Unregistered', 'V8 Engine', 'Premium', '4WD'],
      price: '10.5M',
      image: '/land-cruiser-zx.png'
    },
    {
      id: 13,
      name: 'Ford Ranger Pickup',
      year: '2018',
      features: ['Manual-Diesel', '2200cc', 'Closed Cabin', '129k kms'],
      price: '2.05M',
      image: '/ford-ranger.png'
    },
    {
      id: 14,
      name: 'Mercedes Benz W205',
      year: '2014',
      features: ['AMG Line', '1990cc', 'Leather', 'Sensors'],
      price: '2.54M',
      image: '/mercedes-c200.png'
    },
    {
      id: 15,
      name: 'Toyota Rav 4 Adventure',
      year: '2019',
      features: ['2000cc Petrol', 'Panoramic Sunroof', '57,000kms', 'Unregistered'],
      price: '4.57M',
      image: '/toyota-rav4-adventure.png'
    },
    {
      id: 16,
      name: 'Volkswagen Tiguan',
      year: '2012',
      features: ['2.0L TSI', 'Automatic', 'New Suspension', 'Fully Serviced'],
      price: '1.45M',
      image: '/vw-tiguan.png'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-premiumBlack px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            OUR <span className="text-premiumRed">MODELS</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover the perfect blend of performance, luxury, and innovation.
          </p>
        </motion.div>

        {/* Using a grid with 4 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {models.map((model, index) => (
            <div
              key={model.id}
              className="relative w-full h-72 sm:h-80 md:h-64 lg:h-72 rounded-xl overflow-hidden shadow-lg group bg-gray-900"
            >
              {/* Full Background Image */}
              {model.image ? (
                <img 
                  src={model.image} 
                  alt={model.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  <span>Image Coming Soon</span>
                </div>
              )}
              
              {/* Gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
              
              {/* Description Box Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="bg-white rounded-lg p-3 shadow-2xl transform translate-y-1 group-hover:-translate-y-1 transition-transform duration-300">
                  
                  <div className="flex justify-between items-center mb-1.5">
                    <h3 className="text-sm font-extrabold text-gray-900 truncate pr-2">{model.name}</h3>
                    <span className="bg-premiumRed text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                      {model.year}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {model.features.map((feature, i) => (
                      <span key={i} className="text-[9px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <div className="text-sm font-black text-gray-900">Ksh {model.price}</div>
                    <button className="bg-black text-[10px] font-bold text-premiumRed hover:bg-gray-800 uppercase tracking-wider flex items-center px-2.5 py-1.5 rounded-md transition-colors">
                      Details
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
          
          {/* Empty slot placeholder for future cars to maintain grid */}
          <div
            className="bg-white/5 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center w-full h-72 sm:h-80 md:h-64 lg:h-72 text-center p-4"
          >
            <p className="text-gray-400 font-medium text-sm">More models coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;
