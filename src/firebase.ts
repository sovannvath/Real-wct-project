// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { SUPPORTED_NATIVE_MODULES } from "next/dist/build/webpack/plugins/middleware-plugin";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "web-togethertech.firebaseapp.com",
  projectId: "web-togethertech",
  storageBucket: "web-togethertech.appspot.com",
  messagingSenderId: "218442606303",
  appId: "1:218442606303:web:fd555af3e08f1eb5df6b6a"
};
const app = initializeApp(firebaseConfig)
export const auth = getAuth() ; 

