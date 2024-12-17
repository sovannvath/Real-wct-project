"use client";

import React, { useState } from "react";

const FilterForm = () => {
  const [sort, setSort] = useState("latest");
  const [typeOfNews, setTypeOfNews] = useState("all");
  const [date, setDate] = useState("");
  const [highestRate, setHighestRate] = useState(false);

  const handleReset = () => {
    setSort("latest");
    setTypeOfNews("all");
    setDate("");
    setHighestRate(false);
  };

  const handleApply = () => {
    console.log({ sort, typeOfNews, date, highestRate });
    // Integrate Firebase logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0C0F1C] text-white px-6 py-10">
      {/* Heading */}
      <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        Select the news you want by categorizing these
      </h1>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-6">
        {/* Sort Dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-400 text-sm mb-1">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-3 rounded-lg text-black bg-white shadow focus:ring-2 focus:ring-blue-400"
          >
            <option value="latest">Latest News</option>
            <option value="oldest">Oldest News</option>
          </select>
        </div>

        {/* Types of News Dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-400 text-sm mb-1">Types of news</label>
          <select
            value={typeOfNews}
            onChange={(e) => setTypeOfNews(e.target.value)}
            className="w-full p-3 rounded-lg text-black bg-white shadow focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>

        {/* Date Input */}
        <div className="flex flex-col">
          <label className="text-gray-400 text-sm mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-lg text-black bg-white shadow focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Highest Rate Toggle */}
        <div className="flex items-center justify-between">
          <label className="text-gray-400 text-sm">Highest Rate</label>
          <input
            type="checkbox"
            checked={highestRate}
            onChange={(e) => setHighestRate(e.target.checked)}
            className="w-10 h-5 rounded-full bg-gray-300 checked:bg-green-500 focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          className="px-6 py-2 rounded-md bg-white text-black hover:bg-gray-300 transition shadow-md"
        >
          Reset Filter
        </button>
        <button
          onClick={handleApply}
          className="px-6 py-2 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition shadow-md"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterForm;
