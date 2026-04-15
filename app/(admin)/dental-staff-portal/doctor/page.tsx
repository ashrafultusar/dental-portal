"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Plus, UserRound, Edit, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { deleteDoctorAction } from '@/actions/doctor'; 
import { getDoctorsAction } from '@/lib/data/getDoctor';

// 1. Define the Doctor Type
interface IDoctor {
    _id: string;
    name: string;
    specialty: string;
    experience: string;
    description?: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default function DoctorPage() {
    // 2. Apply Type to State
    const [doctors, setDoctors] = useState<IDoctor[]>([]);
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            const data: IDoctor[] = await getDoctorsAction();
            setDoctors(data);
        };
        fetchDoctors();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this doctor?")) return;
        
        setLoadingId(id);
        startTransition(async () => {
            const res = await deleteDoctorAction(id);
            if (res?.success) {
                setDoctors((prev) => prev.filter(doc => doc._id !== id));
            } else if (res?.error) {
                alert(res.error);
            }
            setLoadingId(null);
        });
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <UserRound className="text-teal-500" size={28} />
                        Doctor Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Total {doctors.length} specialists.</p>
                </div>
                <Link 
                    href="/dental-staff-portal/doctor/create-doctor"
                    className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg active:scale-95"
                >
                    <Plus size={20} /> Add New Doctor
                </Link>
            </div>

            {/* Doctor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doc: IDoctor) => (
                    <div key={doc._id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start gap-4">
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                <Image 
                                    src={doc.image || "/placeholder-doctor.png"} 
                                    alt={doc.name} 
                                    fill 
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-800 text-lg leading-tight truncate">
                                    {doc.name}
                                </h3>
                                <p className="text-teal-600 text-xs font-bold uppercase mt-1">
                                    {doc.specialty}
                                </p>
                                <p className="text-slate-400 text-xs mt-2 italic font-medium">
                                    Exp: {doc.experience}
                                </p>
                            </div>
                        </div>
                        
                        {/* Inline Actions */}
                        <div className="mt-4 pt-4 border-t border-slate-50 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link 
                                href={`/dental-staff-portal/doctor/edit-doctor/${doc._id}`}
                                className="p-2 text-slate-400 hover:text-teal-500 transition-colors"
                            >
                                <Edit size={18} />
                            </Link>
                            
                            <button 
                                onClick={() => handleDelete(doc._id)}
                                disabled={loadingId === doc._id}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                            >
                                {loadingId === doc._id ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <Trash2 size={18} />
                                )}
                            </button>
                        </div>
                    </div>
                ))}

                {doctors.length === 0 && (
                    <div className="col-span-full text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                        No doctors found in the database.
                    </div>
                )}
            </div>
        </div>
    );
}