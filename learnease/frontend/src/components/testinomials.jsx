import React from 'react'
import { dummyTestimonial } from '../assets/data';
import { Rating } from 'react-simple-star-rating';

function Testinomials() {
  return (
    <>
    <div className='flex flex-col gap-6 items-center mt-[50px]'>
        <p className='font-bold text-4xl text-white underline'>Testinomials</p>
         <p className='mb-14 text-center  text-gray-500'>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto justify-items-center">
      {dummyTestimonial.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 w-[350px]"
        >
          {/* Top Section: Image + Name/Role */}
          <div className="flex items-center gap-4">
            <img
              className="h-14 w-14 rounded-full object-cover border-2 border-indigo-500"
              src={item.img}
              alt={item.name}
            />
            <div>
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          </div>

          {/* Feedback */}
          <div className="mt-4">
            <p className="text-gray-600 leading-relaxed">
              “{item.feedback}”
            </p>
          </div>

          {/* Rating */}
          <div className="mt-4 flex items-center">
            <Rating 
              initialValue={item.rating} 
              readonly 
              size={24} 
              fillColor="gold" 
              SVGstyle={{ display: "inline-block" }}
            />
          </div>
        </div>
      ))}
    </div>
    </>
    
  )
}

export default Testinomials;
