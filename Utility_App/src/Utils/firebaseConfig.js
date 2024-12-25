// Import the functions you need from the SDKs you need
import {getApp , getApps , initializeApp} from 'firebase/app'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC47hMAUs6qXBHRIyXk4p7VMWjZVqXjWHw",
  authDomain: "utility-project-56465.firebaseapp.com",
  projectId: "utility-project-56465",
  storageBucket: "utility-project-56465.firebasestorage.app",
  messagingSenderId: "909648294067",
  appId: "1:909648294067:web:4a3dd03ee92cbf829900c6",
  measurementId: "G-G2T0JS4GMC"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : new initializeApp(firebaseConfig) ;
export const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc };