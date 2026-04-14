import React from 'react';
import { Users, Award, Clock } from 'lucide-react';

const Stats = () => {
  const statsData = [
    {
      id: 1,
      icon: <Users size={32} className="text-[#2A9D8F]" />,
      number: "10,000+",
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
    <section className="py-12 bg-[#F8FBFB]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-3 bg-[#F0F9F8] rounded-full">
                {item.icon}
              </div>
              <h3 className="text-3xl font-bold text-[#1D2939] mb-1">
                {item.number}
              </h3>
              <p className="text-gray-500 font-medium">
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