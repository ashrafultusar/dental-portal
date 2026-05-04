import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Loading() {
    return (
        <div className="min-h-[60vh] flex flex-col justify-center items-center space-y-4 bg-white">
            <LoadingSpinner />
            <p className="text-gray-500 font-medium">Loading details...</p>
        </div>
    );
}
