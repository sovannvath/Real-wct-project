"use client";

import React, { useState } from "react";
import { Send, Mic, Image } from "lucide-react";

interface Message {
  id: number;
  name: string;
  username: string;
  avatar: string;
  timestamp: string;
  content: string;
}

const CommunityDiscussion = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "Ny sreynit",
      username: "@sreynit",
      avatar: "/avatars/avatar1.png", // Replace with proper image paths
      timestamp: "456 days",
      content: "I have been making page about us for many hours to be perfect.",
    },
    {
      id: 2,
      name: "Ayanokoji",
      username: "@NitNit",
      avatar: "/avatars/avatar2.png",
      timestamp: "456 days",
      content: "I have been making page about us for many hours to be perfect.",
    },
    {
      id: 3,
      name: "Unknown",
      username: "@Who",
      avatar: "/avatars/avatar3.png",
      timestamp: "456 days",
      content: "I have been making page about us for many hours to be perfect.",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          name: "You",
          username: "@you",
          avatar: "/avatars/avatar4.png", // Example avatar
          timestamp: "Just now",
          content: inputMessage,
        },
      ]);
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0C0F1C] text-white">
      {/* Header */}
      <div className="p-4 bg-[#141414] text-lg font-semibold border-b border-gray-700">
        #Community Discussion
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-3">
            {/* Avatar */}
            <img
              src={message.avatar}
              alt={`${message.name} avatar`}
              className="w-10 h-10 rounded-full"
            />
            {/* Message Content */}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{message.name}</span>
                <span className="text-sm text-gray-400">{message.timestamp} ago</span>
              </div>
              <span className="text-gray-400 text-sm">{message.username}</span>
              <div className="mt-2 bg-gradient-to-r from-teal-500 to-gray-700 text-white px-4 py-2 rounded-lg shadow">
                {message.content}
              </div>
            </div>
            {/* Send Icon */}
            <Send className="w-5 h-5 text-blue-400" />
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-[#141414] border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <button className="text-gray-400 hover:text-white">
            <Image className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Write your message here..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="text-gray-400 hover:text-blue-500"
          >
            <Send className="w-6 h-6" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Mic className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDiscussion;
