"use client";

import { useTransition } from "react";
import { updateReviewAction } from "@/actions/review";
import { Loader2 } from "lucide-react";

interface IReview {
    _id: string;
    name: string;
    date: string;
    text: string;
    service: string;
    stars: number;
}

interface EditReviewFormProps {
    review: IReview;
}

export default function EditReviewForm({ review }: EditReviewFormProps) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const res = await updateReviewAction(review._id, formData);
            if (res?.error) {
                alert(res.error);
            }
        });
    };

    return (
        <form
            action={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                        Patient Name
                    </label>
                    <input
                        name="name"
                        defaultValue={review.name}
                        type="text"
                        required
                        className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                        Service Category
                    </label>
                    <input
                        name="service"
                        defaultValue={review.service}
                        type="text"
                        required
                        className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                        Date
                    </label>
                    <input
                        name="date"
                        defaultValue={review.date}
                        type="date"
                        required
                        className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-slate-600"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                        Stars Rating (1 to 5)
                    </label>
                    <input
                        name="stars"
                        defaultValue={review.stars}
                        type="number"
                        min="1"
                        max="5"
                        required
                        className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                    Review Summary
                </label>
                <textarea
                    name="text"
                    defaultValue={review.text}
                    rows={4}
                    required
                    className="w-full p-4 text-black bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
            >
                {isPending ? (
                    <><Loader2 className="animate-spin" size={20} /><span>Updating Review...</span></>
                ) : (
                    "Save Changes"
                )}
            </button>
        </form>
    );
}
