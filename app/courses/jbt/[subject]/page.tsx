"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Menu } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import { subjectsData, SubjectData } from "@/app/data/subjects";
import { useRouter, useParams, useSearchParams } from "next/navigation";

export default function UnifiedCbtQuestionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const subject = params.subject as string;
  const currentSubject: SubjectData = subjectsData[subject] || subjectsData.physics;

  const totalQuestions = currentSubject.questions.length;
  const currentQuestion = currentSubject.questions[currentQuestionIndex];

  const subjectKeys = Object.keys(subjectsData);

  useEffect(() => {
    setAnswers(Array(totalQuestions).fill(""));
  }, [totalQuestions]);

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

  const isCorrect = (optionKey: string) => optionKey === currentQuestion.answer;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Desktop */}
      <div className="hidden md:block w-64">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#031829] transition-transform md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-10 py-6">
  
        {/* Top Bar */}
  <div className="flex items-center justify-between mb-6 w-full relative">
  {/* Left Arrow */}
  <ArrowLeft
    className="text-gray-600 cursor-pointer w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
    onClick={() => router.back()}
  />

  {/* Center Title */}
  <h1
    className="text-base sm:text-lg md:text-2xl font-semibold text-gray-900 text-center flex-1 truncate mx-4"
    title="JAMB UTME Past Questions"
  >
    JAMB UTME Past Questions
  </h1>

  {/* Timer */}
  <div className="flex items-center gap-1 sm:gap-2 text-gray-700 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
    <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
    <span>2 : 00 : 00 remaining</span>
  </div>
</div>



        <div
          className="
    w-[320px] sm:w-[500px] md:w-[700px] lg:w-[850px] xl:w-[1000px]
    mx-auto transition-all duration-300
  "
        >

          {/* ✅ SUBJECT TABS */}
          <div
            className="
      relative flex items-center justify-between
      gap-6 sm:gap-10 md:gap-12 lg:gap-14
      border-b-[2px] border-gray-200 pb-0
      w-full max-w-3xl        /* ✅ reduces total width */
      text-base sm:text-lg md:text-xl lg:text-2xl
    "
          >
            {subjectKeys.slice(0, 4).map((sub) => {
              const active = sub === subject;
              return (
                <button
                  key={sub}
                  onClick={() => router.push(`/courses/jbt/${sub}`)}
                  className={`relative pb-5 transition-colors ${active ? "text-black" : "text-gray-500 hover:text-black"
                    }`}
                >
                  {subjectsData[sub].name}

                  {active && (
                    <span
                      className="
      absolute left-1/2 bottom-0 -translate-x-1/2
      w-[90px] h-[18px]
      bg-gradient-to-b from-[#FF9053] to-[#DB5206]
      rounded-t-[14px] rounded-b-[6px] shadow-sm
    "
                    />
                  )}

                </button>
              );
            })}
          </div>


          {/* ✅ QUESTION TITLE */}
          <div className="mt-6">
            <h2 className="font-semibold text-gray-800">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h2>
            <p className="mt-2 font-bold text-gray-600">{currentQuestion.question}</p>
            <p className="text-xs text-gray-500 mt-1">+5 XP per correct answer</p>
          </div>

          {/* ✅ OPTIONS */}
          <div className="mt-5 space-y-3 max-w-xl">
            {currentQuestion.options.map((opt, index) => {
              const key = String.fromCharCode(65 + index);
              const userAnswer = answers[currentQuestionIndex];

              let border = "border-gray-300";
              let bg = "bg-white";

              if (userAnswer) {
                if (isCorrect(key)) {
                  border = "border-green-500";
                  bg = "bg-green-100";
                } else if (userAnswer === key) {
                  border = "border-red-500";
                  bg = "bg-red-100";
                }
              } else if (selectedOption === key) {
                border = "border-[#FF9053]";
                bg = "bg-orange-50";
              }

              return (
                <label
                  key={key}
                  className={`flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer transition ${border} ${bg}`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={key}
                    checked={selectedOption === key}
                    onChange={() => handleOptionSelect(key)}
                    className="accent-[#FF9053]"
                    disabled={!!userAnswer}
                  />
                  <span className="text-gray-800 font-medium">
                    {key}. {opt}
                  </span>
                </label>
              );
            })}
          </div>

          {/* ✅ EXPLANATION */}
          {answers[currentQuestionIndex] && (
            <div className="mt-5 border-t border-gray-200 pt-3 max-w-xl">
              <p className="text-green-700 font-semibold">
                Correct Answer:
                <span className="ml-1">{currentQuestion.answer}</span>
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {currentQuestion.explanation || "No explanation provided."}
              </p>
            </div>
          )}

          {/* ✅ NAVIGATION */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={goPrevious}
              disabled={currentQuestionIndex === 0}
              className="bg-[#001A6B] text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={goNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="bg-green-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* ✅ QUESTION TRACKER */}
          <div className="mt-10">
            <p className="bg-[#818E98] text-white text-sm font-medium rounded-md px-6 py-1 w-fit">
              Attempted {answers.filter(Boolean).length}/{totalQuestions}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => {
                const isCurrent = num === currentQuestionIndex + 1;
                const userAnswer = answers[num - 1];

                let styles = "bg-white border-gray-300 text-gray-700 border";

                if (isCurrent) {
                  styles = "bg-[#FF9053] border-[#FF9053] text-white";
                } else if (userAnswer) {
                  styles = "bg-orange-200 border-orange-200 text-gray-800";
                }

                return (
                  <button
                    key={num}
                    onClick={() => {
                      setCurrentQuestionIndex(num - 1);
                      setSelectedOption(answers[num - 1] || "");
                    }}
                    className={`w-11 h-10 flex items-center justify-center rounded-md text-sm font-medium border ${styles}`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ✅ SUBMIT */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSubmit}
              disabled={answers.includes("")}
              className="bg-gradient-to-b from-[#FF9053] to-[#DB5206] text-white px-8 py-2 rounded-md disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
