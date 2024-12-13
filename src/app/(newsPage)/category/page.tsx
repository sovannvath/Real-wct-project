import React from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaToggleOn } from "react-icons/fa";

const Page = () => {
  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-10 lg:px-16">
      {/* Header */}
      <div className="font-bold text-xl sm:text-2xl md:text-3xl text-center mt-5">
        Select the news you want by categorizing these
      </div>

      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 items-center w-full max-w-[1200px]">
          <div className="bg-gray-500 rounded-3xl p-2 w-full h-[90px] text-black">
            <span className="text-black-500 mx-5  text-sm ">Sort</span>
            <p className="text-xl md:text-2xl font-bold mx-5 flex justify-between items-center">
              Latest News
              <button>
                <IoMdArrowDropdown className="ml-2 text-2xl" />
              </button>
            </p>
          </div>

          <div className="bg-gray-500 rounded-3xl p-5 w-full h-[90px] text-black">
            <p className="text-xl md:text-2xl font-bold mx-5 mt-2 flex justify-between items-center">
              Types of news
              <button>
                <IoMdArrowDropdown className="ml-2 text-2xl" />
              </button>
            </p>
          </div>

          <div className="bg-gray-500 rounded-3xl p-5 w-full h-[90px] text-black">
            <p className="text-xl md:text-2xl font-bold mx-5 mt-2 flex justify-between items-center">
              Date
              <button>
                <IoMdArrowDropdown className="ml-2 text-2xl" />
              </button>
            </p>
          </div>

          <div className="bg-gray-500 rounded-3xl p-5 w-full h-[90px] text-black">
            <p className="text-xl md:text-2xl font-bold mx-5 mt-2 flex justify-between items-center">
             Highest rates
              <button>
                <FaToggleOn className="ml-2 text-2xl" />
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-8">
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-500 rounded-3xl w-[180px] sm:w-[200px] md:w-[240px] h-[50px] md:h-[60px]">
            <p className="font-bold text-black text-lg md:text-xl">Reset Filter</p>
          </button>
          <button className="bg-green-500 rounded-3xl w-[180px] sm:w-[200px] md:w-[240px] h-[50px] md:h-[60px]">
            <p className="font-bold text-black text-lg md:text-xl">Apply</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
