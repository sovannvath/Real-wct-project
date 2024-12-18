"use client";
import React, { useState } from "react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots, FaBookmark, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { db } from "@/app/services/firebase";

interface CardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  timestamp: string 
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isFavorite: boolean;
  url: string;
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
    }
  };

  const handleFavorite = async () => {
    try {
      setFavorite(!favorite);
      await updateDoc(postRef, { isFavorite: !favorite });
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const handleViewMore = () => {
    router.push(url); 
  };

  return (
    <div className="bg-black  rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 w-96 h-[30rem] flex flex-col text-white">
      {/* Image */}
      <div className="relative w-full h-52 bg-gray-200 rounded-t-xl overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1">
        <h2 className="text-2xl font-semibold truncate mb-2">{title}</h2>
        <p className="text-sm text-white mb-3 line-clamp-3">{description}</p>
        <p className="text-xs text-gray-400 mb-2">{timestamp}</p>
      </div>
      

      {/* Footer */}
      <div className="px-5 mb-2 flex justify-between items-center text-gray-600">
        <div onClick={handleLike} className="flex items-center space-x-1 cursor-pointer">
          <AiFillLike className={`w-6 h-6 ${liked ? "text-blue-500" : ""}`} />
          <span>{likes}</span>
        </div>

        <div className="flex items-center space-x-1">
          <FaRegCommentDots className="w-5 h-5" />
          <span>{commentsCount}</span>
        </div>

        <div onClick={handleBookmark} className="cursor-pointer">
          <FaBookmark className={`w-5 h-5 ${bookmarked ? "text-yellow-500" : ""}`} />
        </div>

        <div onClick={handleFavorite} className="cursor-pointer">
          <FaHeart className={`w-5 h-5 ${favorite ? "text-red-500" : ""}`} />
        </div>
      </div>

      {/* View More Button */}
      <div className="mt-2 px-5 pb-5">
        <button 
          onClick={handleViewMore}
          className="w-full bg-[#15919b] text-white py-2 rounded-md hover:bg-green-500 transition"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default Card;
