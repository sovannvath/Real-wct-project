"use client";

import React from "react";
import { Search, Bell,  User, Compass } from "lucide-react";

const ContentHeader = () => {
  return (
    <header className="w-full bg-gray-900 text-white shadow-lg ">
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
          <button className="hidden md:flex items-center px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
            <Compass className="w-5 h-5 mr-2" />
            <span>Create Post</span>
          </button>
          <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
            <Bell className="w-5 h-5 text-yellow-500" />
          </button>
          <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
            <Bell className="w-5 h-5 text-red-500" />
          </button>
          <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
            <User className="w-5 h-5 text-blue-500" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="block md:hidden px-4 py-2">
        <div className="relative">
          <Search className="absolute text-gray-500 w-5 h-5 ml-3 top-2.5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 py-2 rounded-full bg-gray-800 text-gray-300 border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </header>
  );
};

export default ContentHeader;
