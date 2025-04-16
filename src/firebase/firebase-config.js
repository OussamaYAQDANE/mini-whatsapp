// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7Jp-JfF5MsbFrP-vvxYzRDyCmbtE-qjQ",
  authDomain: "real-time-chat-7ab21.firebaseapp.com",
  projectId: "real-time-chat-7ab21",
  storageBucket: "real-time-chat-7ab21.firebasestorage.app",
  messagingSenderId: "259475982892",
  appId: "1:259475982892:web:83118b1b4cefbc13a0df89",
  measurementId: "G-Y8082M6GLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, storage, db };
