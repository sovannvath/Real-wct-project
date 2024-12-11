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

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Feed");

  const menuItems = [
    { label: "Dashboard", icon: <Home className="w-5 h-5" />, link: "/dashboard" },
    {
      label: "addPost",
      icon: <BookOpen className="w-5 h-5" />,
      link: "/addPost",
    },
    {
      label: "manageUser",
      icon: <BarChart2 className="w-5 h-5" />,
      link: "/manageUser",
    },
    {
      label: "manageCategory",
      icon: <Star className="w-5 h-5" />,
      link: "/manageCategory",
    },
    {
      label: "addCategory",
      icon: <FileText className="w-5 h-5" />,
      link: "/addCategory",
    },
  ] ;
  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Home className="w-6 h-6" />
          <h2 className="text-xl font-bold">TogetherTechs</h2>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md"
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar and Content Container */}
      <div className="flex flex-1 relative">
        {/* Mobile Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white 
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:static md:translate-x-0 md:block
            overflow-y-auto
          `}
        >
          {/* Logo Section (Hidden on Desktop) */}
          <div className="hidden md:flex flex-col items-center gap-2 p-4">
            <Home className="w-8 h-8" />
            <h2 className="text-2xl font-bold">TogetherTechs</h2>
          </div>

          {/* Menu List */}
          <div className="flex flex-col gap-4 p-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={`flex items-center gap-4 p-2 text-lg font-semibold rounded-lg transition-all duration-300 
                  ${
                    activeMenu === item.label
                      ? "text-blue-500"
                      : "hover:bg-gray-700"
                  }`}
                onClick={() => {
                  setActiveMenu(item.label);
                  setIsSidebarOpen(false); // Close sidebar on mobile after selection
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 md:p-8 bg-gray-100">
          <div>Hello, this is the feed page.</div>
        </div>
      </div>

      {/* Overlay when Mobile Sidebar is Open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminSidebar;
