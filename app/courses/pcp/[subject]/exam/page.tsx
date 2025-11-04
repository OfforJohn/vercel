"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Menu } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import { subjectsData, SubjectData } from "@/app/data/subjects";
import { useRouter, useParams } from "next/navigation";

export default function UnifiedCbtQuestionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();
  const { subject } = useParams();

  const currentSubject: SubjectData =
    (subject && subjectsData[subject as keyof typeof subjectsData]) ||
    subjectsData.physics;

  const totalQuestions = currentSubject.questions.length;
  const currentQuestion = currentSubject.questions[currentQuestionIndex];

  // Initialize answers on first render
  useEffect(() => {
    setAnswers(Array(totalQuestions).fill(""));
  }, [totalQuestions]);

  const theme = {
    color: "#E66A32",
    gradientA: "#FF9053",
    gradientB: "#DB5206",
  };

  const subjectName = currentSubject.name;

  const handleOptionSelect = (key: string) => {
    if (submitted) return;
    setSelectedOption(key);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = key;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(answers[currentQuestionIndex + 1] || "");
    }
  };

  const goPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] || "");
    }
  };

  const handleSubmit = () => setSubmitted(true);

  const isCorrect = (optionKey: string) =>
    optionKey === currentQuestion.answer;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (desktop) */}
      <div className="hidden md:block w-64">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Sidebar (mobile overlay) */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#031829] shadow-lg transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 px-6 md:px-12 py-8">
        {/* Mobile header with menu */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {subjectName} CBT
          </h1>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Clock size={18} className="text-gray-600" />
            <span className="text-sm">45:00</span>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between mb-6">
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
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
          <p className="text-gray-700 mb-1">{currentQuestion.question}</p>
          <p className="text-xs text-gray-500 mb-6">
            +5 XP per correct answer
          </p>

          {/* Options */}
          <div className="space-y-3 max-w-md">
            {currentQuestion.options.map((text, i) => {
              const key = String.fromCharCode(65 + i);
              let borderColor = "border-gray-300";
              let bgColor = "bg-white";
              const hasAnswered = answers[currentQuestionIndex] !== "";

              if (hasAnswered) {
                if (isCorrect(key)) {
                  borderColor = "border-green-500";
                  bgColor = "bg-green-100";
                } else if (answers[currentQuestionIndex] === key && !isCorrect(key)) {
                  borderColor = "border-red-500";
                  bgColor = "bg-red-100";
                }
              } else if (selectedOption === key) {
                borderColor = "border-[#E66A32]";
                bgColor = "bg-orange-50";
              }

              return (
                <label
                  key={key}
                  className={`flex items-center gap-3 border rounded-md px-3 py-2 cursor-pointer transition
                  ${borderColor} ${bgColor} 
                  hover:border-[#E66A32] hover:bg-orange-50`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={key}
                    checked={selectedOption === key}
                    onChange={() => handleOptionSelect(key)}
                    className="accent-[#E66A32]"
                    disabled={hasAnswered}
                  />
                  <span className="text-gray-700 font-medium">
                    {key}. {text}
                  </span>
                </label>
              );
            })}

            {/* Correct Answer Explanation */}
            {answers[currentQuestionIndex] && (
              <div className="mt-5 border-t border-gray-200 pt-4">
                <p className="text-green-700 font-semibold mb-1">
                  Correct Answer:
                  <span className="ml-1 text-green-800 font-medium">
                    {currentQuestion.answer}.
                  </span>
                </p>
                {currentQuestion.explanation ? (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No explanation provided.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-start mt-8 gap-3">
            <button
              onClick={goPrevious}
              disabled={currentQuestionIndex === 0}
              className="bg-[linear-gradient(180deg,#1D54BA_-31.11%,#002467_98.89%)] 
                         text-white font-medium px-6 py-2 rounded-md hover:opacity-90 disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={goNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="bg-[linear-gradient(180deg,#369E65_0%,#004C22_100%)] 
                         text-white font-medium px-6 py-2 rounded-md hover:opacity-90 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Question Tracker */}
          <div className="mt-10">
            <p
              className="bg-[#818E98] text-white text-sm font-medium rounded-md"
              style={{ width: "163px", height: "37px", padding: "8px 24px" }}
            >
              Attempted {answers.filter(Boolean).length}/{totalQuestions}
            </p>

            <div className="mt-4 w-full">
              <div className="flex flex-wrap gap-2">
             {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => {
  const isCurrent = num === currentQuestionIndex + 1;
  const userAnswer = answers[num - 1];
  const correctAnswer = currentSubject.questions[num - 1].answer;

  let bgColor = "bg-white";
  let textColor = "text-gray-700";
  let borderColor = "border-gray-300";

  if (submitted) {
    if (userAnswer) {
      if (userAnswer === correctAnswer) {
        bgColor = "bg-green-600";
        textColor = "text-white";
        borderColor = "border-green-600";
      } else {
        bgColor = "bg-red-600";
        textColor = "text-white";
        borderColor = "border-red-600";
      }
    }
  } else if (isCurrent) {
    bgColor = "bg-[#E66A32]";
    textColor = "text-white";
    borderColor = "border-[#E66A32]";
  } else if (userAnswer) {
    bgColor = "bg-orange-200";
    borderColor = "border-orange-200";
  }

  return (
    <button
      key={num}
      className={`w-12 h-10 rounded-md text-sm font-medium border flex items-center justify-center transition ${bgColor} ${textColor} ${borderColor}`}
      onClick={() => {
        setCurrentQuestionIndex(num - 1);
        setSelectedOption(answers[num - 1] || "");
      }}
    >
      {num}
    </button>
  );
})}

              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              className={`bg-[linear-gradient(180deg,${theme.gradientA}_0%,${theme.gradientB}_100%)] 
                         text-white font-medium px-8 py-2 rounded-md hover:opacity-90
                         disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleSubmit}
              disabled={answers.includes("")}
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
