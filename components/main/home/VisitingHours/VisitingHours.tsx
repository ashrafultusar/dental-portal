import React from 'react';
import { Clock, Phone, CalendarCheck, Activity } from 'lucide-react';
import Link from 'next/link';

const VisitingHours = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Column: Text Content */}
          <div className="flex-1 w-full space-y-6">
            <div>
              <div className="inline-block px-3 py-1 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full text-[10px] font-bold tracking-wide uppercase mb-4">
                Schedule
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                Visiting <span className="text-[#2A9D8F]">Hours</span>
              </h2>
            </div>

            <p className="text-slate-500 leading-relaxed text-sm md:text-lg">
              We are open seven days a week, including weekends. Walk-ins are always welcome.
            </p>

            <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-sm">
              <Activity className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-slate-700">
                <span className="font-bold">Special Facility: </span> Always BD&apos;s doctor available
              </p>
            </div>

            <div className="pt-2">
              <Link href={'/appointment'} className="inline-flex items-center justify-center gap-2 bg-[#2A9D8F] hover:bg-[#21867a] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#2a9d8f33]">
                <CalendarCheck className="w-5 h-5" />
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Right Column: Time & Emergency Card */}
          <div className="w-full lg:max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
            {/* Operating Hours Row */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Operating Hours</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">EVERYDAY OPEN</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold border border-emerald-100">
                5:00 PM — 10:00 PM
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-slate-100 mb-8" />

            {/* Emergency Call Box */}
            <div className="bg-[#0f172a] text-white p-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-colors cursor-pointer">
              <Phone className="w-5 h-5 text-[#2A9D8F]" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-sm font-medium text-slate-300">Emergency Call:</span>
                <a href="tel:+8801951029630" className="text-[#2A9D8F] text-lg font-black tracking-tight">
                  +880 1951-029630
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