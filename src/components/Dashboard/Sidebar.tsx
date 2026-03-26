"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Users, 
  LayoutDashboard, 
  UserPlus, 
  LogOut, 
  Database,
} from "lucide-react";
import { adminLogout } from "@/app/actions/admin";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "clients", label: "Clients Directory", icon: Users },
    { id: "assets", label: "Assets Hub", icon: Database },
    { id: "register", label: "Add Client", icon: UserPlus },
  ];

  return (
    <aside className="w-56 border-r border-zinc-200 bg-white h-screen fixed left-0 top-0 flex flex-col z-50">
      <div className="p-4 border-b border-zinc-100 flex items-center gap-2">
        <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
          <span className="text-white font-normal text-xs">R</span>
        </div>
        <span className="font-normal text-sm text-zinc-900">Redlix Admin</span>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={`/admin/dashboard?tab=${item.id}`}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-normal transition-colors ${
              currentTab === item.id 
                ? "bg-zinc-100 text-zinc-900" 
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-100">
        <form action={adminLogout}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
