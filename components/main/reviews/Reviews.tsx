import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { getReviewsAction } from "@/lib/data/getReview";
import Link from "next/link";

interface IReview {
  _id: string;
  name: string;
  date: string;
  text: string;
  service: string;
  stars: number;
}

const Reviews = async () => {
  const reviews: IReview[] = await getReviewsAction();

  return (
    <section id="reviews" className="py-20 bg-[#F8FBFB]">
      <div className="container mx-auto px-6 text-center">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-7xl font-bold text-[#1D2939] leading-[1.1]">
            Patient <span className="text-[#2A9D8F]">Reviews</span>
          </h2>{" "}
          <p className="text-gray-400 mb-12 text-sm">
            শুনুন আমাদের রোগীরা কি বলছেন।
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 text-left flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < review.stars ? "#2A9D8F" : "none"}
                      className={
                        i < review.stars ? "text-[#2A9D8F]" : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-[#1D2939] text-[15px] leading-relaxed mb-8">
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Details & Service Badge */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-[#1D2939] text-sm">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {review.date}
                  </p>
                </div>
                <span className="text-[10px] font-bold px-3 py-1.5 bg-white text-gray-600 rounded-full border border-gray-100 shadow-sm">
                  {review.service}
                </span>
              </div>
            </div>
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
      <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#1D2939] font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm text-sm">
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
