import React from 'react';
import Image from 'next/image';
import { getDoctorsAction } from '@/lib/data/getDoctor';

const AllDoctorsPage = async () => {
  const doctorsData = await getDoctorsAction();

  return (
    <main className="min-h-screen pt-10 pb-20 bg-white">
      <div className="container mx-auto px-6">
        

        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-xl lg:text-4xl font-bold text-[#1D2939] leading-[1.1]">
          All Our <span className="text-[#2A9D8F]">Specialists</span>
          </h2><p className="text-gray-500">আপনার সেবায় নিয়োজিত আমাদের সকল অভিজ্ঞ ডাক্তারবৃন্দ।</p>
        </div>

       

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {doctorsData.map((doctor: any) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] w-full bg-gray-100">
                <Image
                  src={doctor.image || "/placeholder-doctor.png"}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#1D2939] mb-2">{doctor.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#E9F5F3] text-[#2A9D8F] text-[10px] font-bold rounded-lg border border-[#D1E9E5]">
                    {doctor.specialty}
                  </span>
                  <span className="text-gray-400 text-[10px] font-medium">
                    {doctor.experience}
                  </span>
                </div>

                <p className="text-gray-500 text-[12px] leading-relaxed">
                  {doctor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {doctorsData.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No doctors found at the moment.
          </div>
        )}
      </div>
    </main>
  );
};

export default AllDoctorsPage;