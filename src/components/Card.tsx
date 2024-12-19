"use client";
import React, { useState } from "react";
import { doc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { AiFillLike } from "react-icons/ai";
import {
  FaRegCommentDots,
  FaBookmark,
  FaHeart,
  FaEllipsisV,
} from "react-icons/fa";
import { db } from "@/app/services/firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface CardProps {
  id: string;
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
  source: "user" | "api";
}

const Card: React.FC<CardProps> = ({
  id,
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

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(url);
    alert("Post link copied to clipboard!");
  };

  const handleDelete = async () => {
    if (source === "user") {
      setIsModalOpen(true);
    } else {
      alert("You can only delete user posts!");
    }
  };

  const confirmDelete = async () => {
    try {
      // Reference to the post in Firestore
      const postRef = doc(db, "addPostByUser", id);

      // Delete the post from Firestore
      await deleteDoc(postRef);

      // Inform the user and update the feed state
      toast.success("Post deleted successfully!");
      setIsModalOpen(false);

      console.log(`Post ${id} deleted from Firestore.`);
    } catch (error) {
      console.error("Error deleting post: ", error);
      toast.error("Failed to delete the post. Please try again.");
    }
  };

  const handleLike = async () => {
    if (!id) return; // Ensure the post ID is available
    try {
      const postRef = doc(db, "addPostByUser", id);
      if (liked) {
        // Unlike
        await updateDoc(postRef, { likesCount: increment(-1) });
        setLikes((prev) => (prev || 0) - 1);
      } else {
        // Like
        await updateDoc(postRef, { likesCount: increment(1) });
        setLikes((prev) => (prev || 0) + 1);
      }
      setLiked(!liked); // Toggle local state
    } catch (error) {
      console.error("Error updating likes: ", error);
      alert("Failed to update likes. Please try again.");
    }
  };

  const handleReport = () => {
    alert("Post reported successfully!");
  };

  return (
    <div className="bg-[#0d0d0d] border border-gray-700 rounded-[40px] shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-[350px] h-[445px] flex flex-col text-white relative">
      {/* Header: View More Button and Options */}
      <div className="flex justify-end items-center px-5 py-3 space-x-2 relative">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#15919b] text-white py-2 px-4 rounded-xl hover:bg-white hover:text-black transition"
        >
          View More
        </a>
        <button
          className="text-gray-400 hover:text-white relative"
          onClick={toggleOptions}
        >
          <FaEllipsisV className="w-5 h-5" />
        </button>
        {showOptions && (
          <div className="absolute top-10 right-0 bg-[#1e1e1e] text-white shadow-lg rounded-lg z-50 w-40 py-2">
            <button
              onClick={handleShare}
              className="w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Share
            </button>
            {source === "user" && (
              <button
                onClick={handleDelete}
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
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-2xl font-semibold truncate mb-2">{title}</h2>
        <p className="text-base text-gray-300 mb-3 line-clamp-3">
          {description}
        </p>
        <p className="text-base text-gray-500 mb-2">{timestamp}</p>
      </div>

      {/* Image */}
      <div className="relative w-full h-[185px] bg-gray-800 overflow-hidden ">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Footer */}
      {source === "user" && (
        <div className="px-5 py-3 flex justify-between items-center text-gray-400">
          <div
            onClick={handleLike}
            className="flex items-center space-x-1 cursor-pointer"
          >
            <AiFillLike className={`w-6 h-6 ${liked ? "text-blue-500" : ""}`} />
            <span>{likes}</span>
          </div>

          <div className="flex items-center space-x-1">
            <FaRegCommentDots className="w-5 h-5" />
            <span>{commentsCount}</span>
          </div>

          <div
            onClick={() => setBookmarked(!bookmarked)}
            className="cursor-pointer"
          >
            <FaBookmark
              className={`w-5 h-5 ${bookmarked ? "text-yellow-500" : ""}`}
            />
          </div>

          <div
            onClick={() => setFavorite(!favorite)}
            className="cursor-pointer"
          >
            <FaHeart className={`w-5 h-5 ${favorite ? "text-red-500" : ""}`} />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold text-black">Are you sure you want to delete this post?</h2>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Card;
