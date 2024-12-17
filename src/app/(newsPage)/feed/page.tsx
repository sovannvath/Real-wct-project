"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import Card from "@/components/Card";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isFavorite?: boolean;
  timestamp: {
    toDate: () => Date;
  };
}

const FeedPage = () => {
  const [addPostByUser, setAddPostByUser] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login");
      }
    });

    const unsubscribeFirestore = onSnapshot(
      collection(db, "addPostByUser"),
      (snapshot) => {
        const addPostByUserData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Post",
            description: data.description || "No description available",
            imageUrl: data.imageUrl || "https://via.placeholder.com/300",
            likesCount: data.likesCount ?? 0,
            commentsCount: data.commentsCount ?? 0,
            isLiked: data.isLiked ?? false,
            isBookmarked: data.isBookmarked ?? false,
            isFavorite: data.isFavorite ?? false,
            timestamp: data.timestamp
              ? data.timestamp
              : { toDate: () => new Date() },
          };
        }) as Project[];
        setAddPostByUser(addPostByUserData);
      }
    );

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
    <div className="min-h-screen bg-[#0e1116] text-gray-800 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600 transition"
      >
        Logout
      </button>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">
          NewsFeed
        </h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {addPostByUser.map((addPostByUser) => (
            <div key={addPostByUser.id} className="flex justify-center">
              <Card
                id={addPostByUser.id}
                title={addPostByUser.title}
                description={addPostByUser.description}
                image={addPostByUser.imageUrl}
                timestamp={addPostByUser.timestamp.toDate().toLocaleString()}
                likesCount={addPostByUser.likesCount ?? 0} // Ensure default is 0
                commentsCount={addPostByUser.commentsCount ?? 0} // Ensure default is 0
                isLiked={addPostByUser.isLiked ?? false} // Ensure default is false
                isBookmarked={addPostByUser.isBookmarked ?? false} // Ensure default is false
                isFavorite={addPostByUser.isFavorite ?? false} // Ensure default is false
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
