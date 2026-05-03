"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Doctors", href: "/doctors" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/appoinment" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
        <Image
            src="/assets/logo.jpg"
            alt="Dr.Sabbir Dental Care"
            width={45}
            height={45}
            className="object-contain rounded-lg"
            priority // Optimizes loading for navbar elements
          />
          <span className="text-xl text-black font-bold tracking-tight">
            Dr.Sabbir Dental Care
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`font-medium transition-all ${
                  isActive(link.href)
                    ? "text-[#2A9D8F] font-bold border-b-2 border-[#2A9D8F]"
                    : "text-[#667085] hover:text-[#2A9D8F]"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth & Action Buttons */}
        <div className="flex items-center gap-4">
          {session?.user?.role === "admin" && (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/dental-staff-portal"
                className="flex items-center gap-2 px-5 py-2.5 font-semibold border border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-xl hover:bg-[#2A9D8F] hover:text-white transition-all shadow-sm"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}

<a
  href="https://wa.me/8801951029630" 
  target="_blank"
  rel="noopener noreferrer"
  // নিচের ক্লাসটি দেখুন: hover:bg-[#2A9D8F] যোগ করেছি
  className="group relative flex items-center gap-2 px-6 py-2.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#2A9D8F] transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.4)]"
>
  <svg 
    className="w-5 h-5" 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zM6.54 15.549c.21.127.427.241.653.342.301.133.619.201.942.201.328 0 .653-.072.966-.214.316-.143.601-.345.852-.601.252-.256.452-.563.593-.909.141-.347.212-.716.212-1.096 0-.38-.071-.749-.212-1.096-.141-.347-.341-.654-.593-.909-.252-.256-.536-.458-.852-.601-.313-.142-.638-.214-.966-.214-.323 0-.641.068-.942.201-.226.101-.443.215-.653.342-.259.157-.492.36-.694.601-.202.241-.358.514-.462.812-.104.298-.156.611-.156.926 0 .315.052.628.156.926.104.298.26.571.462.812.202.241.435.444.694.601z" />
  </svg>
  
  <span className="hidden xs:block">Chat on WhatsApp</span>
</a>

          <button
            className="lg:hidden p-2 text-gray-600 cursor-pointer"
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
          <span className="font-bold text-black">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex text-black cursor-pointer items-center gap-2 px-3 py-1.5 border rounded-lg text-sm"
          >
            Close <X size={18} />
          </button>
        </div>
        <ul className="p-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block p-4 rounded-xl font-medium ${
                  isActive(link.href)
                    ? "bg-[#2A9D8F]/10 text-[#2A9D8F]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {session?.user?.role === "admin" && (
            <li className="mt-4 border-t pt-4">
              <div className="flex flex-col gap-2">
                <Link
                  href="/dental-staff-portal"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-4 text-[#2A9D8F] font-semibold hover:bg-[#2A9D8F]/5 rounded-xl"
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 p-4 text-red-500 font-semibold hover:bg-red-50 rounded-xl cursor-pointer"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default LandingNavbar;