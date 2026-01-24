import React from "react";
import { Calendar, BookOpen, UploadCloud, FileText, Edit3, CheckSquare } from "lucide-react";

import { useNavigate } from "react-router-dom";

const HomeDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Timetable",
      description: "Plan your day, track your classes, and stay organized.",
      icon: <Calendar size={32} className="text-indigo-400" />,
      route: "/timetable",
      bg: "bg-indigo-600/30",
      hover: "hover:bg-indigo-500/30",
    },
    {
      title: "Recommendations",
      description: "Explore personalized study tips and insights.",
      icon: <BookOpen size={32} className="text-pink-400" />,
      route: "/recommendations",
      bg: "bg-pink-600/30",
      hover: "hover:bg-pink-500/30",
    },
    {
      title: "Uploads",
      description: "Upload your study materials and resources.",
      icon: <UploadCloud size={32} className="text-green-400" />,
      route: "/uploads",
      bg: "bg-green-600/30",
      hover: "hover:bg-green-500/30",
    },
    {
      title: "Assignments",
      description: "Track, add, and manage your assignments with deadlines.",
      icon: <FileText size={32} className="text-yellow-400" />,
      route: "/assignments",
      bg: "bg-yellow-600/30",
      hover: "hover:bg-yellow-500/30",
    },
    {
      title: "Quizzes",
      description: "View and manage your upcoming quizzes and timings.",
      icon: <Edit3 size={32} className="text-red-400" />,
      route: "/quizzes",
      bg: "bg-red-600/30",
      hover: "hover:bg-red-500/30",
    },
     {
      title: "Attendance",
      description: "Mark and track your class attendance daily.",
      icon: <CheckSquare size={32} className="text-blue-400" />,
      route: "/attendance",
      bg: "bg-yellow-600/70",
      hover: "hover:bg-yellow-600/75",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {cards.map((card) => (
        <div
          key={card.title}
          onClick={() => navigate(card.route)}
          className={`cursor-pointer ${card.bg} ${card.hover} rounded-2xl p-6 flex flex-col items-start gap-4 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className="p-4 bg-gray-900 rounded-full">{card.icon}</div>
          <h3 className="text-xl font-semibold text-amber-50">{card.title}</h3>
          <p className="text-gray-300">{card.description}</p>
        </div>
      ))}
    </section>
  );
};

export default HomeDashboard;