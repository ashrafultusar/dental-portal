import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B1A24] text-white pt-16 pb-8 px-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Column 1: Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-[#2A9D8F] text-white font-bold rounded-lg">
              D
            </div>
            <span className="text-xl font-bold tracking-tight"> Sabbir Dental</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            আপনার হাসির যত্ন নেওয়া আমাদের কাজ। আধুনিক প্রযুক্তি ও অভিজ্ঞ ডাক্তারদের সাথে সেরা ডেন্টাল সেবা।
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-[#2A9D8F] transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-[#2A9D8F] transition-colors">Doctors</a></li>
            <li><a href="#" className="hover:text-[#2A9D8F] transition-colors">Reviews</a></li>
            <li><a href="#" className="hover:text-[#2A9D8F] transition-colors">About</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-6">Contact</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-gray-500" />
              <span>Dhanmondi, Dhaka</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gray-500" />
              <span>+880 1700-000000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gray-500" />
              <span>info@sabbirdental.com</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Hours */}
        <div>
          <h3 className="text-lg font-bold mb-6">Hours</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-gray-500" />
              <span>Sat–Thu: 9AM–9PM</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-gray-500" />
              <span>Friday: Closed</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Border & Copyright */}
      <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© 2026  Sabbir Dental. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;