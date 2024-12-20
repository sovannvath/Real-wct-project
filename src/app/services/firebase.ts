// Import the functions you need from the SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  getFirestore,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton Firebase initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Utility for collection references
const getCollectionRef = (name: string) => collection(db, name);

// Function to add a comment
export const addComment = async (
  postId: string,
  commentData: { userId: string; username: string; comment: string }
) => {
  try {
    const commentsRef = collection(db, "allPosts", postId, "comments");
    await addDoc(commentsRef, {
      ...commentData,
      timestamp: serverTimestamp(),
    });
    console.log("Comment added successfully!");
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

// Function to fetch comments in real-time
export const fetchComments = (
  postId: string,
  callback: (comments: any[]) => void
) => {
  const commentsRef = collection(db, "allPosts", postId, "comments");

  const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(comments);
  });

  return unsubscribe; // Unsubscribe listener
};

// Export initialized services
export { app, db, auth, provider, getCollectionRef };
