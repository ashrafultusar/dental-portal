import ReviewsList from '@/components/admin/review/ReviewsList';
import { getReviewsAction } from '@/lib/data/getReview';
import { MessageSquareText, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function ReviewsPage() {
    const reviews = await getReviewsAction();

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <MessageSquareText className="text-teal-500" size={28} />
                        Patient Reviews Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Total {reviews?.length || 0} reviews.
                    </p>
                </div>
                <Link 
                    href="/dental-staff-portal/review/create-review"
                    className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg active:scale-95"
                >
                    <Plus size={20} /> New Review
                </Link>
            </div>

            {/* ডাটাগুলো Client Component-এ পাঠিয়ে দিচ্ছি */}
            <ReviewsList initialReviews={reviews || []} />
        </div>
    );
}