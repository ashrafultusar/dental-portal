import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDoctorByIdAction } from '@/lib/data/getDoctor';
import { GraduationCap, Stethoscope, Clock, ArrowLeft, CalendarCheck } from 'lucide-react';

interface DoctorDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

const DoctorDetailsPage = async (props: DoctorDetailsProps) => {
    const params = await props.params;
    const doctor = await getDoctorByIdAction(params.id);

    if (!doctor) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Premium Hero Section */}
            <div className="relative bg-[#1D2939] pt-24 pb-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-teal-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-teal-500 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 flex flex-col items-start pt-8">
                    <Link href="/doctors" className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors mb-6 font-medium group">
                        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Specialists
                    </Link>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-6 -mt-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Image and Primary Info (Sticky) */}
                    <div className="lg:col-span-4 lg:col-start-2">
                        <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-gray-100 sticky top-24">
                            <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden bg-gray-100 group">
                                <Image
                                    src={doctor.image || "/placeholder-doctor.png"}
                                    alt={doctor.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Floating Experience Badge */}
                                {doctor.experience && (
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg flex items-center gap-4 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 opacity-95 group-hover:opacity-100">
                                        <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xl font-black text-[#1D2939] leading-none">{doctor.experience}</div>
                                            <div className="text-xs text-teal-600 font-bold uppercase tracking-wider mt-1">Experience</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="lg:col-span-6 bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12">
                        {/* Header / Name */}
                        <div className="mb-10 pb-10 border-b border-gray-100">
                            <div className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
                                {doctor.specialty || "Specialist"}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-[#1D2939] leading-tight mb-4 tracking-tight">
                                {doctor.name}
                            </h1>

                            <div className="flex flex-col gap-3">
                                {doctor.university && (
                                    <div className="flex items-center text-gray-600">
                                        <GraduationCap className="text-teal-500 mr-3 text-lg" />
                                        <span className="font-medium text-lg">{doctor.university}</span>
                                    </div>
                                )}
                                {doctor.specialty && (
                                    <div className="flex items-center text-gray-600">
                                        <Stethoscope className="text-teal-500 mr-3 text-lg" />
                                        <span className="font-medium text-lg">{doctor.specialty}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1D2939] mb-6 flex items-center gap-3">
                                About the Doctor
                            </h2>
                            <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-line bg-gray-50/50 p-6 rounded-2xl border border-gray-50">
                                {doctor.description || "No detailed description provided for this specialist."}
                            </div>
                        </div>

                        {/* General Work Hours Section (Static for aesthetics as discussed) */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1D2939] mb-6">Availability</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-teal-50/50 p-5 rounded-2xl border border-teal-100">
                                    <div className="text-sm text-teal-600 font-bold mb-1">Weekdays</div>
                                    <div className="text-gray-800 font-medium text-lg">09:00 AM - 05:00 PM</div>
                                </div>
                                <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
                                    <div className="text-sm text-[#ff6900] font-bold mb-1">Weekends</div>
                                    <div className="text-gray-800 font-medium text-lg">10:00 AM - 02:00 PM</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-8">
                            <Link
                                href="/appoinment"
                                className="group relative w-full flex items-center justify-center gap-3 bg-[#2A9D8F] hover:bg-[#21867a] text-white py-5 px-8 rounded-2xl text-lg font-bold transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                                <CalendarCheck className="text-xl relative z-10 group-hover:scale-110 transition-transform" />
                                <span className="relative z-10">Book an Appointment</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default DoctorDetailsPage;
