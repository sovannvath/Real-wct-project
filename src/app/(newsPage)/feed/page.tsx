"use client";
import React, { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/services/firebase";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import Card from "@/components/Card";
import Link from "next/link";
import SkeletonCard from "@/components/SkeletonCard";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  likesCount?: number;
  commentsCount?: number;
  timestamp: string;
}

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

// Custom Hooks
const useFetchPosts = () => {
  const [posts, setPosts] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "addPostByUser"), orderBy("timestamp", "desc"), limit(10)),
      (snapshot) => {
        const postData: Project[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Post",
            description: data.description || "No description available",
            imageUrl: data.imageUrl || "https://via.placeholder.com/300",
            likesCount: data.likesCount ?? 0,
            commentsCount: data.commentsCount ?? 0,
            timestamp: data.timestamp?.toDate().toLocaleString() || "",
          };
        });
        setPosts(postData);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const memoizedPosts = useMemo(() => posts, [posts]);
  return { posts: memoizedPosts, loading };
};

const useFetchNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=${apiKey}`
        );
        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const memoizedNews = useMemo(() => news, [news]);
  return memoizedNews;
};

// Components
const UserPosts = React.memo(({ posts, loading }: { posts: Project[]; loading: boolean }) => {
  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
        : memoizedPosts.map((post) => (
            <div key={post.id} className="flex justify-center">
              <Card
                id={post.id}
                title={post.title}
                description={post.description}
                image={post.imageUrl}
                timestamp={post.timestamp}
                likesCount={post.likesCount ?? 0}
                commentsCount={post.commentsCount ?? 0}
                isLiked={false}
                isBookmarked={false}
                isFavorite={false}
                url=""
              />
            </div>
          ))}
    </div>
  );
});
UserPosts.displayName = "UserPosts";

const TechNews = React.memo(({ articles }: { articles: NewsArticle[] }) => {
  const memoizedArticles = useMemo(() => articles, [articles]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {memoizedArticles.map((article, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-4">
          <img
            src={article.urlToImage || "https://via.placeholder.com/300"}
            alt={article.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
            loading="lazy"
          />
          <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {article.description || "No description available"}
          </p>
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
});
TechNews.displayName = "TechNews";

// Main Feed Page
const FeedPage = () => {
  const [view, setView] = useState<"userPosts" | "techNews">("userPosts");
  const { posts, loading } = useFetchPosts();
  const newsArticles = useFetchNews();
  const router = useRouter();

  // Handle Firebase Authentication
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
      <div className="flex gap-2 mb-4">
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
          Post by Users
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">
          {view === "userPosts" ? "User Posts" : "Technology News"}
        </h1>

        {/* Conditional Rendering */}
        {view === "userPosts" ? (
          <UserPosts posts={posts} loading={loading} />
        ) : (
          <TechNews articles={newsArticles} />
        )}
      </div>
    </div>
  );
};

export default FeedPage;
