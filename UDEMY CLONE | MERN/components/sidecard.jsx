import React from "react";
import { Rating } from "react-simple-star-rating";
import { MdOutlineAccessAlarms } from "react-icons/md";

function Sidecard({ data }) {
  const discountedPrice = data.coursePrice
    ? (
        data.coursePrice -
        (data.coursePrice * (data.discount || 0)) / 100
      ).toFixed(2)
    : null;
  return (
    <div className="shadow-lg overflow-hidden">
      {/* Course Thumbnail */}
      <div className="w-full h-52">
        {data.courseThumbnail ? (
          <img
            src={data.courseThumbnail}
            alt={data.courseTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500">Course Preview</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Offer */}
        <p className="text-sm text-red-500 flex items-center gap-1">
          <MdOutlineAccessAlarms size={18} />
          <span className="font-bold">5 days</span> left at this price!
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-gray-900">${discountedPrice}</p>
          <p className="hidden md:block line-through text-gray-500">
            ${data.coursePrice}
          </p>
          <span className="text-green-600 font-semibold">
            {data.discount}% off
          </span>
        </div>

        {/* Ratings + Students */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Rating
            initialValue={5}
            readonly
            size={20}
            fillColor="gold"
            SVGstyle={{ display: "inline-block" }}
          />
          <span className="hidden md:inline">
            {data?.courseRatings?.length || 0} ratings ·{" "}
            {data?.enrolledStudents?.length || 0} students
          </span>
        </div>

        {/* Enroll Button */}
        <button
         className="w-full bg-blue-600 hover:bg-black  text-white py-3 rounded-xl font-semibold transition-all active:scale-95 duration-200 ease-in">
          Enroll Now
        </button>

        {/* Course Includes */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            What’s in the course?
          </h3>
          <ul className="list-disc list-inside text-gray-500 space-y-1 text-sm">
            <li>Lifetime access with free updates</li>
            <li>Step-by-step, hands-on project guidance</li>
            <li>Downloadable resources and source code</li>
            <li>Quizzes to test your knowledge</li>
            <li>Certificate of completion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidecard;
