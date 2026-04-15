"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  Plus,
  Star,
  Edit,
  Trash2,
  Loader2,
  MessageSquareText,
} from "lucide-react";
import Link from "next/link";
import { deleteReviewAction } from "@/actions/review";
import { getReviewsAction } from "@/lib/data/getReview";

interface IReview {
  _id: string;
  name: string;
  date: string;
  text: string;
  service: string;
  stars: number;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const data: IReview[] = await getReviewsAction();
      setReviews(data);
    };
    fetchReviews();
  }, []);

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

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <MessageSquareText className="text-teal-500" size={28} />
            Patient Reviews Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Total {reviews.length} reviews.
          </p>
        </div>
        <Link
          href="/dental-staff-portal/review/create-review"
          className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg active:scale-95"
        >
          <Plus size={20} /> Add New Review
        </Link>
      </div>

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
                  className={
                    i < review.stars ? "text-[#2A9D8F]" : "text-gray-200"
                  }
                />
              ))}
            </div>

            <p className="text-[#1D2939] text-[15px] leading-relaxed mb-6 italic">
              {review.text}
            </p>

            <div className="mt-auto border-t border-slate-50 pt-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[#1D2939] text-sm">
                  {review.name}
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {review.date}
                </p>
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

        {reviews.length === 0 && (
          <div className="col-span-full text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
            No reviews found in the database.
          </div>
        )}
      </div>
    </div>
  );
}
