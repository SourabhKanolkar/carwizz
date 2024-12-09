// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuTLhfe5Zc93ni1RJ4E_1aQZZeQh5q2h8",
  authDomain: "carwizz-7bc99.firebaseapp.com",
  projectId: "carwizz-7bc99",
  storageBucket: "carwizz-7bc99.firebasestorage.app",
  messagingSenderId: "510656887444",
  appId: "1:510656887444:web:bb1131db48f0a6a0249281"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);