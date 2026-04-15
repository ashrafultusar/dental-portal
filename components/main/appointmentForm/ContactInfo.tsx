import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  const details = [
    {
      icon: <MapPin size={24} />,
      label: "Address",
      value: "House 12, Road 5, Mirpur, Dhaka 1205",
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      icon: <Phone size={24} />,
      label: "Phone",
      value: "+880 1700-000000",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "info@dentalcare.com",
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      icon: <Clock size={24} />,
      label: "Hours",
      value: "Sat–Thu: 9AM–9PM, Fri: Closed",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-[#1D2939] mb-8">Contact Information</h2>
        <div className="space-y-6">
          {details.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center ${item.color} shrink-0`}>
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                <p className="text-[#1D2939] font-bold text-sm md:text-base">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-[280px] rounded-[32px] overflow-hidden border border-gray-100 shadow-sm relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.328233583!2d90.3665091!3d23.8069293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d6f6b8c2ff%3A0x3b131e548c10e3f8!2sMirpur%2010!5e0!3m2!1sen!2sbd!4v1712800000000!5m2!1sen!2sbd" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true}
          loading="lazy"
          title="Dental Care Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfo;