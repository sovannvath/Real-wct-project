
"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/services/firebase"; 
import { onAuthStateChanged, User } from "firebase/auth"; 
import { useRouter, usePathname } from "next/navigation";
import { storeUserInFirestore } from "@/utils/firebaseUtils"; 

const AuthListener = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); 
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User is authenticated:", currentUser);

        const email = currentUser.email?.toLowerCase();

        // Store user data in Firestore when authenticated
        storeUserInFirestore({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });

        // Redirect based on user role
        if (pathname === "/auth/login") {
          if (email === "admin123@gmail.com") {
            router.push("/dashboard");
          } else {
            router.push("/feed");
          }
        }
      } else {
        setUser(null);
        console.log("User is not authenticated.");
      }
      setLoading(false); // Stop loading state once checked
    });

    return () => unsubscribe(); 
  }, [pathname, router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return null; // No UI is rendered by this component
};

export default AuthListener;
