"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
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

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const pathname = usePathname(); // Get current route

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

  useEffect(() => {
    const currentMenu = menuItems.find((item) => pathname === item.link); // Match exact route
    if (currentMenu) {
      setActiveMenu(currentMenu.label);
    }
  }, [pathname]); // Trigger when pathname changes

  return (
    <div className="hidden md:block w-64 bg-[#111827] text-white sticky top-0 h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className={`flex items-center gap-4 p-2 rounded-md text-sm font-medium transition-all 
              ${activeMenu === item.label ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
