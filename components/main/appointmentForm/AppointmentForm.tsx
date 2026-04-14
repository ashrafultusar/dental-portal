import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const ContactAndAppointment = () => {
  return (
    <section id="contact" className="py-20 bg-[#F8FBFB]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Side: Contact Info & Map */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-[#1D2939] mb-8">Contact Information</h2>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E9F5F3] rounded-full flex items-center justify-center text-[#2A9D8F] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Address</p>
                    <p className="text-[#1D2939] font-bold text-sm md:text-base">House 12, Road 5, Mirpur, Dhaka 1205</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E9F5F3] rounded-full flex items-center justify-center text-[#2A9D8F] shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Phone</p>
                    <p className="text-[#1D2939] font-bold text-sm md:text-base">+880 1700-000000</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E9F5F3] rounded-full flex items-center justify-center text-[#2A9D8F] shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Email</p>
                    <p className="text-[#1D2939] font-bold text-sm md:text-base">info@dentalcare.com</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E9F5F3] rounded-full flex items-center justify-center text-[#2A9D8F] shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Hours</p>
                    <p className="text-[#1D2939] font-bold text-sm md:text-base">Sat–Thu: 9AM–9PM, Fri: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Overlay */}
            <div className="w-full h-[280px] rounded-[32px] overflow-hidden border border-gray-100 shadow-sm relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.62788506894!2d90.3665!3d23.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzM2LjAiTiA5MMKwMjInMDUuNCJF!5e0!3m2!1sen!2sbd!4v1625000000000!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} // Fixed: Changed from "" to {true}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Side: Appointment Form */}
          <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-50 shadow-xl shadow-gray-200/50">
            <h2 className="text-3xl font-bold text-[#1D2939] mb-8">Send a Message</h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2A9D8F] focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                />
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2A9D8F] focus:bg-white transition-all placeholder:text-gray-400 text-sm"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2A9D8F] focus:bg-white transition-all placeholder:text-gray-400 text-sm"
              />
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2A9D8F] focus:bg-white transition-all placeholder:text-gray-400 text-sm"
              />
              <textarea 
                placeholder="Your Message..." 
                rows={5}
                className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:border-[#2A9D8F] focus:bg-white transition-all placeholder:text-gray-400 text-sm resize-none"
              ></textarea>

              <button 
                type="submit" 
                className="w-full py-4 bg-[#2A9D8F] text-white font-bold rounded-xl hover:bg-[#23857a] transition-all text-base shadow-lg shadow-teal-100 flex items-center justify-center gap-2 group"
              >
                Send Message
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactAndAppointment;