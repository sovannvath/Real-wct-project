// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore , collection,  getDocs

 } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5DdCCiAtychpzSkht7dW_oe5RtSWyAKc",
  authDomain: "fullstack-togethertech.firebaseapp.com",
  projectId: "fullstack-togethertech",
  storageBucket: "fullstack-togethertech.firebasestorage.app",
  messagingSenderId: "1094089727891",
  appId: "1:1094089727891:web:92776a964aa52f9eb65266",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// init services 
export const db = getFirestore(app);

//collection ref
const colRef = collection(db , "books")

//get collection data 
getDocs (colRef)
.then((snapshot) => {
  console.log(snapshot.docs)
})
