

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,  
   signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Timestamp,setDoc , getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDhO38c1rgHPNNLF3gD9xmN2fZOTpxNrcE",
  authDomain: "smit-mini-hackathon-11685.firebaseapp.com",
  projectId: "smit-mini-hackathon-11685",
  storageBucket: "smit-mini-hackathon-11685.firebasestorage.app",
  messagingSenderId: "165559002353",
  appId: "1:165559002353:web:2a6762596a5a8e97e7b550",
  measurementId: "G-05PRX0E2HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app)
// const database = getDatabase();



export {
  auth, db,
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc
  ,Timestamp ,signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  getDoc
};


// createUserWithEmailAndPassword,
// signInWithEmailAndPassword,
// onAuthStateChanged,
// signOut,
// sendPasswordResetEmail,
// sendEmailVerification,
// updateProfile,
// provider,
// signInWithPopup,
// db,
// collection,
// addDoc,
// getDocs,
// doc,
// setDoc,
// Timestamp,
// deleteDoc,
// deleteField,
// GoogleAuthProvider,
// onSnapshot ,
// getDoc,
// query,
// where,
// getDatabase, ref, set
// ,child , get , update , remove,onValue  } 