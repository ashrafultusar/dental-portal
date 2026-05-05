import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  Star, 
  TrendingUp, 
  Plus, 
  Settings, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import Link from 'next/link';
import { getDoctorsAction } from '@/lib/data/getDoctor';
import { getServicesAction } from '@/lib/data/getService';
import { getReviewsAction } from '@/lib/data/getReview';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const doctors = await getDoctorsAction();
  const services = await getServicesAction();
  const reviews = await getReviewsAction();

  const stats = [
    { title: "Total Doctors", value: doctors?.length || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Services", value: services?.length || 0, icon: CalendarCheck, color: "text-teal-600", bg: "bg-teal-50" },
    { title: "Total Reviews", value: reviews?.length || 0, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Welcome Back, Admin</h1>
        <p className="text-slate-500">Here&apos;s what&apos;s happening today in your dental clinic.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold text-[#1D2939] mt-2">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-slate-400 gap-1">
              <TrendingUp size={16} className="text-emerald-500" />
              <span className="text-emerald-500 font-semibold">+12%</span> from last week
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            {[
              { label: "Add New Doctor", href: "/dental-staff-portal/doctor/create-doctor" },
              { label: "Add New Service", href: "/dental-staff-portal/services/create-service" },
              { label: "Manage Reviews", href: "/dental-staff-portal/reviews" }
            ].map((action, i) => (
              <Link key={i} href={action.href} className="flex justify-between items-center p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                <span className="font-medium text-slate-700">{action.label}</span>
                <ArrowRight size={18} className="text-slate-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity / Placeholder */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Appointments</h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-6 text-center text-slate-400 py-12">
                <ClipboardList size={40} className="mx-auto mb-3 opacity-20" />
                <p>No recent appointments found.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}