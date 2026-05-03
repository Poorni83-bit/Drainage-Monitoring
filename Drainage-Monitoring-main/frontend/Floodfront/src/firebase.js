import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// 🔥 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl66Yr4EKcMaM9tdHes5zptJaDa0UMbUc",
  authDomain: "floodguard-f8238.firebaseapp.com",
  databaseURL: "https://floodguard-f8238-default-rtdb.firebaseio.com",
  projectId: "floodguard-f8238",
  storageBucket: "floodguard-f8238.firebasestorage.app",
  messagingSenderId: "340015426149",
  appId: "1:340015426149:web:f9890cec9a6b83578e348c",
  measurementId: "G-FMJ7VY2PED"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Database as 'db'
export const db = getDatabase(app);
