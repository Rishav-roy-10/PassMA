import React from 'react';
import githubLogo from '../assets/github.png'; // adjust path if needed

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16 py-4 h-16">
        
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <span className="text-red-500">&lt;</span>
          Pass
          <span className="text-red-500">MA</span>
          <span className="text-red-500">/&gt;</span>
        </div>


        {/* GitHub Button */}
        <a href="https://github.com/Rishav-roy-10" target="_blank" rel="noopener noreferrer">
          <img
            src={githubLogo}
            alt="GitHub"
            className="w-8 h-8 hover:opacity-50 transition"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
