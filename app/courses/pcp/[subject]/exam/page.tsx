"use client";

import { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import { useRouter, useParams } from "next/navigation";

export default function UnifiedCbtQuestionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 40;
  const router = useRouter();
  const { subject } = useParams();

  // Capitalize subject name
  const subjectName =
    subject && typeof subject === "string"
      ? subject.charAt(0).toUpperCase() + subject.slice(1)
      : "Subject";

  // ✅ Fixed orange theme
  const theme = {
    color: "#E66A32",
    gradientA: "#FF9053",
    gradientB: "#DB5206",
  };

  // ✅ Example placeholder questions
  const questionBank = {
    physics: {
      question:
        "A car moves with a uniform velocity of 20 m/s for 10 seconds. What distance does it cover?",
      options: ["100 m", "150 m", "200 m", "250 m"],
    },
    mathematics: {
      question: "Simplify: (3x + 2x) × 2",
      options: ["5x", "10x", "6x", "7x"],
    },
    biology: {
      question: "Which organelle is responsible for energy production in cells?",
      options: ["Ribosome", "Mitochondrion", "Nucleus", "Golgi apparatus"],
    },
    chemistry: {
      question: "Which of these is a noble gas?",
      options: ["Oxygen", "Nitrogen", "Neon", "Chlorine"],
    },
    english: {
      question: "Choose the correct synonym of 'Happy'.",
      options: ["Sad", "Joyful", "Angry", "Lonely"],
    },
  };

  const current =
    questionBank[subject as keyof typeof questionBank] || questionBank.physics;

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
          <div className="flex items-center justify-center w-full relative mb-6">
            <ArrowLeft
              className="text-gray-600 cursor-pointer absolute left-0"
              size={20}
              onClick={() => router.back()}
            />

            <h1 className="text-2xl font-semibold text-gray-800 text-center capitalize">
              {subjectName} CBT Practice
            </h1>
          </div>

          <div className="flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap flex-shrink-0">
            <Clock size={18} className="text-gray-600" />
            <span>45 : 00 remaining</span>
          </div>
        </div>

        {/* Question Section */}
        <div className="max-w-6xl mx-auto rounded-xl p-8">
          <p className="font-semibold max-w-2xl text-gray-800 mb-2">
            Question {currentQuestion} of {totalQuestions}
          </p>
          <p className="text-gray-700 mb-1">{current.question}</p>
          <p className="text-xs text-gray-500 mb-6">+5 XP per correct answer</p>

          {/* Options */}
          <div className="space-y-3 max-w-md">
            {current.options.map((text, i) => {
              const key = String.fromCharCode(65 + i);
              return (
                <label
                  key={key}
                  className={`flex items-center gap-3 border border-gray-300 rounded-md px-3 py-2 cursor-pointer transition
                    ${
                      selectedOption === key
                        ? `border-[${theme.color}] bg-orange-50`
                        : "hover:border-[#E66A32]/60"
                    }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={key}
                    checked={selectedOption === key}
                    onChange={() => setSelectedOption(key)}
                    className="accent-[#E66A32]"
                  />
                  <span className="text-gray-700 font-medium">
                    {key}. {text}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Navigation Buttons */}
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
                {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      className={`w-12 h-10 rounded-md text-sm font-medium border flex items-center justify-center
                        ${
                          num === currentQuestion
                            ? `bg-[${theme.color}] text-white border-[${theme.color}]`
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              className={`bg-[linear-gradient(180deg,${theme.gradientA}_0%,${theme.gradientB}_100%)] text-white font-medium px-8 py-2 rounded-md hover:opacity-90`}
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
