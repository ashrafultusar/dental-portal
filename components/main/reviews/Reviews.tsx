import React from "react";
import { ArrowRight } from "lucide-react";
import { getReviewsAction } from "@/lib/data/getReview";
import Link from "next/link";
import ReviewCard from "../card/ReviewCard/ReviewCard";
import { IReview } from "@/Type/Type";


const Reviews = async () => {
  const reviews: IReview[] = await getReviewsAction();

  return (
    <section id="reviews" className="py-16 md:py-20 bg-[#F8FBFB]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-[#1D2939] leading-[1.1] mb-4">
            Patient <span className="text-[#2A9D8F]">Reviews</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            See what our patients have to say about their experience.
          </p>
        </div>

        {/* Reviews Grid: Mobile 2 cols, Medium+ 3 cols */}
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

        {/* View All Button */}
        {reviews.length > 0 && (
          <div className="flex justify-center">
            <Link href="/reviews">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#1D2939] over:text-white  transition-all shadow-sm hover:shadow-lg font-bold border border-gray-200 rounded-xl hover:bg-[#2A9D8F] cursor-pointer hover:text-white hover:border-[#2A9D8F]   text-sm">
                All Reviews <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;