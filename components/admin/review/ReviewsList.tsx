"use client";

import React, { useState, useTransition } from "react";
import { Star, Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteReviewAction } from "@/actions/review";

interface IReview {
  _id: string;
  name: string;
  date: string;
  text: string;
  service: string;
  stars: number;
}

export default function ReviewsList({ initialReviews }: { initialReviews: IReview[] }) {
  const [reviews, setReviews] = useState<IReview[]>(initialReviews);
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    setLoadingId(id);
    startTransition(async () => {
      const res = await deleteReviewAction(id);
      if (res?.success) {
        setReviews((prev) => prev.filter((review) => review._id !== id));
      } else if (res?.error) {
        alert(res.error);
      }
      setLoadingId(null);
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
        No reviews found in the database.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review: IReview) => (
        <div
          key={review._id}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col p-6"
        >
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < review.stars ? "#2A9D8F" : "none"}
                className={i < review.stars ? "text-[#2A9D8F]" : "text-gray-200"}
              />
            ))}
          </div>

          <p className="text-[#1D2939] text-[15px] leading-relaxed mb-6 italic">
            {review.text}
          </p>

          <div className="mt-auto border-t border-slate-50 pt-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-[#1D2939] text-sm">{review.name}</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">{review.date}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/dental-staff-portal/review/edit-review/${review._id}`}
                className="p-2 text-slate-400 hover:text-teal-500 transition-colors"
              >
                <Edit size={18} />
              </Link>
              <button
                onClick={() => handleDelete(review._id)}
                disabled={loadingId === review._id}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
              >
                {loadingId === review._id ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}