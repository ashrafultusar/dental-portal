"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, CheckCircle2, Phone, Users, Award, Clock, 
  Sparkles, ShieldCheck, Stethoscope, Star, MapPin, Mail, Menu, X 
} from 'lucide-react';

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
    <div className="font-sans text-[#1D2939] bg-white">
      
      {/* --- NAVBAR --- */}
      <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-[#2A9D8F] text-white font-bold text-xl rounded-lg">D</div>
            <span className="text-xl font-bold tracking-tight">Sabbir Dental</span>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-[#667085] font-medium hover:text-[#2A9D8F] transition-colors">{link.name}</Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-6 py-2.5 font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">Admin</button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#2A9D8F] text-white font-semibold rounded-xl hover:bg-[#23857a] transition-all shadow-sm">
              <Phone size={18} fill="currentColor" />
              <span className="hidden xs:block">Book Now</span>
            </button>
            <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(true)}><Menu size={28} /></button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsMenuOpen(false)} />
        <div className={`fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-2xl transform transition-transform duration-500 lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 flex justify-between items-center border-b">
            <span className="font-bold">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm">
              Close <X size={18} />
            </button>
          </div>
          <ul className="p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} onClick={() => setIsMenuOpen(false)} className="block p-4 hover:bg-gray-50 rounded-xl font-medium text-gray-600">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="py-16 lg:py-24 bg-[#F8FBFB]">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-[#E9F5F3] text-[#2A9D8F] rounded-full text-sm font-bold border border-[#D1E9E5]">#1 Dental Clinic in Dhaka</div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">Your Smile, <span className="text-[#2A9D8F]">Our Passion</span></h1>
            <p className="text-gray-500 text-lg max-w-lg">আধুনিক প্রযুক্তি ও অভিজ্ঞ ডাক্তারদের সাথে সেরা ডেন্টাল সেবা পান। আপনার হাসি আমাদের অঙ্গীকার।</p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-[#2A9D8F] text-white font-bold rounded-xl flex items-center gap-2 hover:shadow-lg transition-all">Book Appointment <ArrowRight size={20}/></button>
              <button className="px-8 py-4 bg-white border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all">Our Services</button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl aspect-square relative">
              <Image src="/assets/hero-doctor.jpg" alt="Doctor" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border animate-bounce">
              <div className="w-12 h-12 bg-[#E9F5F3] rounded-full flex items-center justify-center text-[#2A9D8F]"><Phone size={24} fill="currentColor"/></div>
              <div><p className="text-xs text-gray-400 font-bold">Emergency?</p><p className="font-bold">+880 1700-000000</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (Half Size) --- */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Users size={24}/>, num: "10,000+", label: "Happy Patients" },
              { icon: <Award size={24}/>, num: "15+", label: "Years Experience" },
              { icon: <Clock size={24}/>, num: "24/7", label: "Emergency Care" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-3 p-2.5 bg-[#F0F9F8] rounded-full text-[#2A9D8F]">{item.icon}</div>
                <h3 className="text-2xl font-bold text-[#1D2939]">{item.num}</h3>
                <p className="text-gray-500 text-xs font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-20 bg-[#F8FBFB]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto">We provide comprehensive dental care with the latest technology and techniques.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Teeth Cleaning", price: "৳1,500", icon: <Sparkles />, desc: "Professional deep cleaning to remove plaque and tartar." },
              { title: "Root Canal", price: "৳8,000", icon: <ShieldCheck />, desc: "Pain-free root canal treatment using modern technology." },
              { title: "Dental Implants", price: "৳35,000", icon: <Stethoscope />, desc: "Permanent tooth replacement with natural feel." }
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-50 text-left hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-[#F0F9F8] rounded-xl flex items-center justify-center text-[#2A9D8F] mb-6 group-hover:bg-[#2A9D8F] group-hover:text-white transition-all">{s.icon}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{s.desc}</p>
                <div className="text-2xl font-bold text-[#2A9D8F]">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DOCTORS SECTION --- */}
      <section id="doctors" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Meet Our Doctors</h2>
          <p className="text-gray-500 mb-12 text-sm">Experienced professionals dedicated to your health.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { name: "Dr. Rahim Uddin", role: "Oral Surgery", exp: "15 years", img: "/assets/dr1.jpg" },
              { name: "Dr. Fatima Akter", role: "Orthodontics", exp: "10 years", img: "/assets/dr2.jpg" },
              { name: "Dr. Kamal Hossain", role: "Endodontics", exp: "12 years", img: "/assets/dr3.jpg" },
              { name: "Dr. Nusrat Jahan", role: "Pediatric", exp: "8 years", img: "/assets/dr4.jpg" }
            ].map((dr, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all text-left">
                <div className="relative aspect-[4/5] bg-gray-100">
                  <Image src={dr.img} alt={dr.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{dr.name}</h3>
                  <div className="flex gap-2 items-center">
                    <span className="px-2 py-1 bg-[#E9F5F3] text-[#2A9D8F] text-[10px] font-bold rounded-md">{dr.role}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{dr.exp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section id="reviews" className="py-20 bg-[#F8FBFB]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Patient Reviews</h2>
          <p className="text-gray-400 mb-12 text-sm">শুনুন আমাদের রোগীরা কি বলছেন।</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Aminul Islam", text: "অসাধারণ সেবা! Dr. Rahim খুবই দক্ষ এবং যত্নশীল।", service: "Root Canal", star: 5 },
              { name: "Sharmin Sultana", text: "আমার বাচ্চার জন্য best dental clinic! Dr. Nusrat অনেক friendly।", service: "Pediatric", star: 5 },
              { name: "Rafiqul Alam", text: "Teeth whitening এর result দেখে আমি অনেক happy।", service: "Whitening", star: 4 }
            ].map((r, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-50 text-left flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} fill={idx < r.star ? "#2A9D8F" : "none"} className={idx < r.star ? "text-[#2A9D8F]" : "text-gray-200"} />
                    ))}
                  </div>
                  <p className="text-[#1D2939] text-sm leading-relaxed mb-8 font-medium italic">{r.text}</p>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <div><h4 className="font-bold text-sm">{r.name}</h4><p className="text-[10px] text-gray-400">2026-03-15</p></div>
                  <span className="text-[9px] font-bold px-2 py-1 bg-gray-50 rounded-full border">{r.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & APPOINTMENT --- */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            <div className="space-y-10">
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E9F5F3] rounded-full flex items-center justify-center text-[#2A9D8F]"><MapPin /></div>
                  <div><p className="text-xs text-gray-400 font-bold">Address</p><p className="font-bold">House 12, Road 5, Dhanmondi, Dhaka</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E9F5F3] rounded-full flex items-center justify-center text-[#2A9D8F]"><Phone /></div>
                  <div><p className="text-xs text-gray-400 font-bold">Phone</p><p className="font-bold">+880 1700-000000</p></div>
                </div>
              </div>
              <div className="w-full h-[280px] rounded-[32px] overflow-hidden border">
                <iframe src="https://www.google.com/maps/embed?..." width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" />
              </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50">
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <input type="text" placeholder="Your Name" className="w-full px-6 py-4 bg-[#F9FAFB] border rounded-xl focus:border-[#2A9D8F] outline-none" />
                  <input type="text" placeholder="Phone" className="w-full px-6 py-4 bg-[#F9FAFB] border rounded-xl focus:border-[#2A9D8F] outline-none" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-[#F9FAFB] border rounded-xl focus:border-[#2A9D8F] outline-none" />
                <textarea placeholder="Your Message..." rows={4} className="w-full px-6 py-4 bg-[#F9FAFB] border rounded-xl focus:border-[#2A9D8F] outline-none resize-none" />
                <button className="w-full py-4 bg-[#2A9D8F] text-white font-bold rounded-xl shadow-lg hover:bg-[#23857a] transition-all flex items-center justify-center gap-2">
                  Send Message <ArrowRight size={18}/>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0B1B2B] text-white py-12">
        <div className="container mx-auto px-6 text-center border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-sm">© 2026 Sabbir Dental Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;