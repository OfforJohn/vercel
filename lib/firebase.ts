// src/firebase/firebase.ts

import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendPasswordResetEmail,
  Auth,
} from "firebase/auth";
import {
  getFirestore,
  Firestore,
} from "firebase/firestore";


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
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase services with correct types
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

// ✅ Utility: Reset password function
export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
