import React from "react";
import { Users, Award, Clock } from "lucide-react";

const Stats = () => {
  const statsData = [
    {
      id: 1,
      icon: <Users size={32} className="text-[#2A9D8F]" />, // সাইজ কিছুটা বাড়ানো হয়েছে
      number: "5000+",
      label: "Happy Patients",
    },
    {
      id: 2,
      icon: <Award size={32} className="text-[#2A9D8F]" />,
      number: "15+",
      label: "Years Experience",
    },
    {
      id: 3,
      icon: <Clock size={32} className="text-[#2A9D8F]" />,
      number: "24/7",
      label: "Emergency Care",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#F8FBFB] to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Grid: Small device 2 cols, Medium+ 3 cols */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {statsData.map((item) => (
            <div
              key={item.id}
              className="group bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(42,157,143,0.15)] hover:-translate-y-2 hover:border-[#2A9D8F]/20 flex flex-col items-center text-center"
            >
              {/* Icon container with glowing effect */}
              <div className="mb-5 p-4 bg-[#E9F5F3] rounded-2xl group-hover:bg-[#2A9D8F] group-hover:text-white transition-colors duration-300">
                {/* React.cloneElement ব্যবহার করে icon-এর রঙ ডাইনামিক করা হয়েছে hover এর জন্য */}
                {React.cloneElement(item.icon, {
                  className: "text-[#2A9D8F] group-hover:text-white transition-colors duration-300",
                })}
              </div>

              {/* Number styling */}
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#1D2939] mb-2 tracking-tight">
                {item.number}
              </h3>

              {/* Label styling */}
              <p className="text-sm md:text-lg text-gray-500 font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;