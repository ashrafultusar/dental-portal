import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCard from "../../card/serviceCard/ServiceCard";
import { getServicesAction } from "@/lib/data/getService";

interface IService {
  _id: string;
  title: string;
  description: string;
  price: string;
  image?: string;
}

const Services = async () => {
  const rawServices: IService[] = await getServicesAction();

  const servicesData = rawServices.map((srv, index) => ({
    id: index + 1,
    _id: srv._id.toString(),
    title: srv.title,
    description: srv.description,
    price: srv.price,
    image: srv.image || "/placeholder-service.png",
  }));

  const featuredServices = servicesData.slice(0, 6);

  return (
    <section id="services" className="relative py-16 md:py-20 bg-[#F8FBFB] overflow-hidden">
      {/* Decorative Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2A9D8F] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#1D2939] tracking-tight">
            Our Dental <span className="text-[#2A9D8F]">Services</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base md:text-xl">
            We offer a wide range of professional dental treatments to keep your smile healthy and bright.
          </p>
        </div>

        {/* Services Grid: 2 cols mobile, 3 cols medium+ */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 max-w-7xl mx-auto mb-12 md:mb-16">
          {featuredServices.map((service) => (
            <div key={service.id} className="h-full">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Link href="/services">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#1D2939] over:text-white  transition-all shadow-sm hover:shadow-lg font-bold border border-gray-200 rounded-xl hover:bg-[#2A9D8F] cursor-pointer hover:text-white hover:border-[#2A9D8F]   text-sm">
              View All Services 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;