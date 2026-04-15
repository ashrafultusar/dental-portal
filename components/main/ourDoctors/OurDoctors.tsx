import React from 'react';
import Image from 'next/image';
import { getDoctorsAction } from '@/lib/data/getDoctor';

const OurDoctors = async () => {
  const doctorsData = await getDoctorsAction();

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1D2939] mb-4">Meet Our Doctors</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            Experienced and caring professionals dedicated to your dental health.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {doctorsData.map((doctor: any) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Doctor Image Container */}
              <div className="relative aspect-[4/5] w-full bg-gray-100">
                <Image
                  src={doctor.image || "/placeholder-doctor.png"}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Doctor Details */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#1D2939] mb-2">{doctor.name}</h3>

                {/* Badges */}
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
      </div>
    </section>
  );
};

export default OurDoctors;