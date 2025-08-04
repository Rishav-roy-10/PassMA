import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 text-center text-sm">
      <p>
        &copy; {new Date().getFullYear()} 
        <span className="text-red-500 mx-1">&lt;PassMA/&gt;</span>
        — All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
