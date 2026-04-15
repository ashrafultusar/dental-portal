import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceProps {
  service: {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    icon: React.ReactNode;
  };
}

const ServiceCard: React.FC<ServiceProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center overflow-hidden group">
      
      {/* Image & Price Section */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={service.id <= 3}
        />
        {/* Blue Price Bar - Matching the Image */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0E5B96] py-3 text-white font-bold text-xl flex items-center justify-center gap-1 z-10">
          <span>৳{service.price}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 pt-10 flex flex-col items-center">
        {/* Icon Circle - Matching the light blue/white style in image */}
        <div className="w-20 h-20 bg-[#EBF5FF] rounded-full flex items-center justify-center mb-6 ring-8 ring-[#F8FBFF]">
            {/* এখানে icon-টি pass করার সময় color ও size খেয়াল রাখবেন */}
            <div className="text-[#1E74B5]">
                {service.icon}
            </div>
        </div>

        <h3 className="text-2xl font-extrabold text-[#111827] mb-4">
          {service.title}
        </h3>
        
        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-[280px]">
          {service.description}
        </p>

        {/* Learn More Button - Light Blue Pill Shape */}
        <Link href={'/appoinment'} className="flex items-center gap-2 px-10 py-3 bg-[#EBF5FF] text-[#0E5B96] font-bold rounded-full hover:bg-[#0E5B96] hover:text-white transition-all duration-300">
          Booking <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;