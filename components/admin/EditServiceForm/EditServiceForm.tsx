"use client";

import { useState, useTransition } from "react";
import { updateServiceAction } from "@/actions/service";
import { Loader2, Camera } from "lucide-react";
import Image from "next/image";

interface IService {
    _id: string;
    title: string;
    description: string;
    price: string;
    icon?: string;
    image?: string;
}

interface EditServiceFormProps {
    service: IService;
}

export default function EditServiceForm({ service }: EditServiceFormProps) {
    const [preview, setPreview] = useState<string | null>(service.image || null);
    const [isPending, startTransition] = useTransition();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const res = await updateServiceAction(service._id, formData);
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
                        Service Title
                    </label>
                    <input
                        name="title"
                        defaultValue={service.title}
                        type="text"
                        required
                        className="w-full p-4 text-black bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                        Price
                    </label>
                    <input
                        name="price"
                        defaultValue={service.price}
                        type="text"
                        required
                        className="w-full p-4 text-black bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                        Icon Name
                    </label>
                    <input
                        name="icon"
                        defaultValue={service.icon}
                        type="text"
                        className="w-full p-4 text-black bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                    Description
                </label>
                <textarea
                    name="description"
                    defaultValue={service.description}
                    rows={3}
                    required
                    className="w-full text-black p-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
                    Service Photo
                </label>
                <div className="flex items-center gap-6">
                    <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-md bg-slate-100 shrink-0">
                        <Image
                            src={preview || "/placeholder-doctor.png"}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="relative cursor-pointer bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-3 rounded-xl flex items-center justify-center gap-2 border-2 border-dashed border-teal-200 transition-all group">
                            <Camera size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-semibold">Change Photo</span>
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        <p className="text-[11px] text-slate-400 mt-2 ml-1">
                            Recommended: Square JPG or PNG, max 2MB
                        </p>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
            >
                {isPending ? (
                    <><Loader2 className="animate-spin" size={20} /><span>Updating Service...</span></>
                ) : (
                    "Save Changes"
                )}
            </button>
        </form>
    );
}
