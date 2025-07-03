// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-a4c12.firebaseapp.com",
  projectId: "real-estate-a4c12",
  storageBucket: "real-estate-a4c12.firebasestorage.app",
  messagingSenderId: "245307295663",
  appId: "1:245307295663:web:f7d0f9f032f249ad8e115a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);