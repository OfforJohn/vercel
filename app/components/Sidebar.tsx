"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Gamepad2,
  Users,
  Award,
  User,
  LogOut,
  Flame,
  Settings,
} from "lucide-react";
import { useEffect } from "react";

interface SidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-[#001A33] text-white flex flex-col">
        <div className="px-6 py-4 text-2xl font-bold text-center border-b border-white/10">
          <span className="text-orange-500">HIGH</span>SCORE
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-lg bg-white placeholder-gray-300 text-sm focus:outline-none"
          />
        </div>

        {/* ✅ your original nav section */}
        <nav className="flex flex-col px-4 space-y-6">
          {[
            { name: "Dashboard", icon: Home, route: "/lms" },
            { name: "Courses", icon: BookOpen, route: "/courses" },
            { name: "Play", icon: Gamepad2 },
            { name: "Community", icon: Users },
            { name: "Certification", icon: Award },
            { name: "Leaderboard", icon: Flame },
            { name: "Settings", icon: Settings },
            { name: "Profile", icon: User },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (item.route) router.push(item.route);
              }}
              className={`flex items-centerw-full gap-3 px-3 py-2 text-sm rounded-md transition-all
                hover:bg-[#F97316] hover:text-white
             ${pathname === item.route
  ? "bg-[#F97316] text-white"
  : "text-white hover:bg-[#F97316]/80 hover:text-white"}
`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto">
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* 📱 Mobile Sidebar */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[55]"
            onClick={() => setSidebarOpen?.(false)}
          />

          {/* Sidebar panel */}
          <div className="fixed top-0 left-0 w-64 h-full bg-[#001A33] text-white z-[60]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <span className="text-2xl font-bold">
                <span className="text-orange-500">HIGH</span>SCORE
              </span>
              <button
                onClick={() => setSidebarOpen?.(false)}
                className="text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 rounded-lg bg-white/10 placeholder-gray-300 text-sm focus:outline-none"
              />
            </div>

            {/* ✅ same nav for mobile too */}
            <nav className="flex flex-col px-4 space-y-6">
              {[
                { name: "Dashboard", icon: Home, route: "/lms" },
                { name: "Courses", icon: BookOpen, route: "/courses" },
                { name: "Play", icon: Gamepad2 },
                { name: "Community", icon: Users },
                { name: "Certification", icon: Award },
                { name: "Leaderboard", icon: Flame },
                { name: "Settings", icon: Settings },
                { name: "Profile", icon: User },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (item.route) router.push(item.route);
                    setSidebarOpen?.(false);
                  }}
                  className={`flex items-center w-full gap-3 px-3 py-2 text-sm rounded-md transition-all
                    hover:bg-[#F97316] hover:text-white
                   ${pathname === item.route
  ? "bg-[#F97316] text-white"
  : "text-white hover:bg-[#F97316]/80 hover:text-white"}
`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-white/10 mt-auto">
              <button className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-all">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
