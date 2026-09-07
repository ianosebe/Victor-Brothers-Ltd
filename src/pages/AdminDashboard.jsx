import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { cars as initialCars } from '../data/cars';

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: '', year: '', price: '', image: '', features: '', status: 'available'
  });

  const fetchData = async () => {
    try {
      const [carsSnapshot, msgsSnapshot] = await Promise.all([
        getDocs(collection(db, 'cars')),
        getDocs(collection(db, 'messages'))
      ]);
      
      setVehicles(carsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      
      // Sort messages by createdAt descending if it exists
      const msgs = msgsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      msgs.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      setMessages(msgs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const seedData = async () => {
    if (window.confirm("Are you sure you want to seed the initial data? This will add all static cars to the database.")) {
      setLoading(true);
      for (const car of initialCars) {
        await addDoc(collection(db, 'cars'), {
          ...car,
          status: 'available'
        });
      }
      await fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      await deleteDoc(doc(db, 'cars', id));
      await fetchData();
    }
  };

  const handleMarkSold = async (id, currentStatus) => {
    const newStatus = currentStatus === 'sold' ? 'available' : 'sold';
    await updateDoc(doc(db, 'cars', id), { status: newStatus });
    await fetchData();
  };

  const openModal = (vehicle = null) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setFormData({
        name: vehicle.name,
        year: vehicle.year,
        price: vehicle.price,
        image: vehicle.image,
        features: vehicle.features.join(', '),
        status: vehicle.status || 'available'
      });
    } else {
      setEditingVehicle(null);
      setFormData({ name: '', year: '', price: '', image: '', features: '', status: 'available' });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileRef = ref(storage, `vehicles/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const carData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
    };

    try {
      if (editingVehicle) {
        await updateDoc(doc(db, 'cars', editingVehicle.id), carData);
      } else {
        await addDoc(collection(db, 'cars'), carData);
      }
      setIsModalOpen(false);
      await fetchData();
    } catch (error) {
      console.error("Error saving vehicle:", error);
      alert("Error saving vehicle. Check console.");
    }
  };

  if (loading) return <div className="min-h-screen bg-premiumBlack text-white pt-24 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-premiumBlack pt-24 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">Admin <span className="text-premiumRed">Dashboard</span></h1>
          <div className="flex gap-4">
            <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded font-bold hover:bg-gray-700 border border-gray-700">
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mb-8 border-b border-gray-800 pb-2">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'inventory' ? 'border-premiumRed text-premiumRed' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            Inventory ({vehicles.length})
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`font-bold pb-2 border-b-2 transition-colors ${activeTab === 'messages' ? 'border-premiumRed text-premiumRed' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            Messages {messages.filter(m => !m.read).length > 0 && <span className="bg-premiumRed text-white text-xs px-2 py-0.5 rounded-full ml-2">{messages.filter(m => !m.read).length} new</span>}
          </button>
        </div>

        {activeTab === 'inventory' && (
          <div>
            <div className="flex justify-end gap-4 mb-4">
              {vehicles.length === 0 && (
                <button onClick={seedData} className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700">
                  Seed Initial Data
                </button>
              )}
              <button onClick={() => openModal()} className="bg-premiumRed text-white px-4 py-2 rounded font-bold hover:bg-red-700">
                Add Vehicle
              </button>
            </div>
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-black text-gray-400 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Year</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={v.image} alt={v.name} className="w-12 h-12 rounded object-cover bg-black" />
                      <span className="font-medium text-white">{v.name}</span>
                    </td>
                    <td className="px-6 py-4">{v.year}</td>
                    <td className="px-6 py-4 font-bold text-premiumRed">{v.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${v.status === 'sold' ? 'bg-red-900/50 text-red-400 border border-red-800' : 'bg-green-900/50 text-green-400 border border-green-800'}`}>
                        {v.status || 'available'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleMarkSold(v.id, v.status)} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-white">
                        {v.status === 'sold' ? 'Mark Available' : 'Mark Sold'}
                      </button>
                      <button onClick={() => openModal(v)} className="text-xs bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded text-white">Edit</button>
                      <button onClick={() => handleDelete(v.id)} className="text-xs bg-red-600 hover:bg-red-500 px-2 py-1 rounded text-white">Delete</button>
                    </td>
                  </tr>
                ))}
                {vehicles.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No vehicles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 p-6 text-white">
            <h2 className="text-xl font-bold mb-6">Customer Inquiries</h2>
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className="p-4 border rounded-xl border-gray-800 bg-black/50 hover:border-gray-600 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{msg.name}</h3>
                        <p className="text-sm text-premiumRed font-bold">{msg.phone}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : 'Just now'}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-3 whitespace-pre-wrap bg-gray-900/50 p-4 rounded-lg">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg border border-gray-800 relative">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs uppercase mb-1">Name</label>
                <input required type="text" className="w-full bg-black border border-gray-700 rounded p-2 text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs uppercase mb-1">Year</label>
                  <input required type="text" className="w-full bg-black border border-gray-700 rounded p-2 text-white" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs uppercase mb-1">Price (e.g. 4.2M)</label>
                  <input required type="text" className="w-full bg-black border border-gray-700 rounded p-2 text-white" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase mb-1">Vehicle Image</label>
                <div className="flex flex-col gap-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full bg-black border border-gray-700 rounded p-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-premiumRed file:text-white hover:file:bg-red-700"
                  />
                  {uploadingImage && <span className="text-sm text-premiumRed">Uploading image...</span>}
                  {formData.image && !uploadingImage && (
                    <img src={formData.image} alt="Preview" className="h-32 object-cover rounded mt-2 border border-gray-700" />
                  )}
                  {/* Keep hidden input to ensure required validation passes */}
                  <input type="hidden" required value={formData.image} />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase mb-1">Features (comma separated)</label>
                <input required type="text" className="w-full bg-black border border-gray-700 rounded p-2 text-white" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded text-gray-400 hover:text-white">Cancel</button>
                <button disabled={uploadingImage} type="submit" className="bg-premiumRed hover:bg-red-700 px-4 py-2 rounded font-bold text-white disabled:opacity-50">
                  {uploadingImage ? 'Uploading...' : 'Save Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
