"use client"; // Next.js bebohar korle eti proyojon

import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "Services", href: "#services" },
    { name: "Doctors", href: "#doctors" },
    { name: "Reviews", href: "#reviews" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 font-sans sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Left: Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-[#2A9D8F] text-white font-bold text-xl rounded-lg">
            D
          </div>
          <span className="text-xl font-bold text-[#1D2939] tracking-tight">
            Sabbir Dental
          </span>
        </div>

        {/* Middle: Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className={link.active 
                  ? "px-4 py-2 bg-[#E9F5F3] text-[#2A9D8F] font-semibold rounded-lg" 
                  : "text-[#667085] font-medium hover:text-[#2A9D8F] transition-colors"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block px-6 py-2.5 text-[#1D2939] font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
            Admin
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#2A9D8F] text-white font-semibold rounded-xl hover:bg-[#23857a] transition-all shadow-sm">
            <Phone size={18} fill="currentColor" />
            <span className="hidden xs:block">Book Now</span>
          </button>

          {/* Mobile Menu Icon */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Section */}
      {/* Overlay - Background jhapsha korar jonno */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar - Animation slide from right */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-10">
            <span className="text-xl font-bold text-[#2A9D8F]">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-50 rounded-full">
              <X size={20} />
            </button>
          </div>

          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium block ${
                    link.active ? "text-[#2A9D8F]" : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-6 border-t border-gray-100">
               <button className="w-full px-6 py-3 text-[#1D2939] font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">
                Admin Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;