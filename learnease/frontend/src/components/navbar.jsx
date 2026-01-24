import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Recommendations", path: "/recommendations" },
    { title: "TimeTable", path: "/timetable" },
    { title: "Uploads", path: "/uploads" },
    { title: "Assignments", path: "/assignments" },
    { title: "Quizzes", path: "/quizzes" },
    { title: "Attendance", path: "/attendance" },
    {title:"Courses",path:"/courselist"},
    { title: "About", path: "/about" }
    
  ];

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-green-600 font-semibold border-b-2 border-green-600 pb-1"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold text-gray-800"
        >
          <img
            src="/design-education-learning-svgrepo-com.svg"
            alt="LearnEase Logo"
            className="w-9 h-7 object-contain"
          />
          <span>LearnEase</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 justify-center flex-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={navLinkClass}
            >
              {link.title}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Desktop Auth */}
          <div className="hidden md:flex">
            <SignedOut>
              <Link
                to="/signin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                {link.title}
              </NavLink>
            ))}

            <div className="pt-2 border-t border-gray-200 flex items-center">
              <SignedOut>
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign In
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="ml-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
