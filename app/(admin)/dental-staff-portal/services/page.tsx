"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Plus, Settings, Edit, Trash2, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteServiceAction } from '@/actions/service';
import { getServicesAction } from '@/lib/data/getService';

interface IService {
    _id: string;
    title: string;
    description: string;
    price: string;
    icon?: string;
    image?: string;
}

export default function ServicesPage() {
    const [services, setServices] = useState<IService[]>([]);
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            const data: IService[] = await getServicesAction();
            setServices(data);
        };
        fetchServices();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        setLoadingId(id);
        startTransition(async () => {
            const res = await deleteServiceAction(id);
            if (res?.success) {
                setServices((prev) => prev.filter(service => service._id !== id));
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
                        <Settings className="text-teal-500" size={28} />
                        Services Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Total {services.length} services.</p>
                </div>
                <Link
                    href="/dental-staff-portal/services/create-service"
                    className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg active:scale-95"
                >
                    <Plus size={20} /> Add New Service
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service: IService) => (
                    <div key={service._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
                        <div className="relative w-full h-40 bg-slate-100 overflow-hidden">
                            <Image
                                src={service.image || "/placeholder-doctor.png"}
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

                {services.length === 0 && (
                    <div className="col-span-full text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                        No services found in the database.
                    </div>
                )}
            </div>
        </div>
    );
}
