"use client";

import { useState } from "react";
import { signOut } from "firebase/auth"; // Import signOut directly
import { auth } from "@/app/services/firebase"; // Import the initialized auth

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, setDoc, getFirestore, serverTimestamp } from "firebase/firestore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const db = getFirestore(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
  
    try {
      await signOut(auth); // Ensure no lingering sessions
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userDocRef = doc(db, "user", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        role: email === "admin123@gmail.com" ? "admin" : "user",
        createdAt: serverTimestamp(),
      });
  
      setMessage("Login successful! Redirecting...");
      setEmail("");
      setPassword("");
  
      if (email === "admin123@gmail.com") {
        router.push("/dashboard");
      } else {
        router.push("/feed");
      }
    } catch (error: any) {
      setMessage("Your email or password is incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    setMessage("");

    const provider = new GoogleAuthProvider(); // Add the provider for Google login

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "user", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "No Name",
        photoURL: user.photoURL || "",
        role: "user", 
        createdAt: serverTimestamp(),
      });

      setMessage("Google account registered successfully! Redirecting...");
      router.push("/feed");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md border border-gray-300">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-gray-50 text-gray-800 placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-gray-50 text-gray-800 placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-700 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleRegister}
            className="w-full px-4 py-2 text-white bg-red-600 rounded-md focus:outline-none focus:ring focus:ring-red-300 hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? "Connecting to Google..." : "Register with Google"}
          </button>
        </div>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
