"use client"
import React from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from "@/app/services/firebase";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If user is not authenticated, redirect to login page
        router.push("/auth/login");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [router]);
  return (
    <div>
      Hello this is the feed page
    </div>
  )
}

export default page
