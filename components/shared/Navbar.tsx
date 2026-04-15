"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Doctors", href: "#doctors" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-[#2A9D8F] text-white font-bold text-xl rounded-lg">
            D
          </div>
          <span className="text-xl text-black font-bold tracking-tight">
            Sabbir Dental
          </span>
        </div>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-[#667085] font-medium hover:text-[#2A9D8F] transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block px-6 py-2.5 font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 text-black transition-all">
            Admin
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#2A9D8F] text-white font-semibold rounded-xl hover:bg-[#23857a] transition-all shadow-sm">
            <Phone size={18} fill="currentColor" />
            <span className="hidden xs:block">Book Now</span>
          </button>
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-2xl transform transition-transform duration-500 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <span className="font-bold">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm"
          >
            Close <X size={18} />
          </button>
        </div>
        <ul className="p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block p-4 hover:bg-gray-50 rounded-xl font-medium text-gray-600"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default LandingPage;
