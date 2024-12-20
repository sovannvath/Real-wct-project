import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "/app/services/firebase"// Import `db` from `firebase.ts`

/**
 * Store a user in Firestore
 * @param user - The user object containing details like email, name, etc.
 */
export const storeUserInFirestore = async (user: any): Promise<void> => {
  try {
    const userRef = doc(db, "user", user.uid);
    const userData = {
      email: user.email,
      name: user.displayName || "No Name",
      photoURL: user.photoURL || "",
      role: user.role || "user",
      createdAt: serverTimestamp(),
    };
    await setDoc(userRef, userData, { merge: true });
    console.log("User stored successfully:", userData);
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

/**
 * Disable a user in Firestore
 * @param uid - The user's unique ID
 */
export const disableUserInFirestore = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, "user", uid);
    await updateDoc(userRef, {
      disabled: true,
    });
    console.log(`User with UID: ${uid} has been disabled.`);
  } catch (error) {
    console.error("Error disabling user:", error);
  }
};

/**
 * Enable a user in Firestore
 * @param uid - The user's unique ID
 */
export const enableUserInFirestore = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, "user", uid);
    await updateDoc(userRef, {
      disabled: false,
    });
    console.log(`User with UID: ${uid} has been enabled.`);
  } catch (error) {
    console.error("Error enabling user:", error);
  }
};

/**
 * Remove a user from Firestore
 * @param uid - The user's unique ID
 */
export const removeUserFromFirestore = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, "user", uid);
    await deleteDoc(userRef);
    console.log(`User with UID: ${uid} has been removed.`);
  } catch (error) {
    console.error("Error removing user:", error);
  }
};

/**
 * Add a comment to a post
 * @param postId - The post's unique ID
 * @param commentData - An object containing comment details like userId, username, and comment text
 */
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
    console.log("Comment added successfully:", commentData);
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

/**
 * Fetch comments in real-time
 * @param postId - The post's unique ID
 * @param callback - A function to handle real-time updates to comments
 */
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

  return unsubscribe; // Call this function to stop listening when needed
};
