"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import FooterNav from "@/app/components/FooterNav";
import {
  BookOpen,
  Brain,
  Layers,
  Sparkles,
  Shield,
  Star,
  LogOut,
  ArrowLeft,
  Target,
  ChevronRight,
} from "lucide-react";
import MatchSimulation from "@/components/MatchSimulation";
import QuestionScreen from "@/components/QuestionScreen";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

// -----------------
// User Interface
// -----------------
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

type Stage = "modes" | "matching" | "questions";

export default function GameModePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("modes");
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [user, setUser] = useState<User>(initialUser);

  // ---------------------
  // Game Data
  // ---------------------
  const subjectsList = [
    { name: "Mathematics", icon: "📊", color: "from-yellow-400 to-orange-500" },
    { name: "Physics", icon: "⚡", color: "from-orange-400 to-amber-500" },
    { name: "Chemistry", icon: "🧪", color: "from-yellow-500 to-orange-600" },
    { name: "Biology", icon: "🧬", color: "from-amber-400 to-yellow-500" },
    { name: "English", icon: "📚", color: "from-orange-500 to-red-500" },
    { name: "History", icon: "🏛️", color: "from-yellow-600 to-orange-600" },
  ];

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

  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

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

  // ---------------------
  // CardItem Component
  // ---------------------
  function CardItem({ border, glow, icon, title, description, onClick }: any) {
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

  // ---------------------
  // RENDER FLOW
  // ---------------------
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

  // MODES SCREEN
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#04101F] text-white overflow-x-hidden">

      {/* Desktop Sidebar */}
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

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:pl-64 -mt-13 lg:-mt-20 w-full">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
          <section className="relative rounded-3xl p-8 md:p-12" style={{ minHeight: 520 }}>
            <div className="relative z-10">
              <h1 className={`${poppins.className} bg-gradient-to-r from-[#F77E40] to-[#873003] text-transparent bg-clip-text text-[36px] leading-[100%] font-semibold text-center mb-6`}>
                Choose Game Mode
              </h1>

              {/* GAME MODES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">
                {gameModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <div className="w-full max-w-[420px]" key={mode.id}>
                      <CardItem
                        border="#FFB36B"
                        glow="shadow-[0_0_25px_#ffb36b55]"
                        icon={<Icon className="w-10 h-10 text-white" />}
                        title={mode.title}
                        description={mode.description}
                        onClick={() => {
                          setSelectedMode(mode.id);
                          setSubjects([]);
                          setTopics([]);
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Subject / Topic Selection */}
              {selectedMode &&
                gameModes.find((m) => m.id === selectedMode)?.requiresSubjects && (
                  <div className="bg-white rounded-2xl p-6 border border-yellow-300 shadow-md mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      {selectedMode === "topic-mode" ? "Select Topics" : "Select Subjects"}
                    </h2>

                    {selectedMode === "topic-mode" ? (
                      <div className="space-y-4">
                        {Object.entries(topicsMap).map(([subject, subjectTopics]) => (
                          <div key={subject}>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {subjectTopics.map((topic) => (
                                <button
                                  key={topic}
                                  onClick={() => toggleTopic(topic)}
                                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                                    topics.includes(topic)
                                      ? "border-[#F59E0B] bg-[#FEF3C7] text-gray-900"
                                      : "border-[#FCD34D] bg-white text-gray-700 hover:bg-[#FFF7E6]"
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
                            className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                              subjects.includes(subject.name)
                                ? "border-[#F59E0B] bg-[#FEF3C7]"
                                : "border-[#FCD34D] bg-white hover:bg-[#FFF7E6]"
                            }`}
                          >
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                            >
                              <span className="text-2xl">{subject.icon}</span>
                            </div>
                            <h3 className="text-gray-900 font-medium">{subject.name}</h3>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              {/* START BUTTON */}
              <div className="flex items-center justify-center mt-8">
                <button
                  onClick={handleStart}
                  disabled={!canStartGame()}
                  className={`px-12 py-3 rounded-full font-semibold text-lg transition-all duration-200 transform ${
                    canStartGame()
                      ? "bg-[#F59E0B] text-white hover:bg-[#D97706] hover:scale-105 shadow-lg"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
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
