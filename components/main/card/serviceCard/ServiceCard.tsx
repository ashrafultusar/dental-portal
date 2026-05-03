import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Info, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: number | string;
    _id: string;
    title: string;
    description: string;
    price: string | number;
    image: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group relative bg-white rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#E6F4F1]/30 opacity-50 -z-10" />

      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-6 border border-slate-200 bg-slate-50">
        <Image
          src={service.image || "/placeholder-service.png"}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        
        {/* Price Badge - Compact for mobile */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#0F8C75] text-white rounded-full px-2 py-0.5 md:px-2 md:py-1 flex items-center gap-1 shadow-md">
          <span className="text-xs md:text-sm font-bold">৳{service.price}</span>
          <span className="text-[8px] md:text-[10px]">🦷</span>
        </div>
      </div>

      {/* Content Area - Adjusted for tight space */}
      <div className="space-y-1.5 md:space-y-2.5 mb-4 md:mb-8 text-center px-1">
        <h3 className="text-sm md:text-xl font-bold md:font-extrabold text-[#111827] leading-tight line-clamp-1">
          {service.title}
        </h3>
        <p className="text-[10px] md:text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-2 mt-auto">
        <Link 
          href={`/services/${service._id}`}
          className="flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[10px] md:text-sm rounded-lg md:rounded-xl py-2 md:py-3 transition-colors"
        >
          <Info size={12} className="md:hidden" />
          <Info size={16} className="hidden md:block" />
          Details
        </Link>
        
        <Link 
          href={`/appointment`}
          className="relative flex items-center justify-center gap-1 bg-[#0F8C75] hover:bg-[#0A6B59] text-white font-bold text-[10px] md:text-sm rounded-lg md:rounded-xl py-2 md:py-3 shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          <CalendarDays size={12} className="md:hidden" />
          <CalendarDays size={16} className="hidden md:block" />
          Book
          <ArrowRight size={12} className="hidden md:block" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;