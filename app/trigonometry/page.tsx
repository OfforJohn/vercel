"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Play } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import { useEffect, useState } from "react";

export default function TrigonometryLessonPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lessons = [
    { title: "Introduction to Trigonometry", time: "2:00" },
    { title: "Angles and Triangles Basics", time: "8:24" },
    { title: "Right-Angled Triangles", time: "4:09" },
    { title: "Trigonometric Ratios (Sine, Cosine, Tangent)", time: "2:54" },
    { title: "Solving Simple Trigonometry Problems", time: "7:23" },
  ];

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 flex justify-center pb-24">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
          {/* Left Section (Main Content) */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Back + Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                Introduction to Trigonometry
              </h1>
            </div>

            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden shadow-sm">
              <video
                src="/videos/trigonometry-intro.mp4"
                controls
                className="w-full h-64 sm:h-80 object-cover"
              ></video>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Subject Description
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Master the basics of trigonometry and build a strong foundation
                for tackling WAEC, JAMB, and Post-UTME math questions. This
                course simplifies the core concepts and provides real exam-style
                examples to boost your confidence.
              </p>

              <div className="text-gray-700 text-sm space-y-1">
                <p>What you'll learn:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Understanding angles and their measurement</li>
                  <li>The properties of right-angled triangles</li>
                  <li>Introduction to sine, cosine, and tangent ratios</li>
                  <li>Solving simple trigonometric problems</li>
                  <li>
                    Applying trigonometry in real-life and exam scenarios
                  </li>
                </ul>
              </div>

              <p className="text-sm text-gray-600 mt-3">
                <strong>Duration:</strong> 12 minutes (bite-sized learning)
                <br />
                <strong>Difficulty:</strong> Beginner <br />
                <strong>Recommended for:</strong> SSCE & JAMB candidates
                preparing for Mathematics sections
              </p>
            </div>

            {/* Video Credits */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">
                Video Credits
              </h3>
              <p className="text-sm text-gray-600">Credit: Joel & Estelle</p>
            </div>

            {/* Profile + Comment Section */}
        <div className="flex items-start gap-3 mt-4">
  {/* Avatar */}
  <img
    src="/cbt-practice-bg.jpg"
    alt="User Avatar"
    className="w-10 h-10 rounded-full object-cover mt-1"
  />

  {/* Input + Button Stack */}
  <div className="flex-1">
    <div className="w-3/4">
      <input
        type="text"
        placeholder="Enter your comment here..."
        className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
      />
      <div className="flex justify-end mt-2">
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 rounded-md transition">
          Add comment
        </button>
      </div>
    </div>
  </div>
</div>

          </div>

          {/* Right Section (Progress Sidebar) */}
  <aside className="w-full lg:w-80 flex-shrink-0 space-y-4">
  {/* Progress Section */}

    <div className="bg-white border border-[#DCE6F3] rounded-xl shadow-sm p-5 w-full max-w-sm">
      {/* Header */}
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Your Progress</h3>

      {/* Progress Info */}
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>15% Complete</span>
        <span>1/5</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
        <div className="bg-[#001A33] h-full w-[15%] transition-all duration-300" />
      </div>

      {/* Lessons List */}
      <ul className="text-sm space-y-1.5">
        {[
          { title: "Introduction to Trigonometry", time: "2:00" },
          { title: "Angles and Triangles Basics", time: "8:24" },
          { title: "Right-Angled Triangles", time: "4:09" },
          { title: "Trigonometric Ratios (Sine, Cosine, Tangent)", time: "2:54" },
          { title: "Solving Simple Trigonometry Problems", time: "7:23" },
        ].map((lesson, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
              index === 0
                ? "bg-[#001A33] text-white"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full border flex-shrink-0 ${
                  index === 0
                    ? "border-white bg-white/10"
                    : "border-gray-300 bg-white"
                }`}
              >
                <Play
                  className={`w-3 h-3 ${
                    index === 0 ? "text-white" : "text-gray-400"
                  }`}
                  fill={index === 0 ? "white" : "none"}
                />
              </div>
              <span className="truncate text-sm leading-snug max-w-[180px] sm:max-w-[220px]">
                {lesson.title}
              </span>
            </div>
            <span
              className={`text-xs flex-shrink-0 ml-2 ${
                index === 0 ? "text-gray-300" : "text-gray-400"
              }`}
            >
              {lesson.time}
            </span>
          </li>
        ))}
      </ul>
    </div>

  {/* Unlock Quiz */}
  <div className="bg-white border rounded-xl p-5">
    <h3 className="text-sm font-semibold text-gray-800 mb-3">
      Unlock Quiz
    </h3>
    <div className="flex items-center gap-3">
      {/* Lock Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-[#F7F9FC] rounded-full border border-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-[#9C6ADE]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 10V8a4 4 0 00-8 0v2M7 10h10a1 1 0 011 1v9a1 1 0 01-1 1H7a1 1 0 01-1-1v-9a1 1 0 011-1z"
          />
        </svg>
      </div>

      {/* Text */}
      <p className="text-xs text-gray-600 leading-relaxed">
        Complete <span className="font-medium text-gray-800">4 more lessons</span> to unlock Quiz.
      </p>
    </div>
  </div>

  {/* Claim Reward */}
  <div className="bg-white border rounded-xl p-5">
    <h3 className="text-sm font-semibold text-gray-800 mb-3">
      Claim Reward
    </h3>
    <div className="flex items-start gap-3 mb-4">
      {/* Trophy Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-[#FFF8E1] rounded-full border border-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-yellow-500"
        >
          <path d="M18 3h-2V2a1 1 0 00-1-1H9a1 1 0 00-1 1v1H6a1 1 0 00-1 1v3a5.002 5.002 0 004 4.9V15H8a2 2 0 000 4h8a2 2 0 000-4h-1v-3.1A5.002 5.002 0 0019 7V4a1 1 0 00-1-1zM7 7V5h2v3a3.001 3.001 0 01-2-.764V7zm10 0a3.001 3.001 0 01-2 .764V5h2v2z" />
        </svg>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed">
        Complete Quiz to claim Reward.
      </p>
    </div>
    <button
      disabled
      className="w-full bg-[#FDEAE5] text-gray-400 text-sm font-medium px-4 py-2 rounded-lg cursor-not-allowed"
    >
      Claim Reward
    </button>
  </div>
</aside>


        </div>
      </main>
    </div>
  );
}
