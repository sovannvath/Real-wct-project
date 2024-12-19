"use client";
import React, { useState } from "react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots, FaBookmark, FaHeart, FaEllipsisV } from "react-icons/fa";
import { db } from "@/app/services/firebase";

interface CardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  timestamp: string;
  likesCount?: number; // Optional for user posts
  commentsCount?: number; // Optional for user posts
  isLiked?: boolean; // Optional for user posts
  isBookmarked?: boolean; // Optional for user posts
  isFavorite?: boolean; // Optional for user posts
  url: string;
  source: "user" | "api"; // Indicates the source of the card
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
  // States for user interaction
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [favorite, setFavorite] = useState(isFavorite);
  const [likes, setLikes] = useState(likesCount);

  const postRef = doc(db, "addPostByUser", id);

  const handleLike = async () => {
    const likeChange = liked ? -1 : 1;

    // Optimistic UI Update
    setLiked(!liked);
    setLikes((prev = 0) => prev + likeChange);

    try {
      await updateDoc(postRef, { likesCount: increment(likeChange) });
    } catch (error) {
      console.error("Error updating likes:", error);
      // Rollback UI state if Firestore update fails
      setLiked(!liked);
      setLikes((prev = 0) => prev - likeChange);
    }
  };

  const handleBookmark = async () => {
    // Optimistic UI Update
    setBookmarked(!bookmarked);

    try {
      await updateDoc(postRef, { isBookmarked: !bookmarked });
    } catch (error) {
      console.error("Error updating bookmark:", error);
      // Rollback UI state if Firestore update fails
      setBookmarked(!bookmarked);
    }
  };

  const handleFavorite = async () => {
    // Optimistic UI Update
    setFavorite(!favorite);

    try {
      await updateDoc(postRef, { isFavorite: !favorite });
    } catch (error) {
      console.error("Error updating favorite:", error);
      // Rollback UI state if Firestore update fails
      setFavorite(!favorite);
    }
  };

  return (
    <div className="bg-[#0d0d0d] border border-gray-700 rounded-[40px] shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-[350px] h-auto flex flex-col text-white">
      {/* Header: View More Button and Options */}
      <div className="flex justify-end items-center px-5 py-3 space-x-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#15919b] text-white py-2 px-4 rounded-xl hover:bg-white hover:text-black transition"
        >
          View More
        </a>
        <button className="text-gray-400 hover:text-white">
          <FaEllipsisV className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-2xl font-semibold truncate mb-2">{title}</h2>
        <p className="text-base text-gray-300 mb-3 line-clamp-3">{description}</p>
        <p className="text-base text-gray-500 mb-2">{timestamp}</p>
      </div>

      {/* Image */}
      <div className="relative w-full h-[185px] bg-gray-800 overflow-hidden">
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

          <div onClick={handleBookmark} className="cursor-pointer">
            <FaBookmark
              className={`w-5 h-5 ${bookmarked ? "text-yellow-500" : ""}`}
            />
          </div>

          <div onClick={handleFavorite} className="cursor-pointer">
            <FaHeart className={`w-5 h-5 ${favorite ? "text-red-500" : ""}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
