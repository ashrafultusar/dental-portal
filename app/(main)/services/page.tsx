import React from 'react';
import { getServicesAction } from '@/lib/data/getService';

import { Activity, Bone, Sparkles, Syringe, Heart, Stethoscope } from 'lucide-react';
import ServiceCard from '@/components/main/card/serviceCard/ServiceCard';

// আইকন রেন্ডার ফাংশনটি আপনি একটি আলাদা ইউটিল ফাইল-এ রাখতে পারেন কোড ডুপ্লিকেশন এড়াতে
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

const AllServicesPage = async () => {
  const rawServices = await getServicesAction();

  return (
    <main className="min-h-screen pt-10 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl text-black font-bold text-center mb-12">All Dental Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rawServices.map((srv: any, index: number) => (
            <ServiceCard 
              key={srv._id} 
              service={{
                id: index + 1,
                title: srv.title,
                description: srv.description,
                price: srv.price,
                image: srv.image || "/placeholder-service.png",
                icon: renderIcon(srv.icon)
              }} 
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllServicesPage;