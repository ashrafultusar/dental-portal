import DoctorsList from '@/components/admin/doctor/DoctorsList';
import { getDoctorsAction } from '@/lib/data/getDoctor';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function DoctorPage() {
    // সার্ভার থেকে ডাটা সরাসরি ফেচ হচ্ছে
    const doctors = await getDoctorsAction();

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                        Doctor Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Total {doctors?.length || 0} specialists.</p>
                </div>
                <Link 
                    href="/dental-staff-portal/doctor/create-doctor"
                    className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg active:scale-95"
                >
                    <Plus size={20} /> Add New Doctor
                </Link>
            </div>

            {/* ডাটাগুলো Client Component-এ পাঠিয়ে দিচ্ছি */}
            <DoctorsList initialDoctors={doctors || []} />
        </div>
    );
}