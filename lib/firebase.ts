// src/firebase/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZnTRMUvCiDRCWouu-6JU3I7NpQjua1gc",
  authDomain: "highscore-edtech0202.firebaseapp.com",
  projectId: "highscore-edtech0202",
  storageBucket: "highscore-edtech0202.appspot.com",  // ← FIXED
  messagingSenderId: "446334494363",
  appId: "1:446334494363:web:a53af0d3fdfb137db7c83e",
  measurementId: "G-FDW44PYRP4"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
