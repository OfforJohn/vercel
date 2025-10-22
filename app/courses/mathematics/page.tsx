"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    Home,
    BookOpen,
    Gamepad2,
    Users,
    Award,
    User,
    LogOut,
    MessageSquare,
    Palette,
    Settings,
    Search,
    ArrowLeft,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";

export default function CoursesPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const topics = [
        {
            title: "Trigonometry",
            desc: "Master sine, cosine, tangent, and their real-world applications.",
            videos: 5,
        },
        {
            title: "Algebra",
            desc: "Simplify expressions, solve equations, and unlock the language of math.",
            videos: 25,
        },
        {
            title: "Geometry",
            desc: "Shapes, angles, and theorems that bring math to life.",
            videos: 6,
        },
        {
            title: "Calculus (Introductory)",
            desc: "Learn the basics of differentiation and integration step by step.",
            videos: 9,
        },
        {
            title: "Probability & Statistics",
            desc: "Understand data, chance, and how numbers tell stories.",
            videos: 11,
        },
        {
            title: "Mensuration",
            desc: "Work with length, area, and volume to solve practical problems.",
            videos: 30,
        },
    ];

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-[#001A33] text-white flex-col">
                <div className="px-6 py-5 text-2xl font-bold text-center border-b border-white/10">
                    <span className="text-orange-500">HIGH</span>SCORE
                </div>

                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-2 rounded-md bg-white text-gray-700 text-sm focus:outline-none"
                    />
                </div>

                <nav className="flex flex-col px-4 space-y-2">
                    {[
                        { name: "Dashboard", icon: Home, route: "/lms" },
                        { name: "Courses", icon: BookOpen, route: "/courses" },
                        { name: "Play", icon: Gamepad2 },
                        { name: "Community", icon: Users },
                        { name: "Certification", icon: Award },
                        { name: "Profile", icon: User },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => item.route && router.push(item.route)}
                            className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-all ${pathname === item.route
                                ? "bg-orange-100 text-orange-600"
                                : "hover:bg-orange-100 hover:text-orange-600 text-white"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto p-4 border-t border-white/10">
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-all">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <div className="lg:hidden">
                {sidebarOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="fixed top-0 left-0 w-64 h-full bg-[#001A33] text-white z-50 flex flex-col transition-transform">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                                <span className="text-2xl font-bold">
                                    <span className="text-orange-500">HIGH</span>SCORE
                                </span>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="text-white hover:text-gray-300"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-4">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full px-3 py-2 rounded-md bg-white/10 text-sm placeholder-gray-300 focus:outline-none"
                                />
                            </div>

                            <nav className="flex flex-col px-4 space-y-2 mt-2">
                                {[
                                    { name: "Dashboard", icon: Home, route: "/lms" },
                                    { name: "Courses", icon: BookOpen, route: "/courses" },
                                    { name: "Play", icon: Gamepad2 },
                                    { name: "Community", icon: Users },
                                    { name: "Certification", icon: Award },
                                    { name: "Profile", icon: User },
                                ].map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (item.route) {
                                                router.push(item.route);
                                                setSidebarOpen(false);
                                            }
                                        }}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${pathname === item.route
                                            ? "bg-[#F97316]/10 text-[#F97316]"
                                            : "text-white hover:bg-[#F97316] hover:text-white"
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.name}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </>
                )}
            </div>

            {/* Hamburger (Mobile) */}
            <div className="lg:hidden absolute top-4 left-4">
                <button onClick={() => setSidebarOpen(true)}>
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="#F97316"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>



{/* Main Content */}
<main className="flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 flex justify-center">
  <div className="w-full max-w-4xl ml-4 p-8 mt-2 mb-24"> {/* changed mt-10 → mt-6 */}
    
    {/* Back Button + Subject Title */}
    <div className="flex items-center gap-3 mb-6">
      <button
        onClick={() => router.back()}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-xl font-semibold text-gray-800">Mathematics</h1>
    </div>

    {/* Search */}
    <div className="relative w-full sm:max-w-md mb-8">
      <input
        type="text"
        placeholder="Search subject or topic......"
        className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
    </div>

    {/* Topics Section */}
    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Topics</h2>

    <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-sm relative pb-16">
      {topics.map((topic, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 hover:bg-gray-50 transition-all"
        >
          <div>
            <h3 className="text-base font-semibold text-gray-900">{topic.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{topic.desc}</p>
          </div>
          <span className="text-sm font-medium text-gray-700 mt-2 sm:mt-0">
            {topic.videos} Videos
          </span>
        </div>
      ))}

      {/* Button inside the white box, slightly raised from bottom */}
      <div className="absolute bottom-4 left-4">
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow transition">
          View all Lessons
        </button>
      </div>
    </div>
  </div>
</main>




            {/* Footer Nav (Mobile Only) */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
                <div className="flex justify-around items-center h-16">
                    <button className="flex flex-col items-center text-orange-500">
                        <Home className="w-5 h-5" />
                        <span className="text-xs mt-1">Home</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-500 hover:text-orange-500">
                        <Users className="w-5 h-5" />
                        <span className="text-xs mt-1">Leaderboard</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-500 hover:text-orange-500">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-xs mt-1">Chat</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-500 hover:text-orange-500">
                        <Settings className="w-5 h-5" />
                        <span className="text-xs mt-1">Settings</span>
                    </button>
                    <button className="flex flex-col items-center text-gray-500 hover:text-orange-500">
                        <Palette className="w-5 h-5" />
                        <span className="text-xs mt-1">Profile</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
