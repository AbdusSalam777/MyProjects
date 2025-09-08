import React from 'react'
import { IoIosSearch } from "react-icons/io";

function Hero(){

  return (

    <div>
        <div className='flex flex-col gap-4 md:gap-5 lg:gap-9 items-center text-center mt-14 md:mt-20 lg:mt-24'>

       <p className='font-extrabold text-3xl md:text-4xl lg:text-5xl w-[300px] md:w-[500px]  lg:w-[900px]'>Empower your future with the courses designed to <span className='text-blue-500'>fit your choice </span>.</p>

         <p className='w-[350px] md:w-[550px]  lg:w-[900px] text-gray-600 font-semibold'>We bring together world-class instructors, interactive content and a supportive community to help you achieve your professional goals.</p>

         <div className="w-[320px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-14 border-2 border-gray-500 rounded-xl flex items-center px-3">
  
 
  <IoIosSearch className="text-gray-500 text-2xl" />

  <input
    type="text"
    placeholder="Search for courses"
    className="flex-1 ml-3 text-[16px] font-medium text-gray-900 focus:outline-none focus:ring-0 placeholder-gray-400"
  />

  
  <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white text-sm md:text-base active:scale-95 transition-all duration-300">
    Search
  </button>
</div>
    </div>

    </div>
    
  )

}

export default Hero;
