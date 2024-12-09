"use client"
import { FaArrowRight } from "react-icons/fa";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-teal-400 font-bold text-lg">
            <span className="text-white">together</span> tech
          </div>
          <span className="text-gray-400 text-sm ml-2">Techs with us</span>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg">
            Home
          </Link>
          <Link href="/techs" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg">
            Techs
          </Link>
          <Link href="/trending" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg">
            Trending
          </Link>
          <Link href="/community" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg">
            Community
          </Link>
        </div>

        {/* Start Reading Button (Desktop) */}
        <div className="hidden md:block h-[2em]">
  <Link
    href="/start-reading"
    className="flex items-center justify-center px-4 py-2 border border-teal-400 text-white hover:bg-teal-400 hover:text-gray-900 rounded transition bg-[#199399] space-x-2"
  >
    <span>Start Reading</span>
    <FaArrowRight className="text-sm" />
  </Link>
</div>


        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu (Mobile) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          <Link
            href="/"
            className="block px-4 py-2 hover:bg-teal-600 transition"
          >
            Home
          </Link>
          <Link
            href="/techs"
            className="block px-4 py-2 hover:bg-teal-600 transition"
          >
            Techs
          </Link>
          <Link
            href="/trending"
            className="block px-4 py-2 hover:bg-teal-600 transition"
          >
            Trending
          </Link>
          <Link
            href="/community"
            className="block px-4 py-2 hover:bg-teal-600 transition"
          >
            Community
          </Link>
          <Link
            href="/start-reading"
            className="block px-4 py-2 hover:bg-teal-600 transition"
          >
            Start Reading 
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
