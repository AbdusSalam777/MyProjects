import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-amber-50 py-6 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Logo / Branding */}
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold mb-1">LearnEase</h1>
          <p className="text-gray-400 text-xs">
            Organize your student life, study smarter, and never miss an assignment.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:items-end">
          <h2 className="font-semibold mb-2 text-sm">Quick Links</h2>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>
              <Link to="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/timetable" className="hover:text-amber-400 transition-colors">
                Timetable
              </Link>
            </li>
            <li>
              <Link to="/recommendations" className="hover:text-amber-400 transition-colors">
                Recommendations
              </Link>
            </li>
            <li>
              <Link to="/uploads" className="hover:text-amber-400 transition-colors">
                Uploads
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} LearnEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
