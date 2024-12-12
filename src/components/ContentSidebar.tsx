"use client";

import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Star,
  BarChart2,
  MessageSquare,
  FileText,
  Users,
  Search,
  Award,
} from "lucide-react";

const ContentSidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Feed");

  const menuItems = [
    { label: "Feed", icon: <Home className="w-5 h-5" />, link: "/feed" },
    { label: "Bookmark", icon: <BookOpen className="w-5 h-5" />, link: "/bookmark" },
    { label: "Create New Team", icon: <Users className="w-5 h-5" />, link: "/createTeam" },
    { label: "Favorite", icon: <Star className="w-5 h-5" />, link: "/favorite" },
    { label: "Categories", icon: <FileText className="w-5 h-5" />, link: "/category" },
    { label: "Discussion", icon: <MessageSquare className="w-5 h-5" />, link: "/discussion" },
    { label: "Find Team", icon: <Users className="w-5 h-5" />, link: "/findTeam" },
    { label: "Feedback", icon: <MessageSquare className="w-5 h-5" />, link: "/feedback" },
    { label: "History", icon: <BarChart2 className="w-5 h-5" />, link: "/history" },
    { label: "Custom Feed", icon: <Search className="w-5 h-5" />, link: "/customFeed" },
    { label: "Leaderboard", icon: <Award className="w-5 h-5" />, link: "/leaderboard" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block w-64 bg-gray-800 text-white sticky top-0 h-screen">
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={`flex items-center gap-4 p-2 rounded-md text-sm font-medium transition-all 
                ${activeMenu === item.label ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
              onClick={() => setActiveMenu(item.label)}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white md:hidden flex justify-around items-center h-16 shadow-lg">
        {menuItems.slice(0, 5).map((item, index) => (
          <a
            key={index}
            href={item.link}
            className={`flex flex-col items-center justify-center gap-1 text-xs ${
              activeMenu === item.label ? "text-blue-400" : "text-gray-300"
            }`}
            onClick={() => setActiveMenu(item.label)}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>  
        ))}
      </div>
    </div>
  );
};

export default ContentSidebar;
