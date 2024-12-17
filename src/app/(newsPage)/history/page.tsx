"use client";

import React, { useState } from "react";
import { Search, Heart, Bookmark, MessageSquare, ChevronUp, ChevronDown, MoreVertical } from "lucide-react";

const historyData = [
  {
    group: "Technology",
    articles: [
      { title: "Technology articles for students", views: "1k", comments: 21 },
      { title: "Technology articles for students", views: "1k", comments: 21 },
      { title: "Technology articles for students", views: "1k", comments: 21 },
    ],
  },
  {
    group: "Advantages of technology",
    articles: [
      { title: "Advantages of technology", views: "1k", comments: 21 },
      { title: "Advantages of technology", views: "1k", comments: 21 },
    ],
  },
];

const HistoryPage = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleGroupToggle = (group: string) => {
    setSelectedGroup(selectedGroup === group ? null : group);
  };

  return (
    <div className="min-h-screen bg-[#0C0F1C] text-white px-4 py-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">All histories</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <label className="flex items-center text-gray-400">
            <input type="checkbox" className="mr-2" />
            Select all
          </label>
          <div className="flex items-center gap-4 text-white">
            <span className="font-semibold text-red-400">📅 By date</span>
            <span className="font-semibold border-b-2 border-red-400 cursor-pointer">🔗 By group</span>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search history"
            className="bg-gray-800 text-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-2 top-2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Grouped Articles */}
      {historyData.map((group) => (
        <div key={group.group} className="mb-6">
          <h2
            className="text-lg font-semibold cursor-pointer mb-2"
            onClick={() => handleGroupToggle(group.group)}
          >
            {`“ ${group.group} ”`}
          </h2>
          <div className={`${selectedGroup === group.group ? "hidden" : "block"}`}>
            {group.articles.map((article, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#141414] rounded-md mb-2 p-4 hover:bg-[#1F2937] transition"
              >
                {/* Left Section */}
                <div className="flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/100x60" // Replace with dynamic image if needed
                    alt="Article"
                    className="w-24 h-14 rounded-md"
                  />
                  <div>
                    <p className="font-medium">{article.title}</p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <span>🟢 {article.views}</span>
                      <span>💬 {article.comments}</span>
                      <Heart className="w-4 h-4 text-red-400 inline" />
                      <Bookmark className="w-4 h-4 text-blue-400 inline" />
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                  <ChevronUp className="w-6 h-6 text-green-400 cursor-pointer hover:text-green-300" />
                  <ChevronDown className="w-6 h-6 text-red-400 cursor-pointer hover:text-red-300" />
                  <MoreVertical className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryPage;
