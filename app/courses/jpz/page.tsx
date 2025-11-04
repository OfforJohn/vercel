"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function SubjectCbtPracticePage() {
  const router = useRouter();
  const { subject } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F2F4F7] relative">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-[#031829]">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed z-50 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 bg-[#031829] h-screen shadow-lg">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>

      {/* PAGE CONTENT */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-10 py-6">
        {/* Back */}
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

        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800">
          JAMB UTME Past Questions
        </h2>
        <p className="text-center font-bold text-gray-500 text-sm mt-1">
          Access and practice real past questions by year
        </p>

        {/* MAIN WHITE CARD */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 w-full max-w-3xl mx-auto mt-10">

          {/* Year + Subject */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
            {/* Year */}
            <div>
              <p className="text-sm  font-bold text-gray-700 mb-1">Year</p>
              <div className="border border-gray-300 rounded-md px-3 py-2 flex items-center w-32">
                <span className="text-gray-700 text-sm">2022</span>
                <svg
                  className="w-4 h-4 text-gray-500 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Subject */}
            <div>
              <p className="text-sm font-bold text-gray-700 mb-1">Subject</p>
         <div className="flex flex-wrap gap-2">
  {["Mathematics", "English Language", "Chemistry", "Physics"].map((tag, i) => (
    <span
      key={i}
      className="px-3 py-[6px] text-xs border border-[#FF9F79] rounded-md text-gray-700"
      style={{ background: "#FFE9DD" }}
    >
      {tag}
    </span>
  ))}
</div>

            </div>
          </div>

          {/* Question Mode */}
       <p className="text-sm font-bold text-gray-700 mt-8">
  Question Mode :{" "}
  <span
    className="cursor-pointer"
    style={{
      fontFamily: "Poppins",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0%",
      color: "#FF9053",
    }}
  >
    Exam Mode
  </span>
</p>


          {/* PAST QUESTION CARD */}
          <div className="border border-gray-200 rounded-lg p-5 mt-6 bg-white">
            <p className="font-semibold text-gray-800">
              JAMB UTME – 2022 Past Questions
            </p>

            <p className="text-gray-500 text-sm mt-1">180 Questions &nbsp;•&nbsp; 2hrs &nbsp;•&nbsp; CBT format</p>

        
     <div className="flex items-center gap-2 mt-3 text-gray-500 text-xs font-medium">
  <span className="w-3 h-3 bg-[#FF8055] rounded-full flex items-center justify-center">
    <Check className="w-[8px] h-[8px] text-white" strokeWidth={3} />
  </span>
  Includes answers & explanations
</div>



            <button
              onClick={() => router.push(`/courses/pcp/${subject}/exam`)}
              className="mt-6 bg-[linear-gradient(180deg,#FF9053_0%,#DB5206_100%)] text-white px-6 py-2.5 rounded-md font-medium text-sm shadow hover:opacity-90 transition"
            >
              Start Past Questions Test
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
