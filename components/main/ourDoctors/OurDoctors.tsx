import React from 'react';
import Image from 'next/image';

const OurDoctors = () => {
  const doctorsData = [
    {
      id: 1,
      name: "Dr. Rahim Uddin",
      specialty: "Oral Surgery",
      experience: "15 years",
      description: "Expert in complex oral surgeries and dental implant procedures with over 15 years of clinical experience.",
      image: "/assets/doctor/1.jpeg", // Apnar image path-ti ekhane hobe
    },
    {
      id: 2,
      name: "Dr. Fatima Akter",
      specialty: "Orthodontics",
      experience: "10 years",
      description: "Specialist in braces and aligners, dedicated to creating beautiful smiles for patients of all ages.",
      image: "/assets/doctor/2.jpeg",
    },
    {
      id: 3,
      name: "Dr. Kamal Hossain",
      specialty: "Endodontics",
      experience: "12 years",
      description: "Root canal specialist known for painless treatments and exceptional patient care.",
      image: "/assets/doctor/3.jpeg",
    },
    {
      id: 4,
      name: "Dr. Nusrat Jahan",
      specialty: "Pediatric Dentistry",
      experience: "8 years",
      description: "Passionate about making dental visits fun and comfortable for children.",
      image: "/assets/doctor/1.jpeg",
    },
  ];

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
          {doctorsData.map((doctor) => (
            <div 
              key={doctor.id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Doctor Image Container */}
              <div className="relative aspect-[4/5] w-full bg-gray-100">
                <Image 
                  src={doctor.image}
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