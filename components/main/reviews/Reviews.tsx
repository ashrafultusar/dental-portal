import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Aminul Islam",
      date: "2026-03-15",
      text: "অসাধারণ সেবা! Dr. Rahim খুবই দক্ষ এবং যত্নশীল। আমার root canal সম্পূর্ণ painless ছিল।",
      service: "Root Canal",
      stars: 5
    },
    {
      id: 2,
      name: "Sharmin Sultana",
      date: "2026-03-10",
      text: "আমার বাচ্চার জন্য best dental clinic! Dr. Nusrat অনেক friendly এবং patient।",
      service: "Pediatric Dentistry",
      stars: 5
    },
    {
      id: 3,
      name: "Rafiqul Alam",
      date: "2026-02-28",
      text: "Teeth whitening এর result দেখে আমি অনেক happy। Clinic টা অনেক clean এবং modern।",
      service: "Teeth Whitening",
      stars: 4
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-[#F8FBFB]">
      <div className="container mx-auto px-6 text-center">
        {/* Header Section */}
        <h2 className="text-4xl font-bold text-[#1D2939] mb-4">Patient Reviews</h2>
        <p className="text-gray-400 mb-12 text-sm">শুনুন আমাদের রোগীরা কি বলছেন।</p>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 text-left flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                {/* Star Ratings */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < review.stars ? "#2A9D8F" : "none"} 
                      className={i < review.stars ? "text-[#2A9D8F]" : "text-gray-200"} 
                    />
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-[#1D2939] text-[15px] leading-relaxed mb-8">
                  {review.text}
                </p>
              </div>
              
              {/* Reviewer Details & Service Badge */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-[#1D2939] text-sm">{review.name}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{review.date}</p>
                </div>
                <span className="text-[10px] font-bold px-3 py-1.5 bg-white text-gray-600 rounded-full border border-gray-100 shadow-sm">
                  {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#1D2939] font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm text-sm">
            All Reviews <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;