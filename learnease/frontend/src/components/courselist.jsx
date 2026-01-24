import React, { useState, useEffect } from 'react';
import { Rating } from "react-simple-star-rating";
import { Link } from 'react-router-dom';

function Courselist() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("https://learneasebackend-79bj.onrender.com/courses", {
        method: "GET"
      });
      const data = await response.json();
      setdata(data);
    }
    getData();
  }, []);

  return (
    <>
      <div className='mt-[100px]'>
        <p className=' font-bold text-white text-4xl ml-[220px] underline'>Course List</p>
      </div>

      <div className="p-6 max-w-7xl mx-auto mt-[20px] md:mt-[30px] lg:mt-[40px] mb-[15px] lg:mb-[30px]">
        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {data.map((item, index) => (
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
      </div>
    </>
  );
}

export default Courselist;
