import React from 'react';
import { Sparkles, Activity, Bone, ArrowRight, Stethoscope, Heart, Syringe } from 'lucide-react';
import ServiceCard from '../../card/serviceCard/ServiceCard';
import { getServicesAction } from '@/lib/data/getService';

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
    case 'activity': return <Activity {...iconProps} />;
    case 'bone': return <Bone {...iconProps} />;
    case 'sparkles': return <Sparkles {...iconProps} />;
    case 'syringe': return <Syringe {...iconProps} />;
    case 'heart': return <Heart {...iconProps} />;
    default: return <Stethoscope {...iconProps} />;
  }
};

const Services = async () => {
  const rawServices: IService[] = await getServicesAction();

  // Transform data backend layout match korar jonne
  const servicesData = rawServices.map((srv, index) => ({
    id: index + 1, // Fix: Ensured id is number to match ServiceCard requirements
    title: srv.title,
    description: srv.description,
    price: srv.price,
    image: srv.image || "/placeholder-service.png",
    icon: renderIcon(srv.icon),
  }));

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
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Bottom View All Button */}
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