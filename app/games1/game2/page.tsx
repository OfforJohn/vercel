"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import FooterNav from "@/app/components/FooterNav";
import Image from "next/image";
import { Menu, Coins, BookOpen, Brain, Layers, Sparkles, Shield, Star, LogOut, Target } from "lucide-react";
import { Poppins } from "next/font/google";
import router from "next/router";
import QuestionScreen from "@/components/QuestionScreen";
import MatchSimulation from "@/components/MatchSimulation";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"], // SemiBold
});


type Stage = "modes" | "matching" | "questions";

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  rank: string;
  xp: number;
  coins: number;
  avatar: string;
  totalMatches: number;
  wins: number;
  winRate: number;
}

// Example logged-in user
const initialUser: User = {
  id: "1",
  username: "player1",
  email: "player@example.com",
  displayName: "You",
  rank: "Gold",
  xp: 1200,
  coins: 500,
  avatar: "🎮",
  totalMatches: 20,
  wins: 15,
  winRate: 75,
};

export default function GameModePage() {
   const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [subjects, setSubjects] = useState<string[]>([]);
    const [topics, setTopics] = useState<string[]>([]);
  const [selectedMode, setSelectedMode] = useState<string>("");
  
    const [stage, setStage] = useState<Stage>("modes");
    
      const [user, setUser] = useState<User>(initialUser);


    const subjectsList = [
    { name: "Mathematics", icon: "📊", color: "from-yellow-400 to-orange-500" },
    { name: "Physics", icon: "⚡", color: "from-orange-400 to-amber-500" },
    { name: "Chemistry", icon: "🧪", color: "from-yellow-500 to-orange-600" },
    { name: "Biology", icon: "🧬", color: "from-amber-400 to-yellow-500" },
    { name: "English", icon: "📚", color: "from-orange-500 to-red-500" },
    { name: "History", icon: "🏛️", color: "from-yellow-600 to-orange-600" },
  ];

    const canStartGame = () => {
    if (!selectedMode) return false;
    const mode = gameModes.find((m) => m.id === selectedMode);
    if (!mode?.requiresSubjects) return true;
    if (selectedMode === "topic-mode") return topics.length > 0;
    return subjects.length > 0;
  };


 const handleStart = () => {
    if (!canStartGame()) return;
    setStage("matching");
  };
    const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

    // ---------------------
  // Handlers
  // ---------------------
  const toggleSubject = (subject: string) => {
    setSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

    const topicsMap = {
    Mathematics: ["Algebra", "Geometry", "Calculus", "Statistics"],
    Physics: ["Mechanics", "Thermodynamics", "Electricity", "Optics"],
    Chemistry: ["Organic", "Inorganic", "Physical", "Analytical"],
    Biology: ["Cell Biology", "Genetics", "Ecology", "Human Anatomy"],
    English: ["Grammar", "Literature", "Writing", "Comprehension"],
    History: ["Ancient", "Medieval", "Modern", "Contemporary"],
  };

  
    const gameModes = [
      {
        id: "subject-combination",
        title: "Subject Combination",
        description: "Mix multiple subjects for variety",
        icon: BookOpen,
        color: "from-yellow-400 to-orange-500",
        requiresSubjects: true,
      },
      {
        id: "single-subject",
        title: "Single Subject",
        description: "Focus on one subject area",
        icon: Target,
        color: "from-orange-400 to-amber-500",
        requiresSubjects: true,
      },
      {
        id: "topic-mode",
        title: "Topic Mode",
        description: "Dive deep into specific topics",
        icon: Brain,
        color: "from-amber-400 to-yellow-500",
        requiresSubjects: true,
      },
      {
        id: "general-knowledge",
        title: "General Knowledge",
        description: "Random questions from all areas",
        icon: Sparkles,
        color: "from-orange-500 to-red-500",
        requiresSubjects: false,
      },
    ];
  





  function CardItem({ border, glow, icon, title, onClick, description }: any) {
    return (
      <div
       onClick={onClick}
        className={`
                rounded-2xl p-7 border-2 
                bg-[rgba(255,255,255,0.03)] 
                backdrop-blur-sm
                hover:scale-[1.04] 
                transition-transform 
                ${glow}
            `}
        style={{ borderColor: border }}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div>{icon}</div>
          <div className="text-xl font-bold text-white">{title}</div>
          <p className="text-sm text-white/80">{description}</p>
        </div>
      </div>
    );
  }

   const handleGameComplete = (coins: number, xp: number) => {
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + coins,
      xp: prev.xp + xp,
      totalMatches: prev.totalMatches + 1,
      wins: prev.wins + 1,
    }));
    router.push("/dashboard");
  };

 if (stage === "matching") {
    return (
      <MatchSimulation
        user={user}
        gameMode={selectedMode}
        subjects={selectedMode === "topic-mode" ? topics : subjects}
        onBack={() => setStage("modes")}
        onGameStart={() => setStage("questions")}
      />
    );
  }

  if (stage === "questions") {
    return (
      <QuestionScreen
        gameMode={selectedMode}
        subjects={selectedMode === "topic-mode" ? topics : subjects}
        onBack={() => setStage("modes")}
        onGameComplete={handleGameComplete}
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#04101F] text-white overflow-x-hidden">

      {/* Desktop Sidebar */}
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-[#001A33] text-white flex flex-col">
        <div
          onClick={() => router.push("/")}
          className="px-6 py-4 text-2xl font-bold text-center border-b border-white/10 cursor-pointer hover:text-orange-400 transition-colors"
        >
          <span className="text-orange-500">HIGH</span>SCORE
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-lg bg-white placeholder-gray-300 text-sm focus:outline-none"
          />
        </div>

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="p-4 border-t border-white/10 mt-auto">
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}

      <div className="lg:hidden">
        {/* Mobile Sidebar Overlay - Must be outside scrolling content */}
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[55]"
              onClick={() => setSidebarOpen(false)}
            />


            {/* Sidebar Panel */}
            <div className="fixed top-0 left-0 w-64 h-full bg-[#001A33] text-white z-[60] transition-transform duration-300 translate-x-0">


              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />



              <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-all">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </>
        )}

      </div>

      <header className="fixed lg:hidden top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="#F97316"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-4">
          <button className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.163-1.31A8.967 8.967 0 0019.5 8.25V7.5a7.5 7.5 0 10-15 0v.75a8.967 8.967 0 00-.52 7.522c1.233.51 2.58.91 4.02 1.203m6.857 0a24.255 24.255 0 01-6.857 0m6.857 0v.918a2.25 2.25 0 11-4.5 0v-.918"
              />
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-base">
              {user.avatar}
            </div>
            <span className="text-base font-semibold text-gray-700">{user.xp} 🔥</span>
          </div>
        </div>
      </header>



      {/* MAIN CONTENT */}
      <main className="flex-1 lg:pl-64 -mt-13 lg:-mt-20 w-full">

        {/* Mobile top bar */}
     

        {/* PAGE CONTAINER */}
        <div className="max-w-6xl  mx-auto px-6 pt-20 pb-12">

          <section
            className="
        relative rounded-3xl p-8 md:p-12 
    
    "
            style={{ minHeight: 520 }}
          >

            {/* Hero image on right */}


            <div className="relative z-10">

              {/* Title */}
              <h1 className={`${poppins.className} bg-gradient-to-r from-[#F77E40] to-[#873003] text-transparent bg-clip-text text-[36px] leading-[100%] font-semibold text-center mb-6`}>
                Choose Game Mode
              </h1>


              {/* Rank + XP Row */}
              <div className="flex items-center justify-center gap-4 w-full mb-10">

                {/* Rank + Icon */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 text-sm font-semibold text-orange-300">
                    <div className="relative w-[45px] h-[55px]">
                      <Shield
                        className="w-full h-full"
                        style={{ stroke: '#F49923', strokeWidth: 1.5 }}
                      />

                      {/* Star positioned inside the shield */}
                      <Star
                        className="absolute inset-0 m-auto w-[22px] h-[22px]"
                        fill="#F49923"
                        stroke="none"
                      />
                    </div>

                  </div>
                  Bronze
                </div>







                {/* XP Bar */}
                <div className="flex flex-col mt-3">  {/* Added mt-6 for margin-top */}
                  {/* Progress Bar */}
                  {/* Progress Bar */}
                  <div className="w-80 rounded-full h-3 overflow-hidden" style={{ backgroundColor: "#C7C7C7" }}>
                    <div
                      className="h-full bg-orange-400 rounded-full"
                      style={{ width: "55%" }} // Change the width as needed
                    />
                  </div>


                  {/* XP Value aligned with the progress bar */}
                  <div className="text-sm text-white-300 font-medium mt-4 text-right">
                    {user.xp} XP
                  </div>
                </div>


              </div>
              <p
                className={`
    ${poppins.className}
    text-center 
    text-white
    mb-10
    text-[22px]
    leading-[100%]
    font-semibold
  `}
              >
                Ready for today's challenge?
              </p>


           
              {/* GAME MODES — EXACT SCREENSHOT MATCH */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">

                {/* Row 1 */}
                <div className="w-full max-w-[420px] rotate-3 relative">
                  {/* Halo/Blur behind the icon */}
                  <div
                    className="absolute -top-7 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full"
                    style={{
                      background: "radial-gradient(circle, #FFD19BFF 1%, transparent 30%)",

                      zIndex: 0,
                    }}
                  />

                  <CardItem
                    border="#FFB36B"  // This might be used for your other border-related logic
                    glow="shadow-[0_0_25px_#ffb36b55]"
                    icon={<BookOpen className="w-10 h-10 text-orange-300 relative z-10" />}
                    title="Subject Combination"
                    description="Mix multiple subjects for variety"
                    style={{
                      border: '5px solid',  // Border thickness
                      borderImageSource: 'linear-gradient(259.73deg, #FF8A00 42.33%, #FFEED9 106.96%)',
                      borderImageSlice: 1,  // Ensure the gradient covers the entire border
                    }}
                    
    onClick={() => setSelectedMode("subject-combination")}
                  />

                </div>

                <div className="w-full max-w-[420px] -rotate-3 relative">
                  {/* Halo/Blur behind the icon */}
                  <div
                    className="absolute -top-7 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full"
                    style={{
                      background: "radial-gradient(circle, #FFD19BFF 1%, transparent 30%)",

                      zIndex: 0,
                    }}
                  />

                  <CardItem
                    border="#7C5BFF"
                    glow="shadow-[0_0_25px_#7c5bff55]"
                    icon={<Layers className="w-10 h-10 text-purple-300" />}
                    title="Single Subject"
                    description="Focus on the subject area"
                    style={{
                      border: '5px solid',  // Border thickness
                      borderImageSource: 'linear-gradient(259.73deg, #8150FF 42.33%, #DCCEFF 106.96%)',  // Gradient border
                      borderImageSlice: 1,  // Ensures the gradient covers the whole border
                    }}
                    
    onClick={() => setSelectedMode("single-subject")}
                  />

                </div>

                {/* Row 2 */}
                <div className="w-full max-w-[420px] -rotate-2">
                  <CardItem
                    border="#3FB4FF"
                    glow="shadow-[0_0_25px_#3fb4ff55]"
                    icon={<Brain className="w-10 h-10 text-blue-300" />}
                    title="Topic Mode"
                    description="Dive deep into specific topics"
                    onClick={() => setSelectedMode("topic-mode")}
                  />
                </div>

                <div className="w-full max-w-[420px] rotate-2">
                  <CardItem
                    border="#FF6B8A"
                    glow="shadow-[0_0_25px_#ff6b8a55]"
                    icon={<Sparkles className="w-10 h-10 text-pink-300" />}
                    title="General Knowledge"
                    description="Random questions from all areas"
                    onClick={() => setSelectedMode("general-knowledge")}
                  />
                </div>

              </div>

              {/* Add this to your global CSS or Tailwind config */}
              <style jsx global>{`
  @keyframes pulseHalo {
    0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.7; }
    50% { transform: translateX(-50%) scale(1.3); opacity: 0.4; }
  }
  .animate-pulseHalo {
    animation: pulseHalo 2s infinite ease-in-out;
  }
`}</style>


      {/* Subject / Topic Selection */}
         {selectedMode &&
  gameModes.find((m) => m.id === selectedMode)?.requiresSubjects && (
    <div className="bg-[#04101F] rounded-2xl p-6 border border-yellow-500 shadow-md mt-8">
      <h2 className="text-xl font-bold text-white mb-4">
        {selectedMode === "topic-mode" ? "Select Topics" : "Select Subjects"}
      </h2>

      {selectedMode === "topic-mode" ? (
        <div className="space-y-4">
          {Object.entries(topicsMap).map(([subject, subjectTopics]) => (
            <div key={subject}>
              <h3 className="text-lg font-semibold text-orange-300 mb-2">{subject}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {subjectTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-semibold ${
                      topics.includes(topic)
                        ? "border-orange-400 bg-gradient-to-br from-orange-400 to-yellow-400 text-white shadow-[0_0_15px_#ffb347]"
                        : "border-orange-300 bg-[#04101F] text-orange-300 hover:bg-gradient-to-br hover:from-orange-400 hover:to-yellow-400 hover:text-white"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {subjectsList.map((subject) => (
            <button
              key={subject.name}
              onClick={() => toggleSubject(subject.name)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 font-semibold ${
                subjects.includes(subject.name)
                  ? `border-orange-400 bg-gradient-to-br from-orange-400 to-yellow-400 text-white shadow-[0_0_15px_#ffb347]`
                  : `border-orange-300 bg-[#04101F] text-orange-300 hover:bg-gradient-to-br hover:from-orange-400 hover:to-yellow-400 hover:text-white`
              }`}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                <span className="text-2xl">{subject.icon}</span>
              </div>
              <h3 className="text-white font-medium">{subject.name}</h3>
            </button>
          ))}
        </div>
      )}
    </div>
)}

              {/* START BUTTON */}
              <div className="flex items-center justify-center mt-14">
                <button
                 onClick={handleStart}
                  disabled={!canStartGame()}
                  className={`
      px-12 py-3 rounded-full
      bg-gradient-to-b from-orange-400 to-orange-600
      shadow-[0_0_20px_#ff8c3f77]
      font-semibold text-white
      hover:scale-[1.06]
      active:scale-95
      transition-transform
    `}
    
                >
                  
                  Start Challenge
                </button>
              </div>



            </div>
          </section>
<div className="fixed bottom-0 left-0 w-full z-50">
  <FooterNav />
</div>

        </div>

      </main>

    </div>
  );
}
