import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { cars as initialCars } from "../data/cars";
import {
  LayoutGrid, MessageSquare, LogOut, Plus, Pencil, Trash2,
  CheckCircle2, RotateCcw, Car, Users, TrendingUp, Database,
  Upload, X, AlertTriangle, Mail, Phone as PhoneIcon, Clock,
} from "lucide-react";

/* ─── Small reusable stat card ─── */
const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="bg-[#111111] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-2xl font-black text-white leading-none">{value}</p>
      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

/* ─── Input field ─── */
const Field = ({ label, children }) => (
  <div>
    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full bg-[#0a0a0a] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-premiumRed/60 transition-colors";

/* ══════════════════════════════════════════════════════════════ */
const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState("inventory");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: "", year: "", price: "", image: "", features: "", status: "available",
  });

  const fetchData = async () => {
    try {
      const [carsSnapshot, msgsSnapshot] = await Promise.all([
        getDocs(collection(db, "cars")),
        getDocs(collection(db, "messages")),
      ]);
      setVehicles(carsSnapshot.docs.map(d => ({ ...d.data(), id: d.id })));
      const msgs = msgsSnapshot.docs.map(d => ({ ...d.data(), id: d.id }));
      msgs.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setMessages(msgs);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLogout = async () => { await signOut(auth); navigate("/admin"); };

  const seedData = async () => {
    if (!window.confirm("Seed initial car data into the database?")) return;
    setLoading(true);
    for (const car of initialCars) await addDoc(collection(db, "cars"), { ...car, status: "available" });
    await fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle permanently?")) return;
    await deleteDoc(doc(db, "cars", id));
    await fetchData();
  };

  const handleMarkSold = async (id, currentStatus) => {
    const newStatus = currentStatus === "sold" ? "available" : "sold";
    await updateDoc(doc(db, "cars", id), { status: newStatus });
    await fetchData();
  };

  const openModal = (vehicle = null) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setFormData({
        name: vehicle.name, year: vehicle.year, price: vehicle.price,
        image: vehicle.image, features: vehicle.features.join(", "), status: vehicle.status || "available",
      });
    } else {
      setEditingVehicle(null);
      setFormData({ name: "", year: "", price: "", image: "", features: "", status: "available" });
    }
    setIsModalOpen(true);
  };

  /* ── Browser-side image compression via Canvas API ── */
  const compressImage = (file, { maxDimension = 1200, quality = 0.82 } = {}) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);

        // Calculate new dimensions keeping aspect ratio
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height / width) * maxDimension);
            width = maxDimension;
          } else {
            width = Math.round((width / height) * maxDimension);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width  = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Canvas toBlob failed"));
            console.log(
              `[Image Compression] ${file.name}: ` +
              `${(file.size / 1024).toFixed(1)} KB → ` +
              `${(blob.size / 1024).toFixed(1)} KB ` +
              `(${Math.round((1 - blob.size / file.size) * 100)}% reduction)`
            );
            resolve(blob);
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("Image load failed")); };
      img.src = objectUrl;
    });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      // Compress before upload
      const compressed = await compressImage(file);
      const fileName = file.name.replace(/\.[^.]+$/, "") + "_compressed.jpg";
      const fileRef = ref(storage, `vehicles/${Date.now()}_${fileName}`);
      await uploadBytes(fileRef, compressed, { contentType: "image/jpeg" });
      const url = await getDownloadURL(fileRef);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (err) {
      console.error("Upload error:", err);
      const msg = err?.code ? `${err.code}: ${err.message}` : err.message;
      alert(`Upload failed — ${msg}\n\nCheck the browser console for details.`);
    } finally {
      setUploadingImage(false);
    }

  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const carData = { ...formData, features: formData.features.split(",").map(f => f.trim()).filter(Boolean) };
    try {
      if (editingVehicle) {
        await updateDoc(doc(db, "cars", editingVehicle.id), carData);
      } else {
        await addDoc(collection(db, "cars"), carData);
      }
      setIsModalOpen(false);
      await fetchData();
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving vehicle. Check console.");
    }
  };

  const soldCount   = vehicles.filter(v => v.status === "sold").length;
  const availCount  = vehicles.filter(v => v.status !== "sold").length;
  const unreadCount = messages.filter(m => !m.read).length;

  /* ── Loading screen ── */
  if (loading) return (
    <div className="min-h-screen bg-premiumBlack flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-premiumRed border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm uppercase tracking-widest">Loading dashboard…</p>
      </div>
    </div>
  );

  /* ══════ RENDER ══════ */
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0d0d0d] border-r border-white/5 fixed h-full z-10">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/5">
          <img src="/vb-logo.png" alt="Victor & Brothers" className="h-12 w-auto object-contain" style={{ mixBlendMode: "lighten" }} />
          <p className="text-[10px] text-gray-600 mt-1.5 uppercase tracking-widest">Admin Portal</p>
        </div>

        {/* Nav tabs */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "inventory", label: "Inventory", icon: LayoutGrid, badge: vehicles.length },
            { id: "messages",  label: "Messages",  icon: MessageSquare, badge: unreadCount > 0 ? unreadCount : null },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-premiumRed/10 text-premiumRed border border-premiumRed/20"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {item.badge != null && (
                <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${
                  activeTab === item.id ? "bg-premiumRed text-white" : "bg-white/8 text-gray-400"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>


      {/* ── Main content ── */}
      <div className="flex-1 md:ml-64 min-h-screen">
        <main className="px-6 md:px-10 py-10">

          {/* ── Inventory header row ── */}
          {activeTab === "inventory" && (
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-white font-black text-2xl leading-none">Inventory</h1>
                <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{vehicles.length} vehicles in database</p>
              </div>
              <div className="flex items-center gap-3">
                {vehicles.length === 0 && (
                  <button
                    onClick={seedData}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    <Database className="w-3.5 h-3.5" /> Seed Data
                  </button>
                )}
                <button
                  onClick={() => openModal()}
                  className="relative flex items-center gap-2 px-6 py-3 bg-premiumRed hover:bg-red-600 text-white text-sm font-black rounded-xl transition-all duration-300 shadow-xl shadow-premiumRed/40 hover:shadow-premiumRed/60 hover:scale-105 active:scale-95"
                >
                  <span className="absolute inset-0 rounded-xl animate-ping bg-premiumRed opacity-20 pointer-events-none" />
                  <Plus className="w-5 h-5" />
                  Add Vehicle
                </button>
              </div>
            </div>
          )}

          {/* ── Messages header row ── */}
          {activeTab === "messages" && (
            <div className="mb-8">
              <h1 className="text-white font-black text-2xl leading-none">Customer Messages</h1>
              <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{messages.length} total inquiries</p>
            </div>
          )}

          {/* ── Stat cards (inventory tab) ── */}
          {activeTab === "inventory" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={Car}         label="Total Vehicles" value={vehicles.length} accent="bg-premiumRed/80" />
              <StatCard icon={CheckCircle2} label="Available"     value={availCount}      accent="bg-emerald-600/80" />
              <StatCard icon={TrendingUp}   label="Sold"          value={soldCount}       accent="bg-amber-600/80" />
              <StatCard icon={Users}        label="Inquiries"     value={messages.length} accent="bg-blue-600/80" />
            </div>
          )}

          {/* ── Inventory Table ── */}
          {activeTab === "inventory" && (
            <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Vehicle</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Year</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Price</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/4">
                    {vehicles.map((v) => (
                      <tr key={v.id} className="hover:bg-white/2 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-10 rounded-lg overflow-hidden bg-black border border-white/5 flex-shrink-0">
                              <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-semibold text-white">{v.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">{v.year}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-black text-premiumRed">Ksh {v.price}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border ${
                            v.status === "sold"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${v.status === "sold" ? "bg-red-400" : "bg-emerald-400"}`} />
                            {v.status || "available"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleMarkSold(v.id, v.status)}
                              title={v.status === "sold" ? "Mark Available" : "Mark Sold"}
                              className="p-2 rounded-lg text-gray-500 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-200"
                            >
                              {v.status === "sold" ? <RotateCcw className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => openModal(v)}
                              className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-200"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(v.id)}
                              className="p-2 rounded-lg text-gray-500 hover:text-premiumRed hover:bg-premiumRed/10 transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {vehicles.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-16 text-center">
                          <Car className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                          <p className="text-gray-500 text-sm">No vehicles in inventory.</p>
                          <p className="text-gray-600 text-xs mt-1">Click "Add Vehicle" or seed initial data.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Messages ── */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="bg-[#111111] border border-white/5 rounded-2xl py-20 text-center">
                  <MessageSquare className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No customer messages yet.</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg.id}
                    className="bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-full bg-premiumRed/10 border border-premiumRed/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-premiumRed font-black text-sm">{msg.name?.[0]?.toUpperCase() || "?"}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base leading-none">{msg.name}</h3>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="flex items-center gap-1 text-premiumRed text-xs font-bold">
                              <PhoneIcon className="w-3 h-3" /> {msg.phone}
                            </span>
                            {msg.email && (
                              <span className="flex items-center gap-1 text-gray-500 text-xs">
                                <Mail className="w-3 h-3" /> {msg.email}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-xs flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : "Just now"}
                      </div>
                    </div>
                    {/* Divider */}
                    <div className="h-px bg-white/5 mb-4" />
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap bg-black/30 rounded-xl px-4 py-3 border border-white/4">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

        </main>
      </div>

      {/* ══ Modal ══ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl relative">
            {/* Modal header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-white/5">
              <h2 className="text-white font-black text-lg">
                {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleFormSubmit} className="px-7 py-6 space-y-5">
              <Field label="Vehicle Name">
                <input
                  required type="text" className={inputCls}
                  placeholder="e.g. Toyota Land Cruiser"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Year">
                  <input
                    required type="text" className={inputCls}
                    placeholder="e.g. 2019"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                  />
                </Field>
                <Field label="Price">
                  <input
                    required type="text" className={inputCls}
                    placeholder="e.g. 4.2M"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                  />
                </Field>
              </div>

              <Field label="Vehicle Image">
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-premiumRed/40 hover:bg-premiumRed/5 transition-all duration-300 relative overflow-hidden">
                  {formData.image && !uploadingImage ? (
                    <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  ) : null}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    {uploadingImage ? (
                      <>
                        <div className="w-6 h-6 border-2 border-premiumRed border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-premiumRed font-semibold">Uploading…</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-gray-500" />
                        <span className="text-xs text-gray-500">{formData.image ? "Click to replace" : "Click to upload image"}</span>
                      </>
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <input type="hidden" required value={formData.image} />
              </Field>

              <Field label="Features (comma-separated)">
                <input
                  required type="text" className={inputCls}
                  placeholder="e.g. 4WD, Sunroof, Leather"
                  value={formData.features}
                  onChange={e => setFormData({ ...formData, features: e.target.value })}
                />
              </Field>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm text-gray-500 hover:text-white font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="flex items-center gap-2 px-6 py-2.5 bg-premiumRed hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-premiumRed/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? "Uploading…" : editingVehicle ? "Save Changes" : "Add Vehicle"}
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
