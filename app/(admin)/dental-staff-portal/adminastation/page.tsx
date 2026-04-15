import UserManagementTable from "@/components/admin/adminastation/Administation";
import { getAllUsers } from "@/lib/data/getUser";
import { ShieldCheck, UserPlus } from "lucide-react";
import Link from "next/link";

export default async function UserManagementPage() {
  // Fetch data on the server
  const res = await getAllUsers();
  const initialUsers = res.success ? res.data : [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-black">
          <ShieldCheck className="text-[#2A9D8F]" /> Staff Management
        </h1>

        {/* New Add Admin Button */}
        <Link
          href="/register"
          className="flex items-center gap-2 px-4 py-2 bg-[#2A9D8F] text-white font-semibold rounded-xl hover:bg-[#23857a] transition-all shadow-sm"
        >
          <UserPlus size={18} />
          Add New Staff
        </Link>
      </div>

      <UserManagementTable initialUsers={initialUsers} />
    </div>
  );
}
