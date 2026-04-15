import React from 'react';
import { Sun, Moon, CalendarX, Phone, CalendarCheck, Activity } from 'lucide-react';

const VisitingHours = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Main Wrapper: Matches the max-w-7xl of the Reviews section */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-8 lg:gap-12">
          
          {/* Left Column: Info (Flexible width like a review card) */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div>
              <div className="inline-block px-3 py-1 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full text-xs font-bold tracking-wide uppercase mb-4">
                Schedule
              </div>
              
              <h2 className="text-4xl font-extrabold text-slate-800">
                Visiting <span className="text-[#2A9D8F]">Hours</span>
              </h2>
            </div>
            
            <p className="text-slate-500 leading-relaxed text-lg">
              We are open six days a week and available for urgent consultations 
              during visiting hours. Walk-ins are always welcome.
            </p>

            <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <Activity className="w-5 h-5 text-red-500" />
              <p className="text-sm text-slate-700">
                <span className="font-bold">Special Facility:</span> Urgent Dental X-Ray Available
              </p>
            </div>

            <div className="pt-2">
              <button className="flex items-center gap-2 bg-[#2A9D8F] hover:bg-[#21867a] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#2a9d8f33]">
                <CalendarCheck className="w-5 h-5" />
                Book Appointment
              </button>
            </div>
          </div>

          {/* Right Column: Time Card (Matching the "card" feel of Reviews) */}
          <div className="flex-1 w-full bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
            <div className="space-y-8">
              
              {/* Morning Session */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <Sun className="w-6 h-6 text-amber-500" />
                  </div>
                  <span className="font-bold text-slate-700 text-lg">Morning</span>
                </div>
                <div className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold border border-slate-100">
                  9:00 AM — 2:00 PM
                </div>
              </div>

              {/* Evening Session */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Moon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="font-bold text-slate-700 text-lg">Evening</span>
                </div>
                <div className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold border border-slate-100">
                  4:30 PM — 9:00 PM
                </div>
              </div>

              {/* Holiday */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <CalendarX className="w-6 h-6 text-rose-500" />
                  </div>
                  <span className="font-semibold text-slate-700 text-lg">Holiday</span>
                </div>
                <span className="text-rose-500 font-bold bg-rose-50 px-4 py-1 rounded-full text-sm">Friday (Closed)</span>
              </div>

              {/* Emergency CTA */}
              <div className="mt-8 bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-3 hover:bg-black transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#2A9D8F] group-hover:rotate-12 transition-transform" />
                  <span className="font-medium text-slate-300">Emergency? Call:</span>
                </div>
                <a href="tel:01951029630" className="text-[#2A9D8F] text-xl font-black hover:underline underline-offset-4">
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