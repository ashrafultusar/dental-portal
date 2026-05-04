import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DoctorCardProps {
  doctor: {
    _id: string;
    image?: string;
    name: string;
    specialty?: string;
    experience?: string;
    description?: string;
    university?: string;
  };
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Link href={`/doctors/${doctor._id}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-shadow">
        {/* Doctor Image Container */}
        <div className="relative aspect-[4/5] w-full bg-gray-100 overflow-hidden">
          <Image
            src={doctor.image || "/placeholder-doctor.png"}
            alt={doctor.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Doctor Details */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-[#1D2939] mb-3">{doctor.name}</h3>

          <div className="flex flex-col gap-1.5 mb-4">
            <div className="text-[13px] text-gray-600">
              <span className="font-bold text-[#2A9D8F]">Specialty:</span> {doctor.specialty || "Not specified"}
            </div>
            <div className="text-[13px] text-gray-600">
              <span className="font-bold text-[#2A9D8F]">Experience:</span> {doctor.experience || "Not specified"}
            </div>
          </div>

          <button className="w-full py-2.5 text-sm font-bold text-teal-600 bg-teal-50 rounded-xl group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;