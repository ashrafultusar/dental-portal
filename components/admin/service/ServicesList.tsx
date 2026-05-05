"use client";

import React, { useState, useTransition } from 'react';
import { Edit, Trash2, Loader2, Sparkles, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { deleteServiceAction } from '@/actions/service';

interface IService {
    _id: string;
    title: string;
    description: string;
    price: string;
    icon?: string;
    image?: string;
    images?: string[];
}

export default function ServicesList({ initialServices }: { initialServices: IService[] }) {
    const [services, setServices] = useState<IService[]>(initialServices);
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        setLoadingId(id);
        startTransition(async () => {
            const res = await deleteServiceAction(id);
            if (res?.success) {
                setServices((prev) => prev.filter((service) => service._id !== id));
            } else if (res?.error) {
                alert(res.error);
            }
            setLoadingId(null);
        });
    };

    // যদি ডাটা খালি থাকে
    if (services.length === 0) {
        return (
            <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                No services found in the database.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: IService) => (
                <div key={service._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
                    <div className="relative w-full h-40 bg-slate-100 overflow-hidden">
                        <Image
                            src={service.images?.[0] || service.image || "/placeholder-doctor.png"}
                            alt={service.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-[#1E74B5] text-white font-bold py-1 px-3 rounded-lg shadow-md">
                            {service.price}
                        </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 flex items-center gap-2">
                            <Sparkles size={16} className="text-teal-500" /> {service.title}
                        </h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                            {service.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-slate-50 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                                href={`/dental-staff-portal/services/edit-service/${service._id}`}
                                className="p-2 text-slate-400 hover:text-teal-500 transition-colors"
                            >
                                <Edit size={18} />
                            </Link>
                            <button
                                onClick={() => handleDelete(service._id)}
                                disabled={loadingId === service._id}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                            >
                                {loadingId === service._id ? (
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