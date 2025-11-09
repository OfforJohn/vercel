"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Check, CheckCircle2, Play, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import FooterNav from "@/app/components/FooterNav";

export default function TrigonometryQuizPage() {
    
    const router = useRouter();

    const questions = [
        {
            id: 1,
            question: "Which side is opposite the right angle in a right-angled triangle?",
            options: ["Opposite", "Adjacent", "Hypotenuse", "Base"],
            correct: "Hypotenuse",
        },
        {
            id: 2,
            question: "Which trigonometric ratio is defined as Opposite ÷ Adjacent?",
            options: ["Sine", "Cosine", "Tangent", "Secant"],
            correct: "Tangent",
        },
        {
            id: 3,
            question: "The Pythagoras Theorem states:",
            options: ["a² + b² = c²", "a² - b² = c²", "a² + b² = c", "a + b = c²"],
            correct: "a² + b² = c²",
        },
    ];

    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showMobileModal, setShowMobileModal] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showXPModal, setShowXPModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const lessons = [
        { title: "Introduction to Trigonometry", time: "2:00" },
        { title: "Angles and Triangles Basics", time: "8:24" },
        { title: "Right-Angled Triangles", time: "4:09" },
        { title: "Trigonometric Ratios (Sine, Cosine, Tangent)", time: "2:54" },
        { title: "Solving Simple Trigonometry Problems", time: "7:23" },
    ];

    const [timeLeft, setTimeLeft] = useState(90);


    const [xpClaimed, setXpClaimed] = useState<boolean>(
       
    );
    const [progress, setProgress] = useState(0);

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


    // Timer
    useEffect(() => {
        if (submitted) return;
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }
        const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, submitted]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
        const seconds = (timeLeft % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const handleSelect = (qid: number, option: string) => {
        if (!submitted) {
            setAnswers((prev) => ({ ...prev, [qid]: option }));
        }
    };

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.correct) newScore += 5;
        });
        setScore(newScore);
        setSubmitted(true);

        if (window.innerWidth < 640) {
            setShowMobileModal(true);
        }

        localStorage.setItem("trigQuizScore", newScore.toString());
        localStorage.setItem("trigQuizCompleted", "true");

        setTimeout(() => setShowResult(true), 1000);
    };
    const handleClaimXP = () => {
        if (!submitted || xpClaimed) return;

        setXpClaimed(true);
        localStorage.setItem("trigQuizXPClaimed", "true");

        const currentXP = parseInt(localStorage.getItem("totalXP") || "0");


        // ✅ Hide modal after claiming
        setShowXPModal(false);
    };


    const handleSubmitRequest = () => {
        setShowConfirmModal(true);
    };

 const reallySubmit = () => {
  // Close the confirm modal
  setShowConfirmModal(false);

  // Show the spinner modal
  setShowSpinner(true);
  setProgress(0); // reset progress

  // Simulate grading delay (or async processing)
  setTimeout(() => {
    let newScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) newScore += 5;
    });

    // Save and update states
    setScore(newScore);
    setSubmitted(true);
    localStorage.setItem("trigQuizScore", newScore.toString());
    localStorage.setItem("trigQuizCompleted", "true");

    // Hide spinner and show XP modal
    setShowSpinner(false);
    setShowXPModal(true);
  }, 2500); // 2.5 seconds spinner time
};




    // ✅ --- FIXED STRUCTURE BELOW ---
    // Simple CircularDeterminate spinner component used by the modal
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

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 flex justify-center pb-24">
                <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
                    {/* --- Left Section (Quiz) --- */}
                    <div className="flex-1 max-w-2xl rounded-xl p-6 ">
                        {/* Header + Timer */}
                        <div className="flex justify-between items-center mb-6">
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
                            <div
                                className={`px-3 py-1 rounded-md text-sm ${timeLeft <= 15
                                    ? "text-red-600 border-red-400 bg-red-50"
                                    : "text-gray-700"
                                    }`}
                            >
                                ⏳ {formatTime()} Remaining
                            </div>
                        </div>

                        {/* Questions */}
                        {questions.map((q, index) => (
                            <div key={q.id} className="mb-8">
                                <h2 className="font-medium text-gray-400 mb-2">
                                    Question {index + 1} of {questions.length}
                                </h2>
                                <p className="text-sm font-bold text-gray-700 mb-2">
                                    {q.question}
                                </p>
                                <p className="text-[13px] text-gray-500 mb-3">
                                    +5 XP per correct answer
                                </p>

                                <div className="space-y-2">
                                    {q.options.map((option) => {
                                        const selected = answers[q.id] === option;
                                        const isCorrect = option === q.correct;
                                        const isWrong = selected && option !== q.correct;

                                        let bg = "border-gray-200 hover:bg-gray-50";
                                        if (submitted) {
                                            if (isCorrect) bg = "bg-green-100 border-green-400";
                                            else if (isWrong) bg = "bg-red-100 border-red-400";
                                        } else if (selected) {
                                            bg = "bg-orange-50 border-orange-400 text-orange-700";
                                        }

                                        return (
                                            <button
                                                key={option}
                                                disabled={submitted}
                                                onClick={() => handleSelect(q.id, option)}
                                                className={`w-full text-left border rounded-md p-3 text-sm transition-all flex justify-between items-center ${bg}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`w-3 h-3 rounded-full border transition-all ${submitted
                                                            ? isCorrect
                                                                ? "bg-green-500 border-green-600"
                                                                : isWrong
                                                                    ? "bg-red-500 border-red-600"
                                                                    : "bg-gray-200 border-gray-300"
                                                            : selected
                                                                ? "bg-orange-400 border-orange-500"
                                                                : "bg-gray-200 border-gray-300"
                                                            }`}
                                                    ></div>
                                                    <span>{option}</span>
                                                </div>

                                                {submitted && isCorrect && (
                                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                                )}
                                                {submitted && isWrong && (
                                                    <XCircle className="w-5 h-5 text-red-500" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {!submitted && (
                            <button
                                onClick={handleSubmitRequest}
                                disabled={Object.keys(answers).length < questions.length}
                                className={`mt-4 px-8 py-2 rounded-md text-white text-sm font-medium mx-auto block transition-all duration-300 ${Object.keys(answers).length < questions.length
                                        ? "bg-orange-200 cursor-not-allowed text-white/70"
                                        : "hover:opacity-90 shadow"
                                    }`}
                                style={
                                    Object.keys(answers).length < questions.length
                                        ? {}
                                        : { background: "linear-gradient(180deg, #FF9053 0%, #DB5206 100%)" }
                                }
                            >
                                Submit Quiz
                            </button>

                        )}
                    </div>

                    {/* --- Right Sidebar --- */}
                    <aside className="hidden lg:block w-full lg:w-80 flex-shrink-0 space-y-4">
                        {/* Progress */}
                        <div className="bg-white border border-[#DCE6F3] rounded-xl shadow-sm p-5">
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                Your Progress
                            </h3>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>100% Complete</span>
                                <span>{lessons.length}/{lessons.length}</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                                <div
                                    className="bg-[#001A33] h-full transition-all duration-300"
                                    style={{ width: `100%` }}
                                />
                            </div>
                            <ul className="text-sm space-y-1.5">
                                {lessons.map((lesson, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between p-2 rounded-lg bg-orange-50 text-orange-600"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-5 h-5 flex items-center justify-center rounded-full border border-orange-500 bg-orange-100">
                                                <Check className="w-3 h-3 text-orange-500" />
                                            </div>
                                            <span className="truncate text-sm">{lesson.title}</span>
                                        </div>
                                        <span className="text-xs text-orange-500">
                                            {lesson.time}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* ✅ Unlock Quiz Message */}
                        <div className="bg-white border rounded-xl p-5">
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                Unlock Quiz
                            </h3>
                            <p className="text-xs text-green-600 font-medium">
                                Quiz Unlocked! 🎉
                            </p>
                        </div>

                        {/* XP Section */}
                        <div className="bg-white border rounded-xl p-5">
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                Claim 10 XP
                            </h3>
                            <button
                                disabled={!submitted || xpClaimed}
                                onClick={handleClaimXP}
                                className={`w-full text-sm font-medium px-4 py-2 rounded-lg ${!submitted || xpClaimed
                                    ? "bg-[#FDEAE5] text-gray-400 cursor-not-allowed"
                                    : "bg-orange-500 text-white hover:bg-orange-600 transition"
                                    }`}
                            >
                                {xpClaimed ? "✅ XP Claimed" : "Claim 10 XP"}
                            </button>
                        </div>
                    </aside>
                </div>
            </main>


            {/* Modals */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg text-center space-y-4">
                        <h2 className="text-xl font-semibold">Are you sure?</h2>
                        <p className="text-gray-600 text-sm">Think carefully before submitting.</p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={reallySubmit}
                                className="bg-gradient-to-b from-[#004882] to-[#041D31] text-white px-6 py-2 rounded-lg text-sm"
                            >
                                Yes
                            </button>

                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="bg-gradient-to-b from-[#004882] to-[#041D31] text-white px-6 py-2 rounded-lg text-sm"
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



            {showXPModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg text-center space-y-4 animate-fadeIn">
                        <h2 className="text-xl font-semibold">Congratulations 🎉</h2>
                        <p className="text-gray-700 text-sm">
                            Your Score: {score}/{questions.length}
                        </p>
                        <p className="text-gray-700 text-sm">
                            You gained <span className="text-orange-500 font-bold">+10 XP</span>
                        </p>
<button
  onClick={() => setShowXPModal(false)}
  className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2.5 rounded-lg shadow"
>
  Continue to Claim Reward
</button>

                    </div>
                </div>
            )}


            {/* Footer (Mobile) */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
                <FooterNav />
            </div>
        </div>
    );
}
