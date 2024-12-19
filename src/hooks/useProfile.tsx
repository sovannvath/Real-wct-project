import { useState, useEffect } from "react";
import { auth, db } from "@/app/services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
}

const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    bio: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "user", currentUser.uid); 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateProfile = async (updatedProfile: Partial<UserProfile>) => {
    if (!user) throw new Error("User not authenticated");

    const docRef = doc(db, "user", user.uid);
    await updateDoc(docRef, updatedProfile); 
    setProfile({ ...profile, ...updatedProfile }); 
  };

  return { user, profile, setProfile, loading, updateProfile };
};

export default useProfile;
