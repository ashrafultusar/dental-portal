import Sidebar from "@/components/admin/Sidebar/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">

      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Desktop Top Header (Hidden on Mobile) */}
        <header className="hidden lg:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
          <div>
            <h2 className="text-sm font-medium text-gray-400">Staff Portal</h2>
            <p className="text-xs text-teal-600 font-semibold">Dental Care Management</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700 leading-none">Admin User</p>
              <span className="text-[10px] text-gray-400">Super Admin</span>
            </div>
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-teal-500/20">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}