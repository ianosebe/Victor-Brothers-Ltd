import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:border-premiumRed/60 focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-premiumBlack flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-premiumRed/0 via-premiumRed to-premiumRed/0" />
        
        <div className="text-center mb-8">
          <img src="/vb-logo.png" alt="Logo" className="h-12 mx-auto mb-6" style={{ mixBlendMode: "lighten" }} />
          <h1 className="text-2xl font-black text-white">Admin Portal</h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input required type="email" placeholder="Admin Email" className={inputCls} value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input required type="password" placeholder="Password" className={inputCls} value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button disabled={loading} type="submit" className="w-full bg-premiumRed hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-premiumRed/20 mt-4 disabled:opacity-50">
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
