import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIn6F4zAj0zPLiqeaX-oyw8BN7vcPs1gk",
  authDomain: "forever-6d5f3.firebaseapp.com",
  projectId: "forever-6d5f3",
  storageBucket: "forever-6d5f3.firebasestorage.app",
  messagingSenderId: "59020871625",
  appId: "1:59020871625:web:3b836ecba5a90dbf3d4a18"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export {
  collection,
  addDoc,
  serverTimestamp
};
