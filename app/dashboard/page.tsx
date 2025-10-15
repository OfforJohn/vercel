"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Gamepad2,
  Users,
  Award,
  User,
  LogOut,
  Flame,
  Trophy,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("ControlEdu");
  const [sidebarOpen, setSidebarOpen] = useState(false);


useEffect(() => {
  if (sidebarOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return () => {
    document.body.style.overflow = '';
  };
}, [sidebarOpen]);


  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  const leaderboard = [
    { name: "Bryan", xp: 650 },
    { name: "PeterInspo", xp: 500 },
    { name: "GenesisLibrary", xp: 450 },
    { name: "ControlEdu", xp: 320 },
    { name: "Matac", xp: 310 },
  ];

  return (<div
  className="flex flex-col lg:flex-row min-h-screen"
  style={{
    background: 'linear-gradient(to bottom, white 7%, #f3f4f6 7%)',
  }}
>
      {/* Sidebar */}
      
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-[#001A33] text-white flex flex-col">

  <div className="px-6 py-4 text-2xl font-bold text-center border-b border-white/10">
    <span className="text-orange-500">HIGH</span>SCORE
  </div>

  <div className="p-4">
    <input
      type="text"
      placeholder="Search..."
      className="w-full px-3 py-2 rounded-lg bg-white placeholder-gray-300 text-sm focus:outline-none"
    />
  </div>
<nav className="flex flex-col px-4 space-y-6">
  {[ // your nav buttons
    { name: "Dashboard", icon: Home },
    { name: "Courses", icon: BookOpen },
    { name: "Play", icon: Gamepad2 },
    { name: "Community", icon: Users },
    { name: "Certification", icon: Award },
    { name: "Profile", icon: User },
  ].map((item, i) => (
    <button
      key={i}
      onClick={() => { }}
      className="flex items-center w-full gap-3 px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-all"
    >
      <item.icon className="w-5 h-5" />
      {item.name}
    </button>
  ))}
</nav>

 <div className="p-4 border-t border-white/10 mt-auto">
    <button className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-all">
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  </div>
</aside>

      
    <div className="lg:hidden">
{/* Mobile Sidebar Overlay - Must be outside scrolling content */}
{sidebarOpen && (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={() => setSidebarOpen(false)}
    />

    {/* Sidebar Panel */}
    <div className="fixed top-0 left-0 w-64 h-full bg-[#001A33] text-white z-50 transition-transform duration-300 translate-x-0">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <span className="text-2xl font-bold">
          <span className="text-orange-500">HIGH</span>SCORE
        </span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-lg bg-white/10 placeholder-gray-300 text-sm focus:outline-none"
        />
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {[
          { name: "Dashboard", icon: Home },
          { name: "Courses", icon: BookOpen },
          { name: "Play", icon: Gamepad2 },
          { name: "Community", icon: Users },
          { name: "Certification", icon: Award },
          { name: "Profile", icon: User },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => {}}
            className="flex items-center w-full gap-3 px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-all"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </button>
        ))}
      </nav>

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

      {/* Hamburger button for mobile */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>


      {/* Main Content */}
      
    
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:ml-64">
      {/* Greeting Section */}
      <div className="absolute top-4 right-4 flex items-center gap-4 z-7">

        {/* Notification icon */}
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
    {/* Red notification dot */}
    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
  </button>
  <img
    src="/path/to/icon.png"
    alt="icon"
    className="w-8 h-8 rounded-full bg-black"
  />
  <span className="text-lg font-semibold">5 🔥</span>
</div>

      <div className=" -mb-3 p-9 rounded-lg">

        
    {/* Your content here */}
  </div>

      <div className="mb-5">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Hello {username}👋🏼
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Ready to smash today’s goals?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-8">
          {/* Streak On Fire */}
          <div className=" rounded-2xl p-6  flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="font-medium flex items-center justify-center sm:justify-start gap-1">
                <Flame className="w-4 h-4 text-orange-500" /> Streak On Fire!
              </p>

           <div className="relative w-40 h-40 sm:w-48 sm:h-48 ml-20">
  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
    {/* Background Circle */}
    <circle
      cx="64"
      cy="64"
      r="60"
      stroke="#E5E7EB"
      strokeWidth="2"  // thinner background stroke
      fill="none"
    />
    {/* Progress Circle */}
    <circle
      cx="64"
      cy="64"
      r="60"
      stroke="#F97316"
      strokeWidth="2"  // thinner progress stroke
      fill="none"
      strokeDasharray={`${2 * Math.PI * 60}`}
      strokeDashoffset={`${2 * Math.PI * 60 * (1 - 0.5)}`}
      strokeLinecap="round"
      className="transition-all duration-700"
    />
  </svg>

  <div className="absolute inset-0 flex items-center justify-center font-semibold text-gray-700 text-3xl">
    50%
  </div>
</div>

            
            
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                50% of your daily study goal achieved 🔥 <br />
                Just 20 more questions to hit 100%! 💪🏽 <br />
                Almost there... Don’t break your streak 🔥
              </p>
            </div>

         
          </div>

          {/* Quick Actions */}
        
            <div className="rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              🔴 Daily Challenge
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Complete today’s task and earn rewards!
            </p>

            <p className="text-sm text-gray-700 font-medium mb-2">
              Answer 20 English Questions
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mb-4">10/20 Completed</p>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Start Challenge
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-8  min-h-[800px]">
          {/* Daily Challenge */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {[
              { title: "Video Tutorials", img: "/images/tutorials.jpg" },
              { title: "CBT Practice", img: "/images/cbt.jpg" },
              { title: "AI Tutor", img: "/images/ai.jpg" },
              { title: "Quiz Games", img: "/images/quiz.jpg" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {}}
                className="relative group rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-base sm:text-lg font-semibold">
                  {item.title}
                </div>
              </button>
            ))}
          </div>
        

          {/* Leaderboard */}
          <div className=" rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Leaderboard
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              You’re ranked <span className="font-semibold text-gray-700">#12</span> in Lagos —
              keep climbing!
            </p>

            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-4 py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-700 w-5">
                      {index + 1}
                    </span>
                    <span className="text-gray-800">{user.name}</span>
                  </div>
                  <span className="font-semibold text-gray-700">
                    {user.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </main>
    </div>
  );
}
