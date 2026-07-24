"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Award,
  Camera,
  CheckSquare,
  Share2,
  Rocket,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react";

const adminNav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Timeline Perjalanan", href: "/admin/timeline", icon: Rocket },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Documentation", href: "/admin/documentation", icon: Camera },
  { name: "Skills & Stack", href: "/admin/skills", icon: CheckSquare },
  { name: "Social & Contact", href: "/admin/social", icon: Share2 },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5 gap-6 pt-4">
      {/* Sidebar Navigation */}
      <aside className="md:col-span-1 glass-card p-6 space-y-6 border border-white/10 h-fit md:sticky md:top-24">
        <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-lg pb-4 border-b border-slate-200 dark:border-white/10">
          <Shield size={20} />
          <span>CMS Admin</span>
        </div>

        <nav className="space-y-1.5">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-slate-200 dark:border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="md:col-span-4 space-y-6">
        {children}
      </main>
    </div>
  );
}
