"use client";
import React, { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  increment,
  deleteDoc,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { AiFillLike } from "react-icons/ai";
import {
  FaRegCommentDots,
  FaBookmark,
  FaHeart,
  FaEllipsisV,
  FaTimes,
} from "react-icons/fa";
import { db } from "@/app/services/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useProfile from "@/hooks/useProfile";

interface Comment {
  id: string;
  username: string;
  comment: string;
  timestamp: Date;
}

interface CardProps {
  id: string;
  userId: string; // User ID from allPosts collection
  title: string;
  description: string;
  image?: string;
  timestamp: string;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isFavorite?: boolean;
  url: string;
  source: "user" | "api" | "admin";
}

const Card: React.FC<CardProps> = ({
  id,
  userId,
  title,
  description,
  image,
  timestamp,
  likesCount,
  commentsCount,
  isLiked,
  isBookmarked,
  isFavorite,
  url,
  source,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [favorite, setFavorite] = useState(isFavorite);
  const [likes, setLikes] = useState(likesCount);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [localCommentsCount, setCommentsCount] = useState<number>(0);
  const { profile } = useProfile(); // Access the logged-in user's profile
  const [newComment, setNewComment] = useState("");
  const [userProfile, setUserProfile] = useState<{
    name: string;
    profilePicture: string;
  }>({
    name: "Anonymous",
    profilePicture: "",
  });

  useEffect(() => {
    // Fetch user profile from `user` collection using userId
    const fetchUserProfile = async () => {
      try {
        const userRef = doc(db, "user", userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserProfile(
            userDoc.data() as { name: string; profilePicture: string }
          );
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(url);
  };

  const confirmDelete = async () => {
    try {
      const postRef = doc(db, "allPosts", id); // Unified collection
      await deleteDoc(postRef);
      toast.success("Post deleted successfully!");
      setIsModalOpen(false);
      console.log(`Post ${id} deleted from Firestore.`);
    } catch (error) {
      console.error("Error deleting post: ", error);
      toast.error("Failed to delete the post. Please try again.");
    }
  };

  const handleLike = async () => {
    try {
      const postRef = doc(db, "allPosts", id);
      if (liked) {
        await updateDoc(postRef, { likesCount: increment(-1) });
        setLikes((prev) => (prev || 0) - 1);
      } else {
        await updateDoc(postRef, { likesCount: increment(1) });
        setLikes((prev) => (prev || 0) + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error updating likes: ", error);
      toast.error("Failed to update likes. Please try again.");
    }
  };

  const handleReport = () => {
    toast.info("Post reported successfully!");
  };

  const toggleCommentModal = () => {
    setIsCommentModalOpen((prev) => {
      if (!prev) fetchComments();
      return !prev;
    });
  };
  const fetchComments = () => {
    const commentsRef = collection(db, "allPosts", id, "comments");
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          username: data.username,
          comment: data.comment,
          timestamp: data.timestamp?.toDate() || new Date(), // Convert Firestore Timestamp to Date
        } as Comment;
      });
      setComments(fetchedComments);
      setCommentsCount(fetchedComments.length); // Update the count
    });

    return unsubscribe;
  };

  const addComment = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      const commentsRef = collection(db, "allPosts", id, "comments");
      await addDoc(commentsRef, {
        username: profile.name || "Anonymous", // Use the current user's profile dynamically
        comment: newComment,
        timestamp: serverTimestamp(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };

  useEffect(() => {
    const fetchCommentCount = async () => {
      const commentsRef = collection(db, "allPosts", id, "comments");
      const snapshot = await getDocs(commentsRef);
      setCommentsCount(snapshot.size); // Update the comment count
    };

    fetchCommentCount();
  }, [id]);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <div className="bg-[#0d0d0d] border border-gray-700 rounded-[40px] shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-[350px] h-[445px] flex flex-col text-white relative">
      {/* Profile Icon */}
      {source !== "api" && (
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <img
            src={userProfile.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-sm text-gray-300 font-medium">
            {userProfile.name || "Anonymous"}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-end items-center px-5 py-3 space-x-2 relative">
        <a
          href={url}
          target="_blank"
          className="bg-[#15919b] text-white py-2 px-4 rounded-xl hover:bg-white hover:text-black transition"
          rel="noopener noreferrer"
        >
          View More
        </a>
        {source !== "api" && (
          <button
            className="text-gray-400 hover:text-white relative"
            onClick={toggleOptions}
          >
            <FaEllipsisV className="w-5 h-5" />
          </button>
        )}
        {showOptions && source !== "api" && (
          <div className="absolute top-10 right-0 bg-[#1e1e1e] text-white shadow-lg rounded-lg z-50 w-40 py-2">
            <button
              onClick={handleShare}
              className="w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Copy Link
            </button>
            {(source === "user" || source === "admin") && (
              <button
                onClick={() => setIsModalOpen(true)} // Open the confirmation modal
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Delete Post
              </button>
            )}
            <button
              onClick={handleReport}
              className="w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Report Post
            </button>
          </div>
        )}

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[400px] text-black">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p className="mb-6">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)} // Close the modal
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete} // Call the confirmDelete function
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-2xl font-semibold truncate mb-2">
          {title}
          {source === "admin" && (
            <span className="ml-2 text-sm text-blue-400 font-medium">
              (Admin)
            </span>
          )}
        </h2>
        <p className="text-base text-gray-300 mb-3 line-clamp-3">
          {description}
        </p>
        <p className="text-base text-gray-500 mb-2">{timestamp}</p>
      </div>

      {/* Image */}
      <div className="relative w-full h-[185px] bg-gray-800 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex justify-between items-center text-gray-400">
        {/* Conditionally render Like and Comment buttons */}
        {source !== "api" && (
          <>
            <div
              onClick={handleLike}
              className="flex items-center space-x-1 cursor-pointer"
            >
              <AiFillLike
                className={`w-6 h-6 ${liked ? "text-blue-500" : ""}`}
              />
              <span>{likes}</span>
            </div>
            <div
              onClick={toggleCommentModal}
              className="flex items-center space-x-1 cursor-pointer"
            >
              <FaRegCommentDots className="w-5 h-5" />
              <span>{comments.length || commentsCount || 0}</span>
            </div>
          </>
        )}

        {/* Bookmark and Favorite Buttons (Always Render) */}
        <div
          onClick={() => setBookmarked(!bookmarked)}
          className="cursor-pointer"
        >
          <FaBookmark
            className={`w-5 h-5 ${bookmarked ? "text-yellow-500" : ""}`}
          />
        </div>
        <div onClick={() => setFavorite(!favorite)} className="cursor-pointer">
          <FaHeart className={`w-5 h-5 ${favorite ? "text-red-500" : ""}`} />
        </div>
      </div>
    </div>
  );
};

export default Card;
