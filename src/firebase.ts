// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "web-togethertechs.firebaseapp.com",
  projectId: "web-togethertechs",
  storageBucket: "web-togethertechs.firebasestorage.app",
  messagingSenderId: "198242967511",
  appId: "1:198242967511:web:ebfeeeef10f29e639e7592"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth() ; 

