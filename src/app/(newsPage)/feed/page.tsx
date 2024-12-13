"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/services/firebase";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import Card from "@/components/Card";

// Define the structure of a project
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  timestamp: {
    toDate: () => Date;
  }; // Firestore timestamp
}

const FeedPage = () => {
  const [projects, setProjects] = useState<Project[]>([]); // Use the Project interface
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login");
      }
    });

    const unsubscribeFirestore = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[]; 
      setProjects(projectData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600 transition"
      >
        Logout
      </button>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Projects Feed</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.imageUrl}
              timestamp={project.timestamp.toDate().toLocaleString()} // Firestore timestamp
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
