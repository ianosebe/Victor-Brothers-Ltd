import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD-NjeS_NoFzxYGxRIuqAqR4kkuphJOwmM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "victor-brothers-ltd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "victor-brothers-ltd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "victor-brothers-ltd.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "975695716309",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:975695716309:web:23357bc25815c8f75ba75c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-9NY1K0RZ16"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
