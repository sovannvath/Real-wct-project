"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthListener = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
        console.log("User is authenticated:", currentUser); 
        const email = currentUser.email?.toLowerCase();

        // Redirect based on whether the user is admin or regular user
        if (email === "admin123@gmail.com") {
          router.push("/dashboard"); 
        } else {
          router.push("/feed"); // Redirect regular user to feed
        }
      } else {
        setUser(null); // No user, so set user to null
        console.log("User is not authenticated."); 
        router.push("/login"); 
      }
      setLoading(false); // Stop loading state once checked
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, [router]);

  // While loading (checking auth state), show a loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // No need to render anything, just log in the console
  return null;
};

export default AuthListener;
