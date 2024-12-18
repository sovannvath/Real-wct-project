"use server";

import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/app/services/firebase";

export async function getUserPosts() {
  const postQuery = query(
    collection(db, "addPostByUser"),
    orderBy("timestamp", "desc"), // Sort by timestamp
    limit(10) // Limit the number of posts
  );

  const snapshot = await getDocs(postQuery);
  const posts = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "Untitled Post",
      description: data.description || "No description available",
      imageUrl: data.imageUrl || "https://via.placeholder.com/300",
      likesCount: data.likesCount ?? 0,
      commentsCount: data.commentsCount ?? 0,
      timestamp: data.timestamp
        ? data.timestamp.toDate().toLocaleString() // Convert Firestore Timestamp to string
        : new Date().toLocaleString(),
    };
  });

  return posts;
}
