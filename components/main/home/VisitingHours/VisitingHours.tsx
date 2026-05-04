import React from 'react';
import { Sun, Moon, CalendarX, Phone, CalendarCheck, Activity } from 'lucide-react';
import Link from 'next/link';

const VisitingHours = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8 lg:gap-12">
          
          {/* Left Column: Info */}
          <div className="flex-1 w-full flex flex-col justify-center space-y-6">
            <div>
              <div className="inline-block px-3 py-1 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full text-[10px] font-bold tracking-wide uppercase mb-4">
                Schedule
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                Visiting <span className="text-[#2A9D8F]">Hours</span>
              </h2>
            </div>
            
            <p className="text-slate-500 leading-relaxed text-sm md:text-lg">
              We are open six days a week and available for urgent consultations during visiting hours. Walk-ins are always welcome.
            </p>

            <div className="flex items-center gap-3 p-3 md:p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <Activity className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-xs md:text-sm text-slate-700">
                <span className="font-bold">Special Facility:</span> Urgent Dental X-Ray Available
              </p>
            </div>

            <div className="pt-2">
              <Link href={'/appoinment'} className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#2A9D8F] hover:bg-[#21867a] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#2a9d8f33] text-sm md:text-base">
                <CalendarCheck className="w-4 h-4 md:w-5 md:h-5" />
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Right Column: Time Card */}
          <div className="flex-1 w-full bg-white p-5 md:p-10 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
            <div className="space-y-6">
              
              {/* Morning Session */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <Sun className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm md:text-lg">Morning</span>
                </div>
                <div className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[11px] md:text-sm font-bold border border-slate-100 whitespace-nowrap">
                  9:00 AM — 2:00 PM
                </div>
              </div>

              {/* Evening Session */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Moon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm md:text-lg">Evening</span>
                </div>
                <div className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[11px] md:text-sm font-bold border border-slate-100 whitespace-nowrap">
                  4:30 PM — 9:00 PM
                </div>
              </div>

              {/* Holiday */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <CalendarX className="w-5 h-5 text-rose-500" />
                  </div>
                  <span className="font-semibold text-slate-700 text-sm md:text-lg">Holiday</span>
                </div>
                <span className="text-rose-500 font-bold bg-rose-50 px-3 py-1 rounded-full text-[10px] md:text-xs whitespace-nowrap">
                  Friday (Closed)
                </span>
              </div>

              {/* Emergency CTA */}
              <div className="mt-6 bg-slate-900 text-white p-3 md:p-5 rounded-2xl flex flex-col items-center justify-center gap-2 md:flex-row md:gap-3 hover:bg-black transition-colors cursor-pointer group">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#2A9D8F]" />
                  <span className="text-[11px] md:text-sm font-medium text-slate-300">Emergency Call:</span>
                </div>
                <a href="tel:01951029630" className="text-[#2A9D8F] text-base md:text-xl font-black hover:underline underline-offset-4">
                  01951-029630
                </a>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default VisitingHours;