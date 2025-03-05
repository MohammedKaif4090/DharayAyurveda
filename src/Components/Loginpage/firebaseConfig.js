// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Replace the following with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrCt5DZgPXSPQGdMbWc3n0NRnwo8zhgFg",
    authDomain: "dharayayurveda-dc244.firebaseapp.com",
    projectId: "dharayayurveda-dc244",
    storageBucket: "dharayayurveda-dc244.firebasestorage.app",
    messagingSenderId: "815451177394",
    appId: "1:815451177394:web:01aa6c45211e43a70324ab",
    measurementId: "G-4GF9C9XDJD"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
