"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import {
  User,
  Bookmark,
  History,
  Heart,
  LayoutGrid,
  MessageSquare,
  FileText,
  Users,
  PlusCircle,
  List,
  Award,
} from "lucide-react";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const pathname = usePathname(); // Get current route

  const menuItems = [
    { label: "Feed", icon: <User className="w-5 h-5" />, link: "/feed" },
    { label: "Bookmark", icon: <Bookmark className="w-5 h-5" />, link: "/bookmark" },
    { label: "Create New Team", icon: <History className="w-5 h-5" />, link: "/createTeam" },
    { label: "Favorite", icon: <Heart className="w-5 h-5" />, link: "/favorite" },
    { label: "Categories", icon: <LayoutGrid className="w-5 h-5" />, link: "/category" },
    { label: "Discussion", icon: <MessageSquare className="w-5 h-5" />, link: "/discussion" },
    { label: "Find Team", icon: <FileText className="w-5 h-5" />, link: "/findTeam" },
    { label: "Feedback", icon: <MessageSquare className="w-5 h-5" />, link: "/feedback" },
    { label: "History", icon: <Users className="w-5 h-5" />, link: "/history" },
    { label: "Custom Feed", icon: <PlusCircle className="w-5 h-5" />, link: "/customFeed" },
    { label: "Leaderboard", icon: <Award className="w-5 h-5" />, link: "/leaderboard" },
  ];

  useEffect(() => {
    const currentMenu = menuItems.find((item) => pathname === item.link); // Match exact route
    if (currentMenu) {
      setActiveMenu(currentMenu.label);
    }
  }, [pathname]); // Trigger when pathname changes

  return (
    <div className="hidden md:block w-64 bg-[#141414] text-white sticky top-0 h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className={`flex items-center gap-4 p-2 rounded-md text-sm font-medium transition-all 
              ${activeMenu === item.label ? "bg-gray-300 text-black round-2xl" : "hover:bg-gray-700"}`}
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
