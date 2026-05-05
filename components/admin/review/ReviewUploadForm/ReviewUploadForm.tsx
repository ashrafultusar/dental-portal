"use client";

import { useTransition } from "react";
import { createReviewAction } from "@/actions/review";
import { Loader2 } from "lucide-react";

export default function ReviewUploadForm() {
    const [isPending, startTransition] = useTransition();

    const clientAction = async (formData: FormData) => {
        startTransition(async () => {
            const result = await createReviewAction(formData);
            if (result?.error) {
                alert(result.error);
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
            <form action={clientAction} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1.5 text-black">Patient Name</label>
                        <input name="name" type="text" required className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none text-black" placeholder="e.g. Aminul Islam" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1.5 text-slate-700">Service Category</label>
                        <input name="service" type="text" required className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 text-black focus:ring-teal-500/20 outline-none" placeholder="e.g. Root Canal" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1.5 text-slate-700">Date</label>
                        <input name="date" type="date" required className="w-full border border-slate-200 text-black rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none text-slate-600" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1.5 text-slate-700">Stars Rating (1 to 5)</label>
                        <input name="stars" type="number" min="1" max="5" defaultValue="5" required className="w-full text-black border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-700">Review Summary</label>
                    <textarea name="text" rows={4} required className="w-full text-black border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="What the patient said about the treatment..." />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
                >
                    {isPending ? <><Loader2 className="animate-spin" /> Saving Review...</> : "Publish Review"}
                </button>
            </form>
        </div>
    );
}
