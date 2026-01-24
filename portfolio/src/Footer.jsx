import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-700 pb-6">
          <h2 className="text-xl font-semibold text-white">Abdus.dev</h2>
          <nav className="flex gap-6">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/projects" className="hover:text-white transition">Projects</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </nav>
          <div className="flex gap-4 text-xl">
            <a href="https://github.com/AbdusSalam777/MyProjects" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/abdus-salam-a42a57341/" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Abdus.dev — All rights reserved.</p>
          <p>Built with <span className="font-bold">passion</span> using React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
