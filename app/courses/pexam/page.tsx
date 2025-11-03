"use client";

import { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import { useRouter } from "next/navigation";

export default function PhysicsCbtQuestionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("C");
  const totalQuestions = 40;
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (desktop) */}
      <div className="hidden md:block w-64">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main content */}
      <main className="flex-1 px-6 md:px-12 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
      {/* Header */}
<div className="flex items-center justify-center w-full relative mb-6">
  <ArrowLeft
    className="text-gray-600 cursor-pointer absolute left-0"
    size={20}
    onClick={() => router.back()}
  />

  <h1 className="text-2xl font-semibold text-gray-800 text-center">
    Physics CBT Practice
  </h1>
</div>


       <div className="flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap flex-shrink-0">
  <Clock size={18} className="text-gray-600" />
  <span>45 : 00 remaining</span>
</div>

        </div>
        

        {/* Question Section */}
        <div className="max-w-6xl mx-auto rounded-xl  p-8">
          <p className="font-semibold max-w-2xl text-gray-800 mb-2">
            Question {currentQuestion} of {totalQuestions}
          </p>
          <p className="text-gray-700 mb-1">
            A car moves with a uniform velocity of 20 m/s for 10 seconds. What
            distance does it cover?
          </p>
          <p className="text-xs text-gray-500 mb-6">+5 XP per correct answer</p>

          {/* Options */}
    {/* Options */}
<div className="space-y-3 max-w-md">
  {[
    { key: "A", text: "100 m" },
    { key: "B", text: "150 m" },
    { key: "C", text: "200 m" },
    { key: "D", text: "250 m" },
  ].map((option) => (
    <label
      key={option.key}
      className={`flex items-center gap-3 border border-gray-300 rounded-md px-3 py-2 cursor-pointer transition
        ${
          selectedOption === option.key
            ? "border-[#E66A32] bg-orange-50"
            : "hover:border-[#E66A32]/60"
        }`}
    >
      <input
        type="radio"
        name="answer"
        value={option.key}
        checked={selectedOption === option.key}
        onChange={() => setSelectedOption(option.key)}
        className="accent-[#E66A32]"
      />
      <span className="text-gray-700 font-medium">
        {option.key}. {option.text}
      </span>
    </label>
  ))}
</div>


          {/* Navigation Buttons */}
       <div className="flex justify-start mt-8 gap-3">
  <button
    className="bg-[linear-gradient(180deg,#1D54BA_-31.11%,#002467_98.89%)] 
               text-white font-medium px-6 py-2 rounded-md hover:opacity-90">
    Previous
  </button>

  <button
    className="bg-[linear-gradient(180deg,#369E65_0%,#004C22_100%)] 
               text-white font-medium px-6 py-2 rounded-md hover:opacity-90">
    Next
  </button>
</div>


          {/* Question Tracker */}
          <div className="mt-10">
         <p
  className="
    bg-[#818E98]
    text-white
    text-sm
    font-medium
    rounded-md
   "
  style={{
    width: "163px",
    height: "37px",
    padding: "8px 24px"
  }}
>
  Attempted {currentQuestion}/{totalQuestions}
</p>

           <div className="mt-4 w-full">
  <div className="flex flex-wrap gap-2">
    {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
      <button
        key={num}
        className={`w-12 h-10 rounded-md text-sm font-medium border flex items-center justify-center
          ${
            num === currentQuestion
              ? "bg-[#E66A32] text-white border-[#E66A32]"
              : " border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
      >
        {num}
      </button>
    ))}
  </div>
</div>

          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button className="bg-[linear-gradient(180deg,#FF9053_0%,#DB5206_100%)] text-white font-medium px-8 py-2 rounded-md hover:opacity-90">
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
