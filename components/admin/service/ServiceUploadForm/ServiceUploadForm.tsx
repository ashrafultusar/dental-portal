"use client";

import { useState, useTransition, useRef } from "react";
import { createServiceAction } from "@/actions/service";
import { ImageIcon, X, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ServiceUploadForm() {
    // Store both file and its synchronous preview together to ensure strict pairing
    const [selectedFiles, setSelectedFiles] = useState<{ file: File; preview: string }[]>([]);
    const [isPending, startTransition] = useTransition();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newFilesWithPreviews = files.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            setSelectedFiles(prev => [...prev, ...newFilesWithPreviews]);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const removeImage = (indexToRemove: number) => {
        setSelectedFiles(prev => prev.filter((item, i) => {
            if (i === indexToRemove) {
                URL.revokeObjectURL(item.preview);
            }
            return i !== indexToRemove;
        }));
    };

    const clientAction = async (formData: FormData) => {
        // Form inherently has title, price, icon, description
        // Remove native images string input if there somehow
        formData.delete("image");
        formData.delete("images");

        // Append all selected files to formData
        selectedFiles.forEach(item => {
            formData.append("images", item.file);
        });

        startTransition(async () => {
            const result = await createServiceAction(formData);
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
                        <label className="block text-sm font-semibold mb-1.5 text-slate-700">Service Title</label>
                        <input name="title" type="text" required className="w-full border text-black border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="e.g. Root Canal Treatment" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1.5 text-slate-700">Price</label>
                        <input name="price" type="text" required className="w-full text-black border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="e.g. ৳ 3,000 Taka" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1.5 text-slate-700">Icon Name</label>
                        <input name="icon" type="text" className="w-full border text-black border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="e.g. Activity, Bone" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-700">Description</label>
                    <textarea name="description" rows={3} required className="w-full border text-black border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="Service description..." />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-700">Service Images</label>
                    <div className="relative">
                        <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-teal-50 transition-all`}>
                            <ImageIcon className="w-10 h-10 mb-2 text-slate-400" />
                            <span className="text-sm text-slate-500 font-semibold mt-1">Click to add photos</span>
                            <span className="text-[12px] text-slate-400 mt-1">Recommended: Square JPG/PNG, max 2MB</span>
                            <input
                                ref={fileInputRef}
                                name="image"
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>

                        {selectedFiles.length > 0 && (
                            <div className="flex flex-wrap gap-4 mt-4">
                                {selectedFiles.map((item, index) => (
                                    <div key={index} className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-teal-500 group">
                                        <Image src={item.preview} alt={`Preview ${index}`} fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeImage(index);
                                            }}
                                            className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all z-10"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-4 transition-all"
                >
                    {isPending ? <><Loader2 className="animate-spin" /> Saving...</> : "Publish Service"}
                </button>
            </form>
        </div>
    );
}
