"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUp, Check, Clock, Menu, ShieldCheck } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import { subjectsData, SubjectData } from "@/app/data/subjects";
import { useRouter, useParams, useSearchParams } from "next/navigation";

export default function UnifiedCbtQuestionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const router = useRouter();
  const [score, setScore] = useState(0);
  const params = useParams();
  const searchParams = useSearchParams();
  const [showResultModal, setShowResultModal] = useState(false);


  const subject = params.subject as string;
  const currentSubject: SubjectData = subjectsData[subject] || subjectsData.physics;

  const totalQuestions = currentSubject.questions.length;
  const currentQuestion = currentSubject.questions[currentQuestionIndex];

  const subjectKeys = Object.keys(subjectsData);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`cbt-answers-${subject}`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setSelectedOption(JSON.parse(savedAnswers)[currentQuestionIndex] || "");
    } else {
      setAnswers(Array(totalQuestions).fill(""));
    }
  }, [totalQuestions, subject, currentQuestionIndex]);


  const handleOptionSelect = (key: string) => {
    if (submitted) return;

    setSelectedOption(key);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = key;
    setAnswers(newAnswers);

    // Save to localStorage
    localStorage.setItem(`cbt-answers-${subject}`, JSON.stringify(newAnswers));
  };

  function CircularDeterminate({ progress }: { progress: number }) {
    return (
      <div className="w-32 h-32 rounded-fullflex flex-col items-center justify-center ">
        <svg className="w-20 h-20" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="2"
            stroke="rgba(0,0,0,0.08)"
          />
          <path
            d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="2.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeDasharray={`${progress}, 100`}
            className="text-orange-500"
          />
        </svg>
      </div>
    );
  }

  useEffect(() => {
    if (showSpinner) {
      let start = 0;
      const timer = setInterval(() => {
        start += 5;
        if (start > 100) {
          clearInterval(timer);
        } else {
          setProgress(start);
        }
      }, 100); // speed
      return () => clearInterval(timer);
    }
  }, [showSpinner]);


const reallySubmit = () => {
  setShowConfirmModal(false);
  setShowSpinner(true);
  setProgress(0);

  setTimeout(() => {
    let newScore = 0;
    currentSubject.questions.forEach((q, i) => {
      if (answers[i] === q.answer) newScore += 5;
    });

    setScore(newScore);
    setSubmitted(true);
    localStorage.setItem(`${subject}-score`, newScore.toString());
    localStorage.setItem(`${subject}-completed`, "true");

    setShowSpinner(false);
    setShowResultModal(true); // ✅ show result modal after spinner
  }, 2500);
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

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmSubmit = () => {
    setSubmitted(true);
    setShowConfirmModal(false);
  };

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
    gap-4 sm:gap-6 md:gap-10 lg:gap-14
    border-b-[2px] border-gray-200 pb-0
    w-full sm:max-w-sm md:max-w-md lg:max-w-3xl
    text-sm sm:text-base md:text-lg lg:text-2xl
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

          {showConfirmModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
              <div className="bg-white w-full max-w-sm rounded-2xl p-8 shadow-lg text-center space-y-6 min-h-[260px] flex flex-col justify-center">
                <h2 className="text-xl font-semibold">Are you sure?</h2>
                <p className="text-gray-600 text-sm">Think carefully before submitting.</p>

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={reallySubmit}
                    className="bg-gradient-to-b from-[#004882] to-[#041D31] text-white px-6 py-2 rounded-lg text-sm"
                  >
                    Yes
                  </button>

                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg text-sm"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          {showSpinner && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
              }}
            >
              <CircularDeterminate progress={progress} />
            </div>
          )}

{showResultModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <div className="relative bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center">
      {/* confetti icons (top-left & top-right) */}
{/* Title Row with confetti icons */}
<div className="flex items-center justify-center gap-2 mt-2">
  <span className="text-2xl select-none">🎉</span>
  <h3 className="text-2xl font-semibold text-gray-900">Great job!</h3>
  <span className="text-2xl select-none">🎉</span>
</div>


      {/* Score row */}
{/* score + timer row */}
<div className="mt-4 flex items-start justify-start gap-6 px-4">
  {/* blue badge + label */}
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
      <ShieldCheck className="w-5 h-5 text-blue-600" />
    </div>
    <div className="text-left">
      <div className="text-sm text-gray-700 font-medium">You Scored</div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold text-gray-900">{score}</span>
        <span className="text-sm text-gray-500">
          / {currentSubject.questions.length * 5}
        </span>
      </div>
    </div>
  </div>

  {/* timer */}
  <div className="flex items-center gap-2 pt-1">
    <Clock className="w-4 h-4 text-gray-600" />
    <div className="text-xs text-gray-600">2 hrs&nbsp;&nbsp;00 secs</div>
  </div>
</div>

{/* percentage & XP row */}
<div className="mt-5 flex flex-col items-start justify-start gap-3 px-4">
  {/* percentage */}
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
      <ArrowUp className="w-4 h-4 text-emerald-600" />
    </div>
    <div className="text-lg font-semibold text-emerald-600">
      {Math.round(
        (score / (currentSubject.questions.length * 5 || 1)) * 100
      )}
      %
    </div>
  </div>

  {/* XP */}
<div className="flex items-center gap-2">
  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
    <div className="text-yellow-600 font-bold text-lg">ψ</div>
  </div>
  <div className="text-left">
    <div className="text-sm font-semibold text-yellow-600">
      +
      {Math.round(
        (Math.round(
          (score / (currentSubject.questions.length * 5 || 1)) * 100
        ) / 100) * 175
      )}{" "}
      XP
    </div>
  
  </div>
  
</div>

</div>
  <div className="text-xs text-gray-500 leading-snug mt-0.5">
      Great job! You've earned{" "}
      {Math.round(
        (Math.round(
          (score / (currentSubject.questions.length * 5 || 1)) * 100
        ) / 100) * 175
      )}{" "}
      XP for completing this CBT Practice.
    </div>
{/* progress bar */}
<div className="mt-5 px-4 w-full">
  <div className="bg-gray-200 h-2 rounded-full relative overflow-hidden">
    <div
      className="absolute left-0 top-0 h-2 bg-green-500 rounded-full"
      style={{
        width: `${Math.min(
          100,
          Math.round(
            (score / (currentSubject.questions.length * 5 || 1)) * 100
          )
        )}%`,
      }}
    ></div>

    {/* handle */}
    <div
      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"
      style={{
        left: `calc(${Math.min(
          100,
          Math.round(
            (score / (currentSubject.questions.length * 5 || 1)) * 100
          )
        )}% - 0.25rem)`,
      }}
    ></div>
  </div>
  <div className="text-xs text-gray-400 mt-2">500 / 10000 XP</div>
</div>

      {/* show result button */}
      <div className="mt-6">
        <button
          onClick={() => {
            setShowResultModal(false);
            // route to result page if you want:
            // router.push(`/courses/jbt/${subject}/result`);
          }}
          className="mx-auto bg-gradient-to-b from-[#FF9053] to-[#DB5206] hover:opacity-95 text-white px-6 py-2 rounded-full text-sm shadow-md"
        >
          Show result
        </button>
      </div>
    </div>
  </div>
)}




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

              const isSelected = userAnswer === key;

              let border = "border-gray-300";
              let bg = "bg-white";

              if (isSelected) {
                border = "border-[#FF9053]";
                bg = "bg-orange-50";
              }

              return (
                <label
                  key={key}
                  className={`flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer transition-colors duration-200 relative
    ${border} ${bg} 
    ${!userAnswer ? "hover:border-[#FF9053] hover:bg-orange-50" : ""}`}
                >
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded-full border ${isSelected ? "bg-[#FF8055] border-[#FF8055]" : "border-gray-300"
                      }`}
                  >
                    {isSelected && <Check className="w-[8px] h-[8px] text-white" strokeWidth={3} />}
                  </span>

                  <input
                    type="radio"
                    name="answer"
                    value={key}
                    checked={isSelected}
                    onChange={() => handleOptionSelect(key)}
                    className="hidden"
                  />

                  <span className="text-gray-800 font-medium flex-1">
                    {key}. {opt}
                  </span>
                </label>

              );
            })}

          </div>





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
              onClick={() => setShowConfirmModal(true)}
              disabled={answers.some((ans) => ans === "")}
              className={`px-8 py-2 rounded-md text-white transition-colors duration-300
    ${answers.some((ans) => ans === "")
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-b from-[#FF9053] to-[#DB5206] hover:opacity-90"
                }`}
            >
              Submit
            </button>

          </div>
        </div>

      </main>
    </div>
  );
}
