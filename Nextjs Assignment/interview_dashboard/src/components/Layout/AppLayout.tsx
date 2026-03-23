"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ROLE_PERMISSIONS } from "@/types";
import {
  LayoutDashboard,
  Users,
  Shield,
  LogOut,
  Briefcase,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter(); // ✅ correct
  const pathname = usePathname(); // ✅ for active link

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, []);

  // const date = useMemo(() => {
  //   if (!mounted) return "";
  //   return new Date().toLocaleDateString("en-US", {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // }, [mounted]);

  if(!mounted) return null;
  if (!user) return null;

  const perms = ROLE_PERMISSIONS[user.role];

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, visible: perms.canViewDashboard },
    { to: "/candidates", label: "Candidates", icon: Users, visible: perms.canViewCandidates },
    { to: "/role-management", label: "Roles", icon: Shield, visible: perms.canManageRoles },
  ];

  const roleBadgeColors: Record<string, string> = {
    admin: "bg-teal-600/20 rounded-2xl text-teal-600",
    ta_member: "bg-blue-200 text-blue-600",
    panelist: "bg-yellow-200 text-yellow-600",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-black text-white flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b">
          <Briefcase className="w-5 h-5" />
          <span className="text-lg font-bold">Interview Hub</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems
            .filter((n) => n.visible)
            .map((item) => {
              const isActive = pathname === item.to;

              return (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src={user.image}
              alt=""
              width={9}
              height={9}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">
                {user.firstName} {user.lastName}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded ${roleBadgeColors[user.role]}`}
              >
                {user.role}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b flex items-center justify-between px-4">
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* <p className="text-sm text-gray-500">{date}</p> */}

          <p suppressHydrationWarning className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <main className="flex-1 overflow-auto p-4">
          {children} {/* ✅ replaces Outlet */}
        </main>
      </div>
    </div>
  );
}