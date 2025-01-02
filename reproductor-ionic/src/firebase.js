// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCrRuEPDDMux1Uv8LMOPzP5kwDGkm2iNv0",
  authDomain: "reproductor-a8ee8.firebaseapp.com",
  projectId: "reproductor-a8ee8",
  storageBucket: "reproductor-a8ee8.appspot.com",
  messagingSenderId: "252093973675",
  appId: "1:252093973675:web:53fb374030e042821fa3ee",
  measurementId: "G-PDH44FM4F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// Inicializar Firestore
const db = getFirestore(app);
const auth=getAuth(app);
export { db,storage,auth }