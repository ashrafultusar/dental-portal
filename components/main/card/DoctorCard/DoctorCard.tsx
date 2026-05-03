import React from 'react';
import Image from 'next/image';

interface DoctorCardProps {
  doctor: {
    _id: string;
    image: string;
    name: string;
    specialty: string;
    experience: string;
    description: string;
  };
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
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

        <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-2">
          {doctor.description}
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;