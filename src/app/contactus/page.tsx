import React from "react";
import { GrServices } from "react-icons/gr";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const page = () => {
  return (
    <div>
      <div className="tittle text-center mt-14">
        <div className="big-tittle text-6xl font-bold">
          <p>Contact Us</p>
        </div>
        <div className="little-tittle text-2xl mt-5 font-medium">
          <p>Any question or remark? Just write us a message!</p>
        </div>
      </div>

      <div className="flex items-center justify-center mt-11 ">
        <form className="input-form flex flex-col md:flex-row items-center gap-4 p-6 rounded-lg ">
          {/* Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="font-bold text-sm md:text-base mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="Name"
              placeholder="Enter your name"
              className="p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email*/}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-bold text-sm md:text-base mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              placeholder="Enter your email"
              className="p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button className="bg-green-500 text-white font-bold px-6 py-3 mt-8 rounded-3xl shadow-md hover:bg-green-600 transition-all">
            Submit
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="flex flex-col mt-14 md:flex-row justify-around items-center bg-gray-100 py-10 px-4">
        {/* About Club */}
        <div className="flex flex-col items-center text-center max-w-sm">
          <div className="bg-blue-500 p-4 rounded-full text-white">
            <GrServices className="text-4xl" />
          </div>
          <h3 className="font-bold text-xl mt-4">SERVICES</h3>
          <button className="text-gray-600 mt-2">
            Trending Technology News
          </button>
          <button className="text-gray-600">Community</button>
        </div>

        <div className="flex flex-col items-center text-center max-w-sm mt-8 md:mt-0">
          <div className="bg-blue-500 p-4 rounded-full text-white">
            <FaPhoneAlt className="text-4xl" />
          </div>
          <h3 className="font-bold text-xl mt-4">PHONE (LANDLINE)</h3>
          <button className="text-gray-600 mt-2">+855 15 999 999</button>
          <button className="text-gray-600">+855 15 888 888</button>
        </div>

        <div className="flex flex-col items-center text-center max-w-sm mt-8 md:mt-0">
          <div className="bg-blue-500 p-4 rounded-full text-white">
            <CiLocationOn className="text-4xl" />
          </div>
          <h3 className="font-bold text-xl mt-4">OUR OFFICE LOCATION</h3>
          <button className="text-gray-600 mt-2">
            Together Techs Studio Company
          </button>
          <button className="text-gray-600">
            St.271 , Tuol Kork , Phnom Penh , Cambodia
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
