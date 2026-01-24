import React from 'react';
import { IoIosSearch } from "react-icons/io";

const Input = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <div className="flex items-center border-2 border-gray-400 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          
          {/* Search Icon */}
          <span className="px-3 text-gray-500 shrink-0">
            <IoIosSearch size={22} />
          </span>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-1 min-w-0 px-2 py-2 text-base text-gray-900 placeholder-gray-400 outline-none"
          />

          {/* Button */}
          <button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 font-semibold transition-colors active:scale-95">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
