import React from 'react'
import { MdMenuBook } from "react-icons/md";
import { MdBugReport } from "react-icons/md";
import { FaSlideshare } from "react-icons/fa";
import { GiPuzzle } from "react-icons/gi";

export default function Feedback() {
  return (
    <div className="flex flex-col items-center text-white min-h-screen py-10  bg-black">
      <div className="text-3xl font-bold">Provide us the way to improve our quality of Website </div>
      <h1>Down below is the way we can get what's is the weakness of our website from the user themself please provide us and we'll improve</h1>
      {/* Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {/* General */}
        <div className="bg-gray-800 p-6 rounded-3xl shadow-md text-center ">
          <div>
          <MdMenuBook className="w-20 h-20 items-center justify-center"/>
          </div>   
          <h3 className="text-xl font-semibold mb-4">General Feedback</h3>
          <p className="text-gray-400 mb-6">
            Can you tell us what we can do to improve our current website?
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-3xl">
            Write
          </button>
        </div>

        {/* Report Bug */}
        <div className="bg-gray-800 p-6 rounded-3xl shadow-md text-center">
        <MdBugReport  className="w-20 h-20"/>
          <h3 className="text-xl font-semibold mb-4">Report Bug</h3>
          <p className="text-gray-400 mb-6">
            Provide us details about the part where TogetherTechs does not work as expected.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-3xl">
            Report
          </button>
        </div>

        {/* Feature Request */}
        <div className="bg-gray-800 p-6 rounded-3xl shadow-md text-center">
          <GiPuzzle className="w-20 h-20"/>
          <h3 className="text-xl font-semibold mb-4">Feature Request</h3>
          <p className="text-gray-400 mb-6">
            Is there any part where you want us to add? Feel free to tell us.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-3xl">
            Request
          </button>
        </div>

        {/* User Stories */}
        <div className="bg-gray-800 p-6 rounded-3xl shadow-md text-center">
          <FaSlideshare className="w-20 h-20"/>
          <h3 className="text-xl font-semibold mb-4">Share your stories</h3>
          <p className="text-gray-400 mb-6">
            Share your story on how our platform helped you or any success experience you got from our platform.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-3xl">
            Report
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-3xl shadow-md text-center col-span-2 md:col-span-2 lg:col-span-2">
          {/* <h3 className="text-xl font-semibold mb-4">User Stories</h3> */}
          <p className="text-gray-400 mb-6 font-bold text-2xl">
          Thank you for using our platform. We apologize for any inconvenient while using this platform  
          </p>
        </div>
      </div>
      </div>
  )
}
