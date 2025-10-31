"use client";

import { useState } from "react";
import { BookOpen, FlaskConical, Sigma, Atom, Leaf } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";

export default function CbtPracticePage() {
    const [category, setCategory] = useState("science");
    const [sidebarOpen, setSidebarOpen] = useState(false);

const scienceSubjects = [
  {
    name: "Mathematics",
    icon: Sigma,
    color: "bg-gradient-to-b from-[#5EA7E4] to-[#08477C]"
  },
  {
    name: "English Language",
    icon: BookOpen,
    color: "bg-gradient-to-b from-[#55C77F] to-[#006124]"
  },
  {
    name: "Physics",
    icon: Atom,
    color: "bg-gradient-to-b from-[#E1635E] to-[#8D1A16]"
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    color: "bg-gradient-to-b from-[#E7A100] to-[#8A4B00]"
  },
  {
    name: "Biology",
    icon: Leaf,
    color: "bg-gradient-to-b from-green-700 to-green-500"
  },
];


    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* ✅ Sidebar stays left and fixed on desktop */}
            <div className="hidden md:block w-64">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>

            {/* ✅ Mobile sidebar (overlay) */}
            <div className="md:hidden fixed z-30">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>

            {/* ✅ Main Content Area */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto md:ml-54">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                    CBT Practice
                </h1>

                {/* ✅ Toggle Buttons */}
                <div className="flex justify-center mb-10">
  <div className="rounded-full px-2 py-1 flex gap-1 bg-[#031829]">
    <button
      className={`px-8 py-2 rounded-full font-medium transition 
        ${category === "science"
          ? "bg-white text-[#031829]"
          : "text-white/70 hover:text-white"
        }`}
      onClick={() => setCategory("science")}
    >
      Science
    </button>

    <button
      className={`px-8 py-2 rounded-full font-medium transition 
        ${category === "arts"
          ? "bg-white text-[#031829]"
          : "text-white/70 hover:text-white"
        }`}
      onClick={() => setCategory("arts")}
    >
      Arts
    </button>
  </div>
</div>


                {/* ✅ Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

                    {/* ✅ Subject cards */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {scienceSubjects.map((subject) => (
                            <div
                                key={subject.name}
                                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
                            >
                                <div
                                    className={`h-28 flex items-center justify-center bg-gradient-to-r ${subject.color} text-white text-xl`}
                                >
                                    <subject.icon size={36} />
                                </div>
                                <div className="p-4 text-center font-semibold text-gray-700">
                                    {subject.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ✅ myPQ card */}
                    <div className="bg-[linear-gradient(180deg,#E66A32_0%,#8F3E0A_100%)]
  rounded-3xl shadow-xl flex flex-col justify-center items-center
  text-white py-20 px-8 min-h-[360px]">

                        {/* ✅ my + PQ on same line, sized correctly */}
                        <div className="flex items-end gap-1">
                            <span className="text-3xl font-semibold">my</span>
                            <span className="text-5xl font-extrabold leading-none">PQ</span>
                        </div>

                        {/* ✅ myPastQuestions (bigger & close) */}
                        <p className="mt-3 text-xl font-semibold tracking-widest">
                            myPastQuestions
                        </p>


                        {/* ✅ subtitle close to it, centered */}
                        <p className="text-xs opacity-90 mt-1 text-center">
                            access previous JAMB past questions
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}
