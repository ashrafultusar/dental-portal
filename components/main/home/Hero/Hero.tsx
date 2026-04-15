import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import styles from './Hero.module.css'; // Module import kora holo

const Hero = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center bg-[#F8FBFB] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F5F3] text-[#2A9D8F] text-sm font-medium border border-[#D1E9E5]">
            <span className="text-base">🦷</span> #1 Dental Clinic in Dhaka
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-[#1D2939] leading-[1.1]">
            Your Smile, <span className="text-[#2A9D8F]">Our Passion</span>
          </h1>

          <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
            আধুনিক প্রযুক্তি ও অভিজ্ঞ ডাক্তারদের সাথে সেরা ডেন্টাল সেবা পান। আপনার হাসি আমাদের অঙ্গীকার।
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-8 py-4 bg-[#2A9D8F] text-white font-bold rounded-xl hover:bg-[#23857a] transition-all shadow-lg shadow-teal-100">
              Book Appointment <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white text-[#1D2939] font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
              Our Services
            </button>
          </div>

          {/* Features Checklist */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <CheckCircle2 size={18} className="text-[#2A9D8F]" /> Pain-free treatments
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <CheckCircle2 size={18} className="text-[#2A9D8F]" /> Modern equipment
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <CheckCircle2 size={18} className="text-[#2A9D8F]" /> Expert doctors
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full max-w-[550px] aspect-square rounded-[40px] overflow-hidden shadow-2xl">
            <Image 
              src="/assets/galery/hero.jpeg"
              alt="Modern Dental Office"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Emergency Badge Overlay - Module Class Apply kora holo */}
          <div className={`${styles.emergencyBadge} absolute -bottom-6 -left-6 md:left-0 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4 z-20`}>
            <div className="w-12 h-12 bg-[#E9F5F3] rounded-full flex items-center justify-center text-[#2A9D8F]">
              <Phone size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Emergency?</p>
              <p className="text-base font-bold text-[#1D2939]">+880 1700-000000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#2A9D8F] opacity-[0.03] rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;