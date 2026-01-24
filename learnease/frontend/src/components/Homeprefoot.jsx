import React from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const PreFooter = () => {
  return (
    <section className=" text-amber-50 py-16 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <Sparkles className="w-10 h-10 mx-auto mb-4 text-indigo-300 animate-spin-slow" />
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Take Your Learning to the Next Level
        </h2>
        <p className="text-gray-300 mb-8 text-lg sm:text-xl leading-relaxed">
          LearnEase helps you organize your student life, get personalized recommendations, and keep your study materials all in one place. Stay productive, stay motivated, and never miss a task again!
        </p>
        <Link
          to="/timetable"
          className="inline-block px-8 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all shadow-md hover:shadow-lg"
        >
          Start Organizing Today
        </Link>
      </div>
    </section>
  );
};

export default PreFooter;