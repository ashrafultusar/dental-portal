import React from 'react';
import { getReviewsAction } from '@/lib/data/getReview';
import { Star, MessageSquare, Quote } from 'lucide-react';
import ReviewCard from '@/components/main/card/ReviewCard/ReviewCard';

interface IReview {
  _id: string;
  name: string;
  date: string;
  text: string;
  service: string;
  stars: number;
}

const AllReviewsPage = async () => {
  const reviews: IReview[] = await getReviewsAction();

  return (
    <main className="min-h-screen bg-[#FDFDFD] py-16">
      <div className="container mx-auto px-6">
        
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <MessageSquare size={14} /> Our Community
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1D2939] mb-6">
            What Our Patients <span className="text-[#2A9D8F]">Say</span>
          </h1>
          <p className="text-gray-500 text-lg">
            We take pride in our service and our patient&apos;s smiles reflect our dedication. Read through our latest feedback.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-7xl mx-auto mb-12">
         {reviews.map((review: IReview) => (
            <ReviewCard key={review._id} review={review} />
          ))}

          {reviews.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              No reviews available yet.
            </div>
          )}
        </div>

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400">No reviews found. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllReviewsPage;