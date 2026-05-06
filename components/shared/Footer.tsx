import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0B1A24] text-white pt-16 pb-8 px-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Logo, Description & Socials */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="Dr.Sabbir Dental Care"
              width={45}
              height={45}
              className="object-contain rounded-lg"
              priority
            />
            <span className="text-xl font-bold tracking-tight">
              {" "}
              Dr.Sabbir Dental Care
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Taking care of your smile is our mission. Providing the best dental
            care with modern technology and experienced doctors.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 pt-2">
            {/* Link 1 */}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/SabbirDentalCare"
              className="p-2 bg-[#1e293b] rounded-full hover:bg-[#2A9D8F] transition-all"
            >
              <FaFacebook size={20} />
            </Link>

            {/* Link 2 */}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/drsabbirdentalcare"
              className="p-2 bg-[#1e293b] rounded-full hover:bg-[#2A9D8F] transition-all"
            >
              <FaFacebook size={20} />
            </Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link
                href="/services"
                className="hover:text-[#2A9D8F] transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/doctors"
                className="hover:text-[#2A9D8F] transition-colors"
              >
                Doctors
              </Link>
            </li>
            <li>
              <Link
                href="/reviews"
                className="hover:text-[#2A9D8F] transition-colors"
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                href="/appoinment"
                className="hover:text-[#2A9D8F] transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-6">Contact</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#2A9D8F] shrink-0 mt-1" />
              <span>
                Mirpur 2, opposite to Dhaka Commerce College, Mirpur,
                Bangladesh, 1216
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[#2A9D8F] shrink-0" />
              <span>+8801951-029630</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-[#2A9D8F] shrink-0" />
              <span>sabbirahmedbappa27189@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Hours */}
        <div>
          <h3 className="text-lg font-bold mb-6">Hours</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-[#2A9D8F] shrink-0" />
              <div className="flex flex-col">
                <span>Everyday Open</span>
                <span className="font-bold text-white">5:00 PM – 10:00 PM</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Border & Copyright */}
      <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© 2026 Sabbir Dental. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
