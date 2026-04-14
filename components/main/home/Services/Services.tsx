import React from 'react';
import { Sparkles, ShieldCheck, Stethoscope, ArrowRight } from 'lucide-react';

const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Teeth Cleaning",
      description: "Professional deep cleaning to remove plaque and tartar, keeping your teeth healthy and bright.",
      price: "৳1,500",
      icon: <Sparkles className="text-[#2A9D8F]" size={24} />,
    },
    {
      id: 2,
      title: "Root Canal",
      description: "Pain-free root canal treatment using modern technology to save your natural teeth.",
      price: "৳8,000",
      icon: <ShieldCheck className="text-[#2A9D8F]" size={24} />,
    },
    {
      id: 3,
      title: "Dental Implants",
      description: "Permanent tooth replacement with titanium implants that look and feel natural.",
      price: "৳35,000",
      icon: <Stethoscope className="text-[#2A9D8F]" size={24} />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#F8FBFB]">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1D2939] mb-4">Our Services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We provide comprehensive dental care with the latest technology and techniques.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-[#F0F9F8] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2A9D8F] group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1D2939] mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="text-2xl font-bold text-[#2A9D8F]">
                {service.price}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#1D2939] font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            View All Services <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;