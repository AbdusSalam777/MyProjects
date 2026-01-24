import React from "react";
import { Link } from "react-router-dom";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { FaGithub, FaEnvelope, FaAddressCard } from "react-icons/fa";
export const Navbar = () => {
  return (
    <nav className="w-full bg-[#1e1e1e] border-b border-gray-700 py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-green-400 text-2xl font-bold">
        CodePlayground
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
        <Link to="/editor" className="text-gray-300 hover:text-white transition-colors">Editor</Link>
        <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
        <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
        <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
        <Link to="/overview" className="text-gray-300 hover:text-white transition-colors">Overview</Link>
        <Link to="/requests" className="text-gray-300 hover:text-white transition-colors">Requests</Link>
        <a
                    href="https://github.com/AbdusSalam777/MERN-Stack-IDE/tree/main"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <FaGithub className="text-lg" /> GitHub
                  </a>
      </div>

      <SignedOut>
        <Link
          to="/sign-in"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          Sign In
        </Link>
      </SignedOut>

      <SignedIn>
        <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
      </SignedIn>
    </nav>
  );
};
