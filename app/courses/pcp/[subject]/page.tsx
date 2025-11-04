"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const subjectInfo = {
  physics: {
    title: "JAMB UTME Physics Practice Test",
    description: "Computer-Based Test Simulation For Joint Admissions And Matriculation Board Examination",
    questions: 40,
    minutes: 45,
    color: "#FFA270",
  },
  mathematics: {
    title: "JAMB UTME Mathematics Practice Test",
    description: "Sharpen your quantitative reasoning and problem-solving skills.",
    questions: 50,
    minutes: 60,
    color: "#3B82F6",
  },
  biology: {
    title: "JAMB UTME Biology Practice Test",
    description: "Test your understanding of biological concepts and principles.",
    questions: 40,
    minutes: 45,
    color: "#22C55E",
  },
  chemistry: {
    title: "JAMB UTME Chemistry Practice Test",
    description: "Challenge yourself with stoichiometry, organic chemistry, and more.",
    questions: 40,
    minutes: 45,
    color: "#EAB308",
  },
  english: {
    title: "JAMB UTME English Language Practice Test",
    description: "Improve your grammar, comprehension, and vocabulary.",
    questions: 60,
    minutes: 60,
    color: "#9333EA",
  },
};

export default function SubjectCbtPracticePage() {
  const router = useRouter();
  const { subject } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const data = subjectInfo[subject as keyof typeof subjectInfo] || {
    title: "JAMB UTME Practice Test",
    description: "Prepare for your JAMB UTME exams.",
    questions: 40,
    minutes: 45,
    color: "#FFA270",
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] relative">
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

      <div
        className={`fixed z-50 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 bg-[#031829] h-screen shadow-lg">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>

      {/* Page Content */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-10 py-6">
        {/* Back Button */}
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
          {data.title}
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">{data.description}</p>

        {/* Main White Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 md:p-8 w-full max-w-lg sm:max-w-2xl mx-auto mt-8">
          <h3 className="text-center font-semibold text-gray-800">CBT Instructions</h3>
          <p className="text-center text-gray-500 font-bold text-sm mt-1">
            Get ready to test your knowledge across all {subject} topics
          </p>

          {/* Numbers Section */}
          <div className="flex flex-col sm:flex-row justify-around items-center text-gray-800 font-medium mt-8 gap-4">
            <div className="flex items-baseline gap-1">
              <p
                className="font-poppins font-medium text-[24px] sm:text-[28px] md:text-[32px]"
                style={{ color: data.color }}
              >
                {data.questions}
              </p>
              <span className="text-gray-600 font-bold">questions</span>
            </div>

            <div className="flex items-baseline gap-1">
              <p
                className="font-poppins font-medium text-[24px] sm:text-[28px] md:text-[32px]"
                style={{ color: data.color }}
              >
                {data.minutes}
              </p>
              <span className="text-gray-600 font-bold">Minutes</span>
            </div>

            <p className="font-poppins font-normal text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] text-center capitalize">
              Mixed
            </p>
          </div>

          {/* Instructions List */}
          <ul className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
            {[
              "Each question carries equal marks.",
              "You have limited time to complete the test.",
              "You can navigate between questions.",
              "Your score will show after submission.",
              "The test will auto-submit when time expires.",
            ].map((text, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                <span
                  className="flex items-center justify-center text-white rounded-full font-medium"
                  style={{
                    backgroundColor: data.color,
                    width: "24px",
                    height: "24px",
                  }}
                >
                  {index + 1}
                </span>
                <span className="leading-tight">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Start Button */}
        <div className="flex flex-col items-center mt-6 sm:mt-8">
          <button
            onClick={() => router.push(`/courses/pcp/${subject}/exam`)}
            className="bg-[linear-gradient(180deg,#FF9053_0%,#DB5206_100%)] text-white px-6 sm:px-10 py-3 rounded-md font-medium shadow hover:opacity-90 transition w-full sm:w-auto text-center"
          >
            Start Practice
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            All {subject} topics included
          </p>
        </div>
      </main>
    </div>
  );
}
