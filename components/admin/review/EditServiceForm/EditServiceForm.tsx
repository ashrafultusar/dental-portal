"use client";

import { useState, useTransition, useRef } from "react";
import { updateServiceAction } from "@/actions/service";
import { Loader2, Camera, X } from "lucide-react";
import Image from "next/image";

interface IService {
    _id: string;
    title: string;
    description: string;
    price: string;
    icon?: string;
    image?: string;
    images?: string[];
}

interface EditServiceFormProps {
    service: IService;
}

export default function EditServiceForm({ service }: EditServiceFormProps) {
    const initialImages = service.images?.length
        ? service.images
        : (service.image ? [service.image] : []);

    const [existingImages, setExistingImages] = useState<string[]>(initialImages);
    const [newFiles, setNewFiles] = useState<{ file: File; preview: string }[]>([]);

    const [isPending, startTransition] = useTransition();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newFilesWithPreviews = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file), // Generate local preview URL
            }));
            setNewFiles((prev) => [...prev, ...newFilesWithPreviews]);
        }

        // Reset the input so files can be selected again directly without mobile cache issue
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRemoveExisting = (indexToRemove: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    const handleRemoveNew = (indexToRemove: number) => {
        setNewFiles((prev) => prev.filter((_, i) => {
            if (i === indexToRemove) {
                URL.revokeObjectURL(prev[i].preview); // Clean up memory
            }
            return i !== indexToRemove;
        }));
    };

    const handleSubmit = async (formData: FormData) => {
        // remove explicit DOM standard 'images' array or 'image', manage by state manually
        formData.delete("image");
        formData.delete("images");

        existingImages.forEach(img => {
            formData.append("existingImages", img);
        });

        newFiles.forEach(nf => {
            formData.append("images", nf.file);
        });

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
                    Service Photos
                </label>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-4">
                        {existingImages.map((img, idx) => (
                            <div key={`existing-${idx}`} className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-md bg-slate-100 shrink-0 group">
                                <Image
                                    src={img}
                                    alt={`Existing ${idx}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExisting(idx)}
                                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all z-10"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                        {newFiles.map((nf, idx) => (
                            <div key={`new-${idx}`} className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-md bg-slate-100 shrink-0 group">
                                <Image
                                    src={nf.preview}
                                    alt={`New border ${idx}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveNew(idx)}
                                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all z-10"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="w-full mt-2">
                        <label className="relative cursor-pointer bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-4 rounded-2xl flex items-center justify-center gap-2 border-2 border-dashed border-teal-200 transition-all group">
                            <Camera size={24} className="group-hover:scale-110 transition-transform" />
                            <span className="text-base font-semibold">Add Photos</span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        <p className="text-[12px] text-slate-500 mt-3 ml-2 font-medium">
                            Recommended: Square JPG or PNG, max 2MB. Select multiple files.
                        </p>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
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

