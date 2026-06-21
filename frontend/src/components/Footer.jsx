import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} CariMakan. All rights reserved.</p>
        <p className="text-sm mt-2 text-gray-500">Discover your favorite food easily.</p>
      </div>
    </footer>
  );
};

export default Footer;
