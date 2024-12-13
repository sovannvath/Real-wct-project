"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation"; 

const AuthListener = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
        console.log("User is authenticated:", currentUser); 

        const email = currentUser.email?.toLowerCase();

        // If user is already authenticated, redirect them to feed or dashboard
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
  }, [pathname, router]); // Add pathname to dependencies

  if (loading) {
    return <div>Loading...</div>;
  }

  return null; // Do not render anything
};

export default AuthListener;
