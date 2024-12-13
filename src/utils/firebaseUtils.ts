import { getFirestore, doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore();

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
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

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

export const removeUserFromFirestore = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, "user", uid);
    await deleteDoc(userRef);
    console.log(`User with UID: ${uid} has been removed.`);
  } catch (error) {
    console.error("Error removing user:", error);
  }
};
