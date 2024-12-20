"use client";

import React, { useState } from "react";
import { Search, Bell, Compass, Flame } from "lucide-react";
import AddProjectForm from "./form/addprojectform";
import ProfileButton from "@/components/ProfileButton"; // Import the ProfileButton
import { useRouter } from "next/navigation";

const ContentHeader = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#141414] text-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-xl font-bold">Togethertech</h1>
              <p className="text-sm text-gray-400">Tech with us</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center w-full max-w-md mx-4">
            <Search className="text-gray-500 w-5 h-5 absolute ml-3" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 py-2 rounded-full bg-gray-800 text-gray-300 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleOpenModal}
              className="hidden md:flex items-center px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-teal-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <Compass className="w-5 h-5 mr-2 text-white" />
              <span className="text-sm md:text-base">Create Post</span>
            </button>

            <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <Bell className="w-5 h-5 text-yellow-500" />
            </button>
            <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <Flame className="w-5 h-5 text-red-500" />
            </button>

            {/* Use the ProfileButton Component */}
            <ProfileButton />
          </div>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <AddProjectForm />
          </div>
        </div>
      )}
    </>
  );
};

export default ContentHeader;
