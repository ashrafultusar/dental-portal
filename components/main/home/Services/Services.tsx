import React from "react";
import Link from "next/link"; // লিঙ্ক ইমপোর্ট করুন
import {
  Sparkles,
  Activity,
  Bone,
  ArrowRight,
  Stethoscope,
  Heart,
  Syringe,
} from "lucide-react";
import ServiceCard from "../../card/serviceCard/ServiceCard";
import { getServicesAction } from "@/lib/data/getService";

interface IService {
  _id: string;
  title: string;
  description: string;
  price: string;
  image?: string;
  icon?: string;
}

const renderIcon = (iconName?: string) => {
  const iconProps = { size: 24 };
  switch (iconName?.toLowerCase()) {
    case "activity":
      return <Activity {...iconProps} />;
    case "bone":
      return <Bone {...iconProps} />;
    case "sparkles":
      return <Sparkles {...iconProps} />;
    case "syringe":
      return <Syringe {...iconProps} />;
    case "heart":
      return <Heart {...iconProps} />;
    default:
      return <Stethoscope {...iconProps} />;
  }
};

const Services = async () => {
  const rawServices: IService[] = await getServicesAction();

  const servicesData = rawServices.map((srv, index) => ({
    id: index + 1,
    title: srv.title,
    description: srv.description,
    price: srv.price,
    image: srv.image || "/placeholder-service.png",
    icon: renderIcon(srv.icon),
  }));

  // হোম পেজে হয়তো শুধু প্রথম ৩ বা ৬টি সার্ভিস দেখাবেন
  const featuredServices = servicesData.slice(0, 6);

  return (
    <section id="services" className="py-20 bg-[#F8FBFB]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-7xl font-bold text-[#1D2939] leading-[1.1]">
            Our <span className="text-[#2A9D8F]">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="flex justify-center">
          {/* এখানে Link ব্যবহার করা হয়েছে */}
          <Link href="/services">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#1D2939] font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
              View All Services <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
