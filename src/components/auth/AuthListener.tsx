"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Use logout from AuthContext
import { useRouter, usePathname } from "next/navigation";

const AuthListener = () => {
  const { currentUser, logout } = useAuth(); // Access logout from AuthContext
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (currentUser) {
      const email = currentUser.email?.toLowerCase();

      // Logout and redirect non-admin users from /dashboard
      if (pathname === "/dashboard" && email !== "admin123@gmail.com") {
        console.log("Unauthorized user accessing /dashboard. Logging out...");
        logout().then(() => router.push("/auth/login")); // Call logout from AuthContext
        return;
      }

      // Redirect from /auth/login based on role
      if (pathname === "/auth/login") {
        if (email === "admin123@gmail.com") {
          router.push("/dashboard");
        } else {
          router.push("/feed");
        }
      }
    } else {
      // Redirect unauthenticated users from /dashboard
      if (pathname === "/dashboard") {
        router.push("/auth/login");
      }
    }

    setLoading(false);
  }, [currentUser, pathname, router, logout]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
};

export default AuthListener;
