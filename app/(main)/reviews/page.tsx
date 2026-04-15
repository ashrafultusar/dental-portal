import React from 'react';
import { getReviewsAction } from '@/lib/data/getReview';
import { Star, MessageSquare, Quote } from 'lucide-react';

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

        {/* Reviews Grid - Masonry-like columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review) => (
            <div 
              key={review._id} 
              className="break-inside-avoid bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#2A9D8F]/20 transition-all duration-300 relative group"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 text-gray-50 group-hover:text-[#2A9D8F]/10 transition-colors">
                <Quote size={40} fill="currentColor" />
              </div>

              {/* Star Ratings */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.stars ? "#2A9D8F" : "none"}
                    className={i < review.stars ? "text-[#2A9D8F]" : "text-gray-200"}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#344054] text-base leading-relaxed mb-6 italic">
                {review.text}
              </p>

              {/* Footer: User Info */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3">
                   {/* Avatar Placeholder */}
                   <div className="w-10 h-10 bg-[#1D2939] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-bold text-[#1D2939] text-sm leading-none">
                        {review.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {review.date}
                      </p>
                   </div>
                </div>
                
                <div className="text-[10px] font-medium px-2.5 py-1 bg-gray-50 text-gray-500 rounded-lg">
                  {review.service}
                </div>
              </div>
            </div>
          ))}
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