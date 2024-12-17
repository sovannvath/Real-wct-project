"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/services/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import {
  FaUserCircle,
  FaRegCommentDots,
  FaBookmark,
  FaHeart,
} from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

interface CardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  timestamp: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isFavorite: boolean;
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
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [favorite, setFavorite] = useState(isFavorite);
  const [likes, setLikes] = useState(likesCount);

  const router = useRouter();
  const postRef = doc(db, "addPostByUser", id);

  const handleLike = async () => {
    try {
      const likeChange = liked ? -1 : 1;
      await updateDoc(postRef, { likesCount: increment(likeChange) });
      setLiked(!liked);
      setLikes((prev) => prev + likeChange);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      setBookmarked(!bookmarked);
      await updateDoc(postRef, { isBookmarked: !bookmarked });
    } catch (error) {
      console.error("Error updating bookmark:", error);
      setBookmarked((prev) => !prev);
    }
  };

  const handleFavorite = async () => {
    try {
      setFavorite(!favorite);
      await updateDoc(postRef, { isFavorite: !favorite });
    } catch (error) {
      console.error("Error updating favorite:", error);
      setFavorite((prev) => !prev);
    }
  };

  return (
    <div className="bg-[#1c1f26] text-white rounded-[41px] p-4 shadow-lg hover:border hover:border-gray-200 w-[340px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <FaUserCircle className="text-teal-400 w-7 h-7" />
        <button
          onClick={() => router.push(`/news/${id}`)}
          className="bg-[#00c2cb] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#00a9b2] transition"
        >
          View Post
        </button>
        <MdOutlineMoreVert className="w-6 h-6 text-gray-300 cursor-pointer" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold leading-snug mb-2">{title}</h2>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-4 truncate">{description}</p>

      {/* Image */}
      <div className="w-[305px] h-[200px] mb-4 rounded-2xl overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/340x200"}
          alt={title}
          className="w-[340px] h-[200px] object-cover"
        />
      </div>

      {/* Timestamp */}
      <p className="text-xs text-gray-400 mb-4">{timestamp}</p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-auto text-gray-400 text-sm">
        {/* Like */}
        <div
          onClick={handleLike}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <AiFillLike
            className={`w-6 h-6 ${
              liked ? "text-green-500" : "text-gray-400"
            } transition`}
          />
          <span className="text-white">{likes}</span>
        </div>

        {/* Comments */}
        <div className="flex items-center space-x-1">
          <FaRegCommentDots className="w-6 h-6 text-blue-400" />
          <span className="text-white">{commentsCount}</span>
        </div>

        {/* Favorite */}
        <div onClick={handleFavorite} className="cursor-pointer">
          <FaHeart
            className={`w-6 h-6 ${
              favorite ? "text-pink-500" : "text-gray-400"
            } transition`}
          />
        </div>

        {/* Bookmark */}
        <div onClick={handleBookmark} className="cursor-pointer">
          <FaBookmark
            className={`w-6 h-6 ${
              bookmarked ? "text-yellow-400" : "text-gray-400"
            } transition`}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
