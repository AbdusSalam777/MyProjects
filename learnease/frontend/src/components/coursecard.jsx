import React from 'react';
import { useState,useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { Link, useFetcher } from 'react-router-dom';

function Coursecard() {
   const [data,setdata]=useState([]);

   useEffect(()=>{

async function getData() {
  try {
    const response = await fetch("https://learneasebackend-79bj.onrender.com/courses");

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const result = await response.json();

    // ✅ Ensure array
    setdata(Array.isArray(result) ? result : result.courses || []);
  } catch (error) {
    console.error(error);
    setdata([]);
  }
}

   getData();

   },[])

  return (
    <div className="p-6 max-w-7xl mx-auto mt-[20px] md:mt-[30px] lg:mt-[40px] mb-[15px] lg:mb-[30px]">
        <p className='font-bold text-white text-center text-4xl mb-14 underline '>Course Section</p>
      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
      
        {data.slice(-4).map((item, index) => (
          <Link
            key={index} 
              to={`/course-page/${item._id}`} // yahan slug ya id use karo
              className="border border-gray-300 rounded-xl w-[300px] shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Section */}
            <div>
              <img
                className="rounded-t-xl w-full h-44 object-cover"
                src={item.img}
                alt={item.courseTitle}
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-3 p-4">
              <p className="font-semibold text-lg text-gray-800 h-[50px]">{item.courseTitle}</p>
              <p className="text-sm text-gray-500">GreatStack</p>
              <div className="flex items-center">
                <Rating
                  initialValue={4}
                  readonly
                  size={22}
                  fillColor="gold"
                  SVGstyle={{ display: "inline-block" }}
                />
              </div>
              <p className="font-bold text-lg">${item.coursePrice}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Button Section */}
      <Link to="/courselist">
      <div className="flex justify-center mt-10">
        <button
          className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg 
          hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium"
        >
          Search All Courses
        </button>
      </div>
      </Link>
      

    </div>
  );
}

export default Coursecard;
