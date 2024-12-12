import { FaUserCircle } from "react-icons/fa";
import { MdOutlineMoreVert } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaBookmark } from "react-icons/fa";

export default function Card() {
  return (
    <div className="bg-gray-900 text-white p-5 rounded-xl shadow-lg w-72 m-5 m-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button className="user">
            <FaUserCircle className="w-6 h-6" />
          </button>
        </div>
        <button className="bg-teal-500 text-sm px-3 py-1 rounded-lg hover:bg-teal-600 rounded-full ml-auto">
          View Post
        </button>

        <button><MdOutlineMoreVert className="w-6 h-6" /></button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Alien Has come to our planet.</h2>
        <p className="text-sm text-gray-400">Date: 01/Sep/2021</p>
      </div>

      <div className="mb-4">
        <img
          src="/image/card_pic.jpg"
          alt="Post"
          className="rounded-lg w-full"
        />
      </div>

      {/* Reaction Section */}
      <div className="flex justify-between items-center text-gray-400 text-sm">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <AiFillLike className="w-6 h-6" />
            <span className="ml-1 w-6 h-6">1k</span>
          </div>
          <div className="flex items-center">
            <span className="ml-8 w-6 h-6">21</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center">
          <FaRegCommentDots  className="w-6 h-6" />
          </div>
          <div className="flex items-center">
          <FcLike  className="w-6 h-6"/>
          </div>
          <div className="flex items-center">
          <FaBookmark  className="w-6 h-4" />
          </div>
        </div>
      </div>
    </div>


  );
}
