"use client";

import React, { useState } from "react";
import { BiBookAlt, BiHome, BiMessage, BiSolidReport, BiStats, BiTask } from "react-icons/bi";
import Link from "next/link";

const ContentSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Feed");

  const menuItems = [
    { label: 'Feed', icon: <BiHome className="text-xl" />, link: '/feed' },
    { label: 'Bookmark', icon: <BiBookAlt className="text-xl" />, link: '/bookmark' },
    { label: 'History', icon: <BiStats className="text-xl" />, link: '/history' },
    { label: 'Favorite', icon: <BiTask className="text-xl" />, link: '/favorite' },
    { label: 'Categories', icon: <BiSolidReport className="text-xl" />, link: '/category' },
    { label: 'Discussion', icon: <BiSolidReport className="text-xl" />, link: '/discussion' },
    { label: 'Find Team', icon: <BiSolidReport className="text-xl" />, link: '/findTeam' },
    { label: 'Feedback', icon: <BiSolidReport className="text-xl" />, link: '/feedback' },
    { label: 'Create New Team', icon: <BiSolidReport className="text-xl" />, link: '/createTeam' },
    { label: 'Custom Feed', icon: <BiSolidReport className="text-xl" />, link: '/customFeed' },
    { label: 'Leaderboard', icon: <BiSolidReport className="text-xl" />, link: '/leaderboard' },
  ];

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`flex flex-col gap-8 p-4 bg-gray-800 text-white fixed top-0 left-0 h-screen transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"} overflow-auto`}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <BiBookAlt className="text-4xl" />
          {isSidebarOpen && <h2 className="text-2xl font-bold">TogetherTechs</h2>}
        </div>

        {/* Menu List */}
        <div className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`flex items-center gap-4 p-2 text-lg font-semibold rounded-lg transition-all duration-300 
                ${activeMenu === item.label ? "bg-gray-700 text-blue-500" : "hover:bg-gray-700"} 
                ${isSidebarOpen ? "px-4" : "px-2"}`}
              onClick={() => setActiveMenu(item.label)} // Set active menu item on click
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* Toggle Button for Mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute bottom-4 left-4 p-2 rounded-full bg-gray-700 text-white md:hidden"
        >
          {isSidebarOpen ? ">" : "<"}
        </button>
      </div>

      {/* Overlay when Sidebar is Open (Mobile) */}
      <div
        className={`md:hidden ${isSidebarOpen ? "block" : "hidden"} fixed inset-0 bg-black opacity-50`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
    </div>
  );
};

export default ContentSidebar;
