import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDoctorsAction } from '@/lib/data/getDoctor';
import DoctorCard from '../card/DoctorCard/DoctorCard';

interface Doctor {
  _id: string;
  image: string;
  name: string;
  specialty: string;
  experience: string;
  description: string;
}
const OurDoctors = async () => {
  const doctorsData = await getDoctorsAction();

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1D2939] leading-[1.1]">
            Meet Our <span className="text-[#2A9D8F]">Doctors</span>
          </h2>
        </div>

       
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto mb-12">
        {doctorsData.map((doctor: Doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>

        {/* All Doctors Button */}
        <div className="flex justify-center">
          <Link href="/doctors">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#1D2939] over:text-white  transition-all shadow-sm hover:shadow-lg font-bold border border-gray-200 rounded-xl hover:bg-[#2A9D8F] cursor-pointer hover:text-white hover:border-[#2A9D8F]   text-sm">
              View All Doctors <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurDoctors;