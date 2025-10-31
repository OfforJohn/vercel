"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CbtPracticePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
  

  const attempts = [
    { id: 1, score: "34%" },
    { id: 2, score: "34%" },
    { id: 3, score: "34%" },
    { id: 4, score: "34%" },
      { id: 5, score: "100%" },
    { id: 6, score: "100%" },
    { id: 7, score: "100%" },
    { id: 8, score: "100%" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="fixed md:static z-20">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 w-full">
        {/* Banner */}
        <div className="relative w-full h-64 md:h-72 lg:h-80">
          <Image
            src="/cbt-banner.jpg"
            alt="CBT Practice Banner"
            fill
            className="object-cover"
          />
        </div>

        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center py-10 px-4">
        <div className="text-left md:ml-8">
  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
    📝 CBT Practice
  </h1>
  <p className="text-gray-500 mt-2">
    Practice mock tests and improve your CBT skills
  </p>
</div>

<Button
  onClick={() => router.push("/courses/start-practice")}
  className="mt-6 text-white px-6 py-3 rounded-lg text-sm md:text-base shadow-md transition-all duration-300 hover:opacity-90"
  style={{
    background: "linear-gradient(180deg, #FF9053 0%, #DB5206 100%)",
  }}
>
  Start CBT Practice
</Button>


        </div>

   {/* Previous Attempts — OUTSIDE MODAL */}
<h2 className="text-lg font-semibold text-gray-800 mt-8 mb-3 max-w-4xl mx-auto text-left">
  Previous Attempts
</h2>

<div className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl p-6 md:p-10 mb-10">
  <div className="divide-y divide-gray-200">
    {attempts.map((attempt, index) => (
      <div
        key={attempt.id}
        className="flex items-center justify-between py-4 px-3 hover:bg-gray-100 rounded-lg transition cursor-pointer"
      >
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm">
            Attempt {index + 1}
          </span>
          <span className="text-xs text-gray-500">
            Score: {attempt.score}%
          </span>
        </div>

        <span className="text-gray-400 text-sm">{">"}</span>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
}
