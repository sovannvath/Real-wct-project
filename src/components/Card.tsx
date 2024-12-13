import React from "react";
import { FaUserCircle, FaRegCommentDots, FaBookmark } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

interface CardProps {
  title: string;
  description: string;
  image: string;
  timestamp: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, timestamp }) => {
  return (
    <div className="bg-gray-900 text-white p-5 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <FaUserCircle className="w-8 h-8 text-teal-500" />
        <MdOutlineMoreVert className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-200" />
      </div>
      <div className="mb-4">
        <img
          src={image}
          alt={title}
          className="rounded-lg w-full object-cover"
        />
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-400 mb-2">{timestamp}</p>
      <p className="text-sm">{description}</p>
      <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
        <div className="flex items-center space-x-4">
          <AiFillLike className="w-5 h-5 text-green-500" />
          <FaRegCommentDots className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex space-x-4">
          <FcLike className="w-5 h-5" />
          <FaBookmark className="w-5 h-5 text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

export default Card;
