import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const db = getFirestore();

export const createGroup = async (groupData: {
  name: string;
  description: string;
  isPublic: boolean;
  createdBy: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, "groups"), {
      ...groupData,
      createdAt: Timestamp.now(),
    });
    console.log("Group created with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding group:", error);
  }
};
