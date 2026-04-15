import EditServiceForm from "@/components/admin/EditServiceForm/EditServiceForm";
import { getServiceByIdAction } from "@/lib/data/getService";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    // 1. Fetching service data by ID
    const service = await getServiceByIdAction(id);

    // 2. If not found, return a 404 page
    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto mb-6">
                    <Link
                        href="/dental-staff-portal/services"
                        className="flex items-center gap-1 text-slate-500 hover:text-teal-600 transition-colors w-fit"
                    >
                        <ChevronLeft size={20} />
                        Back to List
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Edit Service Details
                </h1>

                <EditServiceForm service={service} />
            </div>
        </div>
    );
};

export default Page;
