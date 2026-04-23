import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDr_qCvaMATH7sUf_YOwhBdrkt2MUfhvXc",
  authDomain: "job-board-b53ef.firebaseapp.com",
  projectId: "job-board-b53ef",
  storageBucket: "job-board-b53ef.firebasestorage.app",
  messagingSenderId: "586925510535",
  appId: "1:586925510535:web:14a3c0e40d8db7fbeb8d22",
  measurementId: "G-T35DCX8GJW"
};  

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);