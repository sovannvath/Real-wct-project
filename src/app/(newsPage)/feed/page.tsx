"use client";
import React, { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/services/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "@/app/services/firebase";
import Card from "@/components/Card";
import SkeletonCard from "@/components/SkeletonCard";

interface AddPostByUser {
  url: string;
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  likesCount?: number;
  commentsCount?: number;
  timestamp: string;
  source: "user" | "admin";
  userId: string; // Added userId
}

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

// Custom Hook: Fetch Posts
const useFetchPosts = () => {
  const [posts, setPosts] = useState<AddPostByUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "allPosts"),
        orderBy("timestamp", "desc"),
        limit(20)
      ),
      (snapshot) => {
        const postData: AddPostByUser[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Post",
            description: data.description || "No description available",
            imageUrl: data.imageUrl || "https://via.placeholder.com/300",
            likesCount: data.likesCount ?? 0,
            commentsCount: data.commentsCount ?? 0,
            url: data.url || "#",
            timestamp: data.timestamp?.toDate().toLocaleString() || "",
            source: data.source || "user",
            userId: data.userId || "", // Added userId
          };
        });
        setPosts(postData);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { posts: useMemo(() => posts, [posts]), loading };
};

// Custom Hook: Fetch News
const useFetchNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/new");
        const data = await response.json();

        if (data.error) {
          console.error("Error fetching news:", data.error);
        } else {
          setNews(data.articles || []);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return useMemo(() => news, [news]);
};

// Main FeedPage Component
const FeedPage = () => {
  const [view, setView] = useState<"userPosts" | "techNews">("techNews");
  const { posts, loading } = useFetchPosts();
  const newsArticles = useFetchNews();
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login");
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  const handleViewChange = (newView: "userPosts" | "techNews") => {
    setView(newView);
  };

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
      {/* Header Buttons */}
      <div className="flex gap-2 mb-4 justify-between items-center px-4">
        {/* Left Side Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600 transition h-12"
          >
            Logout
          </button>
          <button
            onClick={() => handleViewChange("techNews")}
            className={`w-[200px] px-4 py-2 bg-slate-500 text-white font-medium rounded-xl hover:bg-slate-600 transition duration-200 h-12 ${
              view === "techNews" ? "bg-slate-700" : ""
            }`}
          >
            Technology News
          </button>
          <button
            onClick={() => handleViewChange("userPosts")}
            className={`w-[135px] px-4 py-2 bg-slate-500 text-white font-medium rounded-xl hover:bg-slate-600 transition duration-200 h-12 ${
              view === "userPosts" ? "bg-slate-700" : ""
            }`}
          >
            Posts
          </button>
        </div>

        {/* Group Button (Top Right) */}
        <div>
          <button
            onClick={() => router.push("/groups")} // Navigate to Groups page
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-xl shadow-md hover:bg-blue-600 transition duration-200 h-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75c3.45 0 6.75 2.58 6.75 6s-3.3 6-6.75 6-6.75-2.58-6.75-6 3.3-6 6.75-6zm-4.8 6h9.6M12 6.75v12"
              />
            </svg>
            <span>Group</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-white sm:text-left border-b-2 border-gray-600 pb-3">
          {view === "userPosts" ? "User/Admin Posts" : "Technology News"}
        </h1>

        {/* Conditional Rendering */}
        {view === "userPosts" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : posts.map((post) => (
                  <Card
                    key={post.id}
                    id={post.id}
                    userId={post.userId}
                    title={post.title}
                    description={post.description}
                    image={post.imageUrl}
                    timestamp={post.timestamp}
                    likesCount={post.likesCount ?? 0}
                    commentsCount={post.commentsCount ?? 0}
                    isLiked={false}
                    isBookmarked={false}
                    isFavorite={false}
                    url={post.url}
                    source={post.source}
                  />
                ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, index) => (
              <Card
                key={index}
                id={index.toString()}
                userId="" // No userId for news articles
                title={article.title}
                description={article.description || "No description available"}
                image={article.urlToImage || "https://via.placeholder.com/300"}
                timestamp={new Date(article.publishedAt).toLocaleString()}
                likesCount={0}
                commentsCount={0}
                isLiked={false}
                isBookmarked={false}
                isFavorite={false}
                url={article.url}
                source="api"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
