import React from 'react';
import { Bell } from 'lucide-react';

const AssignmentsQuizzes = () => {
  const tasks = [
    { title: "Math Assignment 3", due: "Nov 15" },
    { title: "Physics Quiz", due: "Nov 18" },
    { title: "Computer Project", due: "Nov 25" },
  ];

  return (
    <div className="p-6 rounded-2xl shadow-md backdrop-blur-md hover:scale-[1.01] transition-transform duration-300 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold ">Assignments & Quizzes</h2>
        <Bell className="w-5 h-5" />
      </div>

      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li key={index} className="p-3 rounded-xl flex justify-between items-center">
            <span>{task.title}</span>
            <span className="text-sm opacity-70">Due: {task.due}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentsQuizzes;
