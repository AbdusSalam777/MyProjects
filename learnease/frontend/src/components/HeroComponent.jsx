import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      style={{ backgroundColor: 'rgb(7, 2, 41)', color: '#E5E7EB' }}
      className="relative py-24 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[400px] h-[400px] bg-purple-600/30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/25 blur-3xl rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] bg-blue-600/10 blur-2xl rounded-full animate-bounce opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* 🌟 Decorative sparkles */}
      <Sparkles className="w-10 h-10 text-indigo-300 mb-4 animate-spin-slow" />

      {/* 🌈 Main Title */}
      <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
        Welcome to LearnEase
      </h1>

      {/* ✨ Subtitle */}
      <p className="max-w-2xl text-base sm:text-lg text-gray-300 mb-10 leading-relaxed">
        Organize your student life — manage timetables, upload materials, 
        and never miss an assignment again. Built for learners, by learners.
      </p>

      {/* 🎯 Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all shadow-md hover:shadow-lg">
          Get Started <ArrowRight className="w-5 h-5" />
        </button>

        <button className="px-8 py-3 rounded-full border border-indigo-400 text-indigo-300 hover:bg-indigo-600/20 transition-all">
          Learn More
        </button>
      </div>
      
    </section>
  );
};

export default HeroSection;