import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidecard from "./sidecard";

function CoursePageComponent() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchCourse() {
      const res = await fetch(`http://localhost:3000/courses/${id}`);
      const response = await res.json();
      setData(response);
    }
    fetchCourse();
  }, [id]);

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900">
            {data.courseTitle}
          </h1>

          {/* Short Description */}
          <div
            className="text-lg text-gray-500"
            dangerouslySetInnerHTML={{
              __html:
                (data?.courseDescription?.substring(0, 200) || "") + "...",
            }}
          />

          {/* Ratings + Students + Educator */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">
                ({data?.courseRatings?.length || 0} ratings) ·{" "}
                {data?.enrolledStudents?.length || 0} students
              </span>
            </div>

            {/* Instructor */}
            <p className="text-gray-700">
              Course by{" "}
              <span className="underline text-blue-600">GreatStack</span>
            </p>
          </div>

          {/* Course Structure */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Course Structure
            </h2>
            <div className="space-y-2">
              {data?.courseContent?.map((chapter) => (
                <details
                  key={chapter.chapterId}
                  className="border rounded-lg px-4 py-2 text-green-500"
                >
                  <summary className="cursor-pointer font-medium">
                    {chapter.chapterTitle}{" "}
                    <span className="ml-2 text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures
                    </span>
                  </summary>
                  <ul className="list-disc list-inside text-gray-500 mt-2">
                    {chapter.chapterContent.map((lecture) => (
                      <li key={lecture.lectureId}>
                        {lecture.lectureOrder}. {lecture.lectureTitle}{" "}
                        {lecture.isPreviewFree && (
                          <span className="ml-2 text-green-600 text-xs underline">
                            Preview
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Course Description
            </h2>
            <div
              className="prose max-w-none text-gray-500 [&_ul]:list-disc [&_ul]:list-inside flex flex-col gap-2"
              dangerouslySetInnerHTML={{ __html: data?.courseDescription }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="order-first lg:order-last w-full sm:w-[400px] lg:w-[450px] mx-auto lg:mx-0 shrink-0 p-6">
          <div className="bg-amber-50 shadow-lg shadow-gray-600 overflow-hidden lg:top-20">
            <Sidecard data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePageComponent;
