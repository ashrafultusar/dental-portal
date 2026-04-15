import React from 'react';


export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Dashboard Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm">Total Doctors</p>
          <h3 className="text-2xl font-bold text-[#1D2939]">12</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm">Active Appointments</p>
          <h3 className="text-2xl font-bold text-[#1D2939]">48</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm">New Requests</p>
          <h3 className="text-2xl font-bold text-teal-600">5</h3>
        </div>
      </div>

      
    </div>
  );
}