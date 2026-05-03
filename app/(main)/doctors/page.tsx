import { getDoctorsAction } from '@/lib/data/getDoctor';
import DoctorCard from '@/components/main/card/DoctorCard/DoctorCard';

interface Doctor {
  _id: string;
  image: string;
  name: string;
  specialty: string;
  experience: string;
  description: string;
}

const AllDoctorsPage = async () => {
  const doctorsData: Doctor[] = await getDoctorsAction();

  return (
    <main className="min-h-screen pt-10 pb-20 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1D2939] leading-[1.1] mb-4">
            All Our <span className="text-[#2A9D8F]">Specialists</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Meet our team of experienced doctors dedicated to your care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto mb-12">
          {doctorsData.map((doctor: Doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
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