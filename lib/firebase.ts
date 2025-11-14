// src/firebase/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCZnTRMUvCiDRCWouu-6JU3I7NpQjua1gc",
  authDomain: "highscore-edtech0202.firebaseapp.com",
  projectId: "highscore-edtech0202",
  storageBucket: "highscore-edtech0202.firebasestorage.app",
  messagingSenderId: "446334494363",
  appId: "1:446334494363:web:a53af0d3fdfb137db7c83e",
  measurementId: "G-FDW44PYRP4"
};

// ✅ Initialize Firebase app

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);