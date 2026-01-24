
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-sm py-2 shadow-lg' : 'bg-gray-900/80 py-3'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Abdus.dev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/skills" 
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Skills
            </Link>
            <Link 
              to="/projects" 
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Projects
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-cyan-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fadeIn">
            <Link 
              to="/" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-800"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/skills" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-800"
              onClick={toggleMenu}
            >
              Skills
            </Link>
            <Link 
              to="/projects" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-800"
              onClick={toggleMenu}
            >
              Projects
            </Link>
            <Link 
              to="/contact" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-800"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
