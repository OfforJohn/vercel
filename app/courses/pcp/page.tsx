"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PhysicsCbtPracticePage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] relative">

            {/* ✅ Desktop Sidebar */}
            <div className="hidden md:block w-64 bg-[#031829]">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>

            {/* ✅ Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ✅ Mobile Sidebar Slide-In */}
            <div
                className={`fixed z-50 md:hidden transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="w-64 bg-[#031829] h-screen shadow-lg">
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                </div>
            </div>

            {/* ✅ Page Content */}
            <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-10 py-6">

                {/* Back Button & Menu */}
                <div className="flex items-center mb-4">
                    <button className="md:hidden mr-4" onClick={() => setSidebarOpen(true)}>
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <ArrowLeft
                        size={22}
                        className="text-gray-600 cursor-pointer"
                        onClick={() => router.back()}
                    />
                </div>

                {/* ✅ Title */}
                <h2 className="text-center text-2xl font-semibold text-gray-800">
                    JAMB UTME Physics Practice Test
                </h2>
                <p className="text-center text-gray-500 text-sm mt-1">
                    Computer-Based Test Simulation For Joint Admissions And Matriculation Board Examination
                </p>

                {/* ✅ Main White Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 w-full max-w-2xl mx-auto mt-8">

                    <h3 className="text-center font-semibold text-gray-800">CBT Instructions</h3>
                    <p className="text-center text-gray-500 font-bold text-sm mt-1">
                        Get ready to test your knowledge across all Physics topics
                    </p>

                    {/* ✅ Numbers Section */}
                    <div className="flex justify-around text-gray-800 font-medium mt-8">
                        <div className="flex items-baseline gap-1">  <p className="font-poppins font-medium text-[32px] leading-[100%] tracking-normal text-[#FFA270] text-center capitalize">
                            40
                        </p>
                            <span className="text-gray-600 font-bold">questions</span>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <p className="font-poppins font-medium text-[32px] leading-[100%] tracking-normal text-[#FFA270] text-center capitalize">
                                45
                            </p>
                            <span className="text-gray-600 font-bold">Minutes</span>
                        </div>
<p className="font-poppins font-normal text-[32px] leading-[100%] tracking-normal text-center capitalize">
  Mixed
</p>

                    </div>

                    {/* ✅ Numbered Instructions */}
             <ul className="space-y-4 mt-8">
  {[
    "Each question carries equal marks.",
    "You have 45 minutes to complete the test.",
    "You can navigate between questions.",
    "Your score will show after submission.",
    "The test will auto-submit when time expires.",
  ].map((text, index) => (
    <li key={index} className="flex items-center gap-3 text-gray-600 text-sm">
      <span
        className="flex items-center justify-center bg-[#FFA270] text-white rounded-full font-medium"
        style={{ width: "26px", height: "26px" }}
      >
        {index + 1}
      </span>
      <span className="leading-tight">{text}</span>
    </li>
  ))}
</ul>

                </div>

                {/* ✅ Start Button */}
                <div className="flex flex-col items-center mt-8">
                    <button
                       onClick={() => router.push("/courses/pexam")}
                        className="bg-[linear-gradient(180deg,#FF9053_0%,#DB5206_100%)] text-white px-10 py-3 rounded-md font-medium shadow hover:opacity-90 transition"
                    >
                        Start Practice
                    </button>
                    <p className="text-xs text-gray-500 mt-2">All Physics topics included</p>
                </div>
            </main>
        </div>
    );
}
