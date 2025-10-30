"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LogOut,
  Search,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "@/app/components/Sidebar";

import FooterNav from "@/app/components/FooterNav";


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



        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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


              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
          </>
        )}
      </div>

      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 flex justify-center pb-32">
        <div className="w-full max-w-6xl flex flex-col gap-6">
          {/* Back button + Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Mathematics</h1>
          </div>

          {/* Search */}
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search subject or topic..."
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>

          {/* Topics Section */}
          <h2 className="text-2xl font-semibold text-gray-800">Topics</h2>

          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-sm p-5 flex flex-col gap-4">
            {topics.map((topic, index) => (
              <div
                key={index}
                onClick={() => {
                  if (topic.title === "Trigonometry") {
                    router.push("/courses/trigonometry");
                  }
                }}
                className="flex justify-between items-center py-4 px-2 hover:bg-gray-50 transition-all cursor-pointer"
              >

                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">{topic.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{topic.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 ml-4">
                  {topic.videos} Videos
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}

            {/* Button inside the container */}
            <div className="mt-4 flex justify-center lg:justify-start">
              <button
                className="text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow transition-all duration-300 hover:opacity-90"
                style={{
                  background: "linear-gradient(180deg, #FF9053 0%, #DB5206 100%)",
                }}
              >
                View all Lessons
              </button>

            </div>
          </div>
        </div>
      </main>

      {/* Footer Nav (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
        <FooterNav />
      </div>


    </div>
  );
}
