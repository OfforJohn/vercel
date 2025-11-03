"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CbtPracticePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const attempts = [
    { id: 1, title: "JAMB PQ 2020", score: 34 },
    { id: 2, title: "WAEC ENGLISH", score: 34 },
    { id: 3, title: "JAMB MATHEMATICS", score: 34 },
    { id: 4, title: "NECO SSCE CHEMISTRY", score: 34 },
    { id: 5, title: "JAMB PQ 2019", score: 34 },
  ];

  const progress = 50;
  const stats = { tests: 24, studyTime: "18h" };
  const exams = [
    {
      id: 1,
      title: "JAMB UTME",
      subtitle: "Joint Admissions and Matriculation Board exam practice",
      questions: "180 questions",
      duration: "3 hours",
      quote: (
        <p className="text-sm text-gray-600 flex items-start">
          <span
            className="font-semibold bg-clip-text text-transparent mr-2 relative"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FF9053 0%, #943400 100%)",
              top: "-2px", // move the line up a little
            }}
          >
            |
          </span>
          <span>
            "Consistency beats intelligence when you stay committed." Includes
            past questions & mock exams for all departments.
          </span>
        </p>
      ),
      style: {
        border: "3px solid",
        borderImageSource: "linear-gradient(90deg, #FF9053 0%, #943400 100%)",
        borderImageSlice: 1,
      },
      color: "border-blue-500",
    },
    {
      id: 2,
      title: "WAEC",
      subtitle: "West African Senior School Certificate Exam Practice",
      questions: "50 questions",
      duration: "1 hour",
      quote: (
        <p className="text-sm text-gray-600 flex items-start">
          <span
            className="font-semibold bg-clip-text text-transparent mr-2 relative"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FF9053 0%, #943400 100%)",
              top: "-2px",
            }}
          >
            |
          </span>
          <span>
            "What you practice today shapes your tomorrow." Includes complete past
            questions & practice tests for all subjects.
          </span>
        </p>
      ),

      style: {
        border: "3px solid",
        borderImageSource: "linear-gradient(90deg, #FF9053 0%, #943400 100%)",
        borderImageSlice: 1,
      },
      color: "border-green-500",
    },
    {
      id: 3,
      title: "NECO SSCE",
      subtitle:
        "National Examination Council Senior School Certificate Exam Practice",
      questions: "50 questions",
      duration: "1 hour",
      quote: (
        <p className="text-sm text-gray-600 flex items-start">
          <span
            className="font-semibold bg-clip-text text-transparent mr-2 relative"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FF9053 0%, #943400 100%)",
              top: "-2px",
            }}
          >
            |
          </span>
          <span>
            "Small daily progress leads to big results." Includes verified past
            questions & mock practice for every field.
          </span>
        </p>
      ),
      style: {
        border: "3px solid",
        borderImageSource: "linear-gradient(90deg, #FF9053 0%, #943400 100%)",
        borderImageSlice: 1,
      },
      color: "border-red-500",
    },
    {
      id: 4,
      title: "POST-UTME",
      subtitle: "University Admission Screening Test Practice",
      questions: "180 questions",
      duration: "2 hours",
      quote: (
        <p className="text-sm text-gray-600 flex items-start">
          <span
            className="font-semibold bg-clip-text text-transparent mr-2 relative"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FF9053 0%, #943400 100%)",
              top: "-2px",
            }}
          >
            |
          </span>
          <span>
            "Prepare harder than the competition — admission is yours." Includes
            school-based past questions & simulation mock exams.
          </span>
        </p>
      ),
      style: {
        border: "3px solid",
        borderImageSource: "linear-gradient(90deg, #FF9053 0%, #943400 100%)",
        borderImageSlice: 1,
      },
      color: "border-amber-500",
    },
  ];


  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="fixed md:static z-20">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Section */}
      <div className="flex-1 md:ml-64 w-full overflow-y-auto">
        {/* Banner */}
        <div className="relative w-full h-56 md:h-64">
          <Image
            src="/cbt-banner.jpg"
            alt="CBT Practice Banner"
            fill
            className="object-cover rounded-b-2xl"
            priority
          />
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 p-6">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                📝 CBT Practice
              </h1>
              <p className="text-gray-500 mt-2">
                Practice mock tests and improve your CBT skills
              </p>

            </div>

            {/* Exams List */}
            <div className="space-y-4">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className={`bg-white border ${exam.color} shadow-sm rounded-xl p-5 flex flex-col md:flex-row md:justify-between md:items-center transition`}
                >
                  {/* Left Side — Content */}
                  <div className="flex-1">
                    {/* Title + Icon */}
                    <div className="flex items-center gap-2 mb-1">
                      {exam.title === "JAMB UTME" && (<div
                        className="flex items-center justify-center shadow-sm"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "#3378B1",
                          borderRadius: "10px",
                          opacity: 1,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="26.67"
                          viewBox="0 0 64 53.34"
                          fill="none"
                          style={{ position: "relative", top: "2.67px" }}
                        >
                          <path
                            d="M32 0L0 13.34L32 26.67L64 13.34L32 0ZM12 30.67V40C12 46.67 20 53.34 32 53.34C44 53.34 52 46.67 52 40V30.67L32 38.67L12 30.67ZM58.67 26.67C59.4 26.67 60 27.27 60 28V38.67C60 39.4 59.4 40 58.67 40C57.94 40 57.34 39.4 57.34 38.67V28C57.34 27.27 57.94 26.67 58.67 26.67Z"
                            fill="#FFFFFF" // white hat
                          />
                        </svg>
                      </div>

                      )}
                      {exam.title === "WAEC" && (<div
                        className="flex items-center justify-center shadow-sm"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "#238B49",
                          borderRadius: "10px",
                          opacity: 1,
                          position: "relative",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{
                            position: "absolute",
                            top: "8px",
                            left: "8px",
                          }}
                        >
                          <path
                            d="M4 4.5C4 3.67 4.67 3 5.5 3H18.5C19.33 3 20 3.67 20 4.5V20C20 20.83 19.33 21.5 18.5 21.5H5.5C4.67 21.5 4 20.83 4 20V4.5ZM6 5.5V19.5H18V5.5H6ZM8 7.5H16V9.5H8V7.5ZM8 11.5H14V13.5H8V11.5Z"
                            fill="#FFFFFF"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>

                      )}
                      {exam.title === "NECO SSCE" && (<div
                        className="flex items-center justify-center shadow-sm"
                        style={{
                          width: "48px",
                          height: "48px",
                          background: "#A12D29",
                          borderRadius: "10px",
                          opacity: 1,
                          position: "relative",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{
                            position: "absolute",
                            top: "8px",
                            left: "8px",
                          }}
                        >
                          <path
                            d="M9 3H15V4L12 10L15 17C15 18.66 13.66 20 12 20C10.34 20 9 18.66 9 17L12 10L9 4V3Z"
                            fill="#FFFFFF"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 21H19"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>

                      )}
                      {exam.title === "POST-UTME" && (
                        <div
                          className="flex items-center justify-center shadow-sm"
                          style={{
                            width: "48px",
                            height: "48px",
                            background: "#E39C47",
                            borderRadius: "10px",
                            position: "relative",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{
                              position: "absolute",
                              top: "8px",
                              left: "8px",
                            }}
                          >
                            <path
                              d="M4 4.5C4 3.67 4.67 3 5.5 3H18.5C19.33 3 20 3.67 20 4.5V20C20 20.83 19.33 21.5 18.5 21.5H5.5C4.67 21.5 4 20.83 4 20V4.5ZM6 5.5V19.5H18V5.5H6ZM8 7.5H16V9.5H8V7.5ZM8 11.5H14V13.5H8V11.5Z"
                              fill="#FFFFFF"
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>

                      )}

                      <h3 className="text-lg font-semibold text-gray-800">{exam.title}</h3>
                    </div>

                    {/* Subtitle */}
                    <p className="text-sm text-gray-500 mb-2">{exam.subtitle}</p>

                    {/* Info Row */}
                    <div className="flex items-center gap-6 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        {/* Questions Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 6h13M8 12h13m-13 6h13M3 6h.01M3 12h.01M3 18h.01"
                          />
                        </svg>
                        <span>{exam.questions}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Clock Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6l4 2m6-4a10 10 0 11-20 0 10 10 0 0120 0z"
                          />
                        </svg>
                        <span>{exam.duration}</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="text-sm text-gray-600 mb-2">{exam.quote}</p>
                  </div>

                  {/* Right Side — Button */}
                  <div className="mt-3 md:mt-4 md:ml-6 md:self-center">
                    <Button
                      onClick={() => router.push("/courses/start-practice")}
                      className="text-white text-sm px-5 py-2 rounded-lg shadow-md transition-all"
                      style={{
                        background: "linear-gradient(180deg, #FF9053 0%, #DB5206 100%)",
                      }}
                    >
                      Start Practice
                    </Button>
                  </div>
                </div>
              ))}
            </div>




            {/* Previous Attempts (MOBILE VIEW ONLY) */}
            <div className="mt-8 lg:hidden">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Previous Attempts
              </h2>
              <div className="bg-white shadow-sm rounded-2xl p-5">
                <div className="divide-y divide-gray-200">
                  {attempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="flex items-center justify-between py-3 hover:bg-gray-100 rounded-lg transition cursor-pointer px-2"
                    >
                      <div>
                        <span className="block font-semibold text-gray-800 text-sm">
                          {attempt.title}
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

          {/* Right Sidebar (Progress + Previous Attempts for LG+) */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Progress */}
            <div className="bg-white shadow-sm rounded-2xl p-6 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Progress
              </h2>
              <div className="w-24 h-24 mb-3">
                <CircularProgressbar
                  value={progress}
                  text={`${progress}%`}
                  styles={buildStyles({
                    textColor: "#333",
                    pathColor: "#FF7A00",
                    trailColor: "#eee",
                  })}
                />
              </div>
              <p className="text-sm text-gray-500 mb-1">
                {stats.tests} Tests Completed
              </p>
              <p className="text-sm text-gray-500">{stats.studyTime} Study Time</p>
            </div>

            {/* Previous Attempts (LG+ ONLY) */}
            <div className="hidden lg:block bg-white shadow-sm rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Previous Attempts
              </h2>
              <div className="divide-y divide-gray-200">
                {attempts.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="flex items-center justify-between py-3 hover:bg-gray-100 rounded-lg transition cursor-pointer px-2"
                  >
                    <div>
                      <span className="block font-semibold text-gray-800 text-sm">
                        {attempt.title}
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
      </div>
    </div>
  );
}
