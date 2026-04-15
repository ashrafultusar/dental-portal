"use client";

import {
  LayoutDashboard,
  Stethoscope,
  CalendarCheck,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Star,
  Settings,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

const mainMenuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dental-staff-portal",
  },
  {
    name: "Manage Doctors",
    icon: Stethoscope,
    href: "/dental-staff-portal/doctor",
  },
  {
    name: "Manage Services",
    icon: Settings,
    href: "/dental-staff-portal/services",
  },
  {
    name: "Patient Reviews",
    icon: Star,
    href: "/dental-staff-portal/review",
  },

  {
    name: "Adminastation",
    icon: CalendarCheck,
    href: "/dental-staff-portal/adminastation",
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* --- 1. MOBILE TOP NAV --- */}
      <div className="lg:hidden flex items-center justify-between px-5 py-4 bg-[#0f172a] text-white sticky top-0 z-[60] shadow-md w-full border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-teal-500 p-1.5 rounded-lg">
            <Stethoscope size={20} className="text-white" />
          </div>
          <span className="font-bold tracking-tight">DENTAL STAFF</span>
        </div>

        <button
          className="p-2 hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* --- 2. MAIN SIDEBAR --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[100]
          bg-[#0f172a] text-slate-400
          border-r border-white/5
          transition-all duration-300 ease-in-out
          
          /* Desktop */
          lg:static lg:translate-x-0 
          ${isOpen ? "lg:w-72" : "lg:w-[88px]"}
          
          /* Mobile Slider */
          w-72 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full relative">
          <button
            className="lg:hidden absolute right-4 top-6 text-white p-1 hover:bg-white/10 rounded"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={24} />
          </button>

          {/* Sidebar Logo Section */}
          <div className="relative flex items-center h-20 px-6 mb-4 mt-2">
            <div className="bg-teal-500 p-2.5 rounded-xl shrink-0 shadow-lg shadow-teal-500/20">
              <Stethoscope size={26} className="text-white" />
            </div>
            <div
              className={`ml-4 transition-all duration-300 ${
                !isOpen
                  ? "lg:opacity-0 lg:invisible lg:w-0"
                  : "opacity-100 visible"
              }`}
            >
              <h1 className="text-lg font-black text-white leading-none">
                DENTAL<span className="text-teal-400">STAFF</span>
              </h1>
              <p className="text-[10px] text-teal-500 font-bold uppercase tracking-[1px] mt-1">
                Admin Portal
              </p>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:flex absolute -right-3 top-9 bg-teal-500 text-white rounded-full p-1.5 border-2 border-[#0f172a] hover:scale-110 transition-transform"
            >
              {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4">
            <p
              className={`text-[10px] uppercase tracking-[2px] text-slate-500 mb-4 mt-6 px-4 font-bold ${
                !isOpen && "lg:hidden"
              }`}
            >
              Main Menu
            </p>
            <nav className="space-y-2">
              {mainMenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`group relative flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                        : "hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon
                      size={22}
                      className={`shrink-0 ${
                        isActive ? "text-white" : "group-hover:text-teal-400"
                      }`}
                    />
                    <span
                      className={`transition-all duration-300 whitespace-nowrap ${
                        !isOpen
                          ? "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                          : "opacity-100"
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* Collapsed Tooltip */}
                    {!isOpen && (
                      <div className="hidden lg:block absolute left-20 bg-teal-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-8 border-t border-white/5 pt-6">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="group relative flex items-center justify-start w-full gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-red-500/10 hover:text-red-500"
              >
                <LogOut
                  size={22}
                  className="shrink-0 text-slate-400 group-hover:text-red-500 transition-colors"
                />
                <span
                  className={`transition-all duration-300 font-bold ${
                    !isOpen
                      ? "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                      : "opacity-100"
                  }`}
                >
                  Log Out
                </span>

                {/* Collapsed Tooltip */}
                {!isOpen && (
                  <div className="hidden lg:block absolute left-20 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    Log Out
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-[#0f172a]/80 z-[80] lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
