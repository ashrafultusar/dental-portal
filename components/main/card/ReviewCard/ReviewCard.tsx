import React from "react";
import { Star, Quote } from "lucide-react";

export interface IReview {
  _id: string;
  name: string;
  date: string;
  text: string;
  service: string;
  stars: number;
}

interface ReviewCardProps {
  review: IReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const firstLetter = review.name ? review.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="group relative bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-teal-100 flex flex-col h-full">
      {/* Decorative Quote Icon */}
      <Quote 
        className="absolute top-6 right-6 text-[#2A9D8F]/10" 
        size={40} 
        fill="currentColor" 
      />

      {/* Header: User Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E9F5F3] border border-[#D1E9E5] text-[#2A9D8F] font-bold text-lg shadow-inner shrink-0">
          {firstLetter}
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm md:text-base">{review.name}</h4>
          <p className="text-xs text-slate-400">{review.date}</p>
        </div>
      </div>

      {/* Body: Review Text */}
      <div className="flex-grow mb-6">
        <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed italic">
          {review.text}
        </p>
      </div>

      {/* Footer: Service Tag & Stars (Stacked - Upor Niche) */}
      <div className="flex flex-col items-start gap-3 pt-6 border-t border-slate-100">
        <span className="text-[10px] md:text-xs font-semibold px-3 py-1 bg-slate-50 text-slate-500 rounded-full border border-slate-100 uppercase tracking-wider w-fit">
          {review.service}
        </span>
        
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < review.stars ? "#2A9D8F" : "none"}
              className={i < review.stars ? "text-[#2A9D8F]" : "text-slate-200"}
              strokeWidth={1.5}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;