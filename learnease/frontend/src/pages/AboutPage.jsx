import React from "react";
import { Lightbulb, BookOpen, Sparkles, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen py-20 px-6 text-amber-50">
      
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="mt-10 flex items-center justify-center gap-3 mb-4 text-blue-500">
          <Lightbulb size={30} />
          <BookOpen size={30} />
          <Sparkles size={30} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          About Learnease
        </h1>
        <p className="text-lg md:text-xl text-amber-50/90 leading-relaxed">
          Learnease is your personalized learning companion. We provide tips, recommendations, and insights to help students study smarter, stay motivated, and excel in their courses.
        </p>
      </div>

      {/* Mission / Story Section */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-amber-400">
          Our Mission
        </h2>
        <p className="text-amber-50/90 text-lg md:text-lg leading-relaxed">
          Our mission is to empower students to learn efficiently and effectively. We combine student-tested strategies, research-backed methods, and a community-driven approach to help every learner reach their full potential.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        <div className="flex items-start gap-4 bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <Lightbulb size={32} className="text-yellow-400" />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-amber-50">Smart Tips</h3>
            <p className="text-amber-50/80">
              Get practical, easy-to-implement study tips tailored to your learning style.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <BookOpen size={32} className="text-blue-400" />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-amber-50">Curated Resources</h3>
            <p className="text-amber-50/80">
              Access a collection of helpful resources, notes, and guides for every subject.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <Sparkles size={32} className="text-pink-400" />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-amber-50">Motivation</h3>
            <p className="text-amber-50/80">
              Stay inspired with tips, progress tracking, and encouragement to keep learning.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <Users size={32} className="text-green-400" />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-amber-50">Community</h3>
            <p className="text-amber-50/80">
              Connect with fellow learners, share ideas, and discover new ways to study.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-amber-400">
          Join the Learnease Community
        </h2>
        <p className="text-amber-50/90 mb-6">
          Start your journey today and unlock the potential of smarter, more effective learning.
        </p>
        <a
          href="/recommendations"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-md hover:shadow-lg"
        >
          Explore Recommendations
        </a>
      </div>

    </div>
  );
};

export default AboutPage;
