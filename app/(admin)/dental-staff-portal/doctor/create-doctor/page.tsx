import DoctorUploadForm from "@/components/admin/DoctorUploadForm/DoctorUploadForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto mb-6">
                    <Link 
                        href="/dental-staff-portal/doctor" 
                        className="flex items-center gap-1 text-slate-500 hover:text-teal-600 transition-colors w-fit"
                    >
                        <ChevronLeft size={20} />
                        Back to List
                    </Link>
                </div>
                
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Add New Doctor Profile
                </h1>
                
                <DoctorUploadForm />
            </div>
        </div>
    );
};

export default Page;