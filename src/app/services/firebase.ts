// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdWtow8kL0fN_ZxxoneNwpDxM486VmPbc",
  authDomain: "wct-project-99386.firebaseapp.com",
  projectId: "wct-project-99386",
  storageBucket: "wct-project-99386.firebasestorage.app",
  messagingSenderId: "516939567168",
  appId: "1:516939567168:web:32422824671e84d9f80fa5",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app); // Firestore database
const auth = getAuth(app); // Firebase Authentication

// Example Firestore collection reference
const colRef = collection(db, "books");

export { app, db, auth, colRef };
