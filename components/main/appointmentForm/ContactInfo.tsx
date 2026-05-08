import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const ContactInfo = () => {
  const details = [
    {
      icon: <MapPin size={24} />,
      label: "Address",
      value:
        "Mirpur 2, opposite to Dhaka Commerce College, Mirpur, Bangladesh, 1216",
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      icon: <Phone size={24} />,
      label: "Phone",
      value: "+8801951029630",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "sabbirdental2021@gmail.com",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: <Clock size={24} />,
      label: "Hours",
      value: "Open daily from 5 PM to 10 PM.",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-[#1D2939] mb-8">
          Contact Information
        </h2>
        <div className="space-y-6">
          {details.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center ${item.color} shrink-0`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  {item.label}
                </p>
                <p className="text-[#1D2939] font-bold text-sm md:text-base">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-8 pl-1">
        <a
          href="https://www.facebook.com/SabbirDentalCare"
          className="text-[#1877F2] hover:opacity-80 transition-opacity"
          aria-label="Facebook Page 1"
        >
          <FaFacebook size={32} />
        </a>
        <a
          href="https://www.facebook.com/drsabbirdentalcare"
          className="text-[#1877F2] hover:opacity-80 transition-opacity"
          aria-label="Facebook Page 2"
        >
          <FaFacebook size={32} />
        </a><a
          href="https://wa.me/+8801951029630" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25D366] hover:opacity-80 transition-opacity"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={35} />
        </a>
      </div>
     

      {/* Google Map */}
      <div className="w-full h-[280px] rounded-[32px] overflow-hidden border border-gray-100 shadow-sm relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.354823073296!2d90.3519785!3d23.8059785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c144f61ef331%3A0x4d9efed87ed6eb9c!2sDr.%20Sabbir%20Dental%20Care!5e0!3m2!1sen!2sbd!4v1778087292198!5m2!1sen!2sbd"
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
