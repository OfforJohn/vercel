"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { ArrowLeft } from "lucide-react";

export default function PhysicsCbtPracticePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* ✅ Sidebar */}
      <div className="hidden md:block w-64 bg-[#031829]">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* ✅ Mobile Sidebar */}
      <div className="md:hidden fixed z-30">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* ✅ Main content */}
      <main className="flex-1 flex flex-col px-6 md:px-10 py-8">
        {/* Back arrow */}
        <div className="flex items-center mb-6">
          <ArrowLeft size={20} className="text-gray-600 cursor-pointer" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Physics CBT Practice
        </h1>

        {/* Central content */}
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Info Box */}
          <div className="bg-gray-100 rounded-xl py-8 px-6 text-center w-full max-w-md mb-8">
            <p className="text-gray-600 mb-6">
              Get ready to test your knowledge across all Physics topics
            </p>

            <div className="flex justify-between text-gray-800 font-medium px-4">
              <div>
                <p className="text-3xl font-semibold">40</p>
                <p className="text-sm text-gray-500">questions</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">45</p>
                <p className="text-sm text-gray-500">Minutes</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Mixed</p>
                <p className="text-sm text-gray-500">Difficulty</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <ul className="text-gray-600 text-sm list-disc list-inside mb-8">
            <li>Each question carries equal marks.</li>
            <li>You can skip and return to any question.</li>
            <li>Your score will appear after submission.</li>
          </ul>

          {/* Start button */}
          <button
            onClick={() => alert("Starting Physics CBT Practice...")}
            className="bg-gradient-to-r from-[#E66A32] to-[#8F3E0A] text-white font-medium px-10 py-3 rounded-md transition hover:opacity-90"
          >
            Start Practice
          </button>

          <p className="text-xs text-gray-500 mt-2">All topics included</p>
        </div>
      </main>
    </div>
  );
}
