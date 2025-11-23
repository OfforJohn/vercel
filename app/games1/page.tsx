"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    Coins,
    Settings,
    Zap,
    Target,
    BookOpen,
    LogOut,
    Gift,
    Sparkles,
    Swords,
    Timer,
} from "lucide-react";

import FooterNav from "../components/FooterNav";
import Sidebar from "../components/Sidebar";


import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

// Self-contained RankBadge so this file is plug-and-play
function RankBadge({
    rank,
    size = "md",
}: {
    rank: string;
    size?: "sm" | "md" | "lg";
}) {
    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
    } as Record<string, string>;

    const colors: Record<string, string> = {
        Bronze: "bg-amber-600 text-white",
        Silver: "bg-slate-200 text-slate-900",
        Gold: "bg-yellow-400 text-slate-900",
        Platinum: "bg-indigo-400 text-white",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full font-semibold ${sizes[size]
                } ${colors[rank] ?? "bg-gray-200 text-gray-900"}`}
        >
            {rank}
        </span>
    );
}


export default function DashboardPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        const stored =
            typeof window !== "undefined" ? localStorage.getItem("username") : null;
        setUsername(stored ?? "ControlEdu");
    }, []);


    const handleClick = () => {
        router.push("/anotherPage"); // Change "/anotherPage" to your desired URL
    };

    const user = {
        id: "1",
        username,
        email: "player@example.com",
        displayName: username ?? "ControlEdu",
        rank: "Bronze",
        xp: 150,
        coins: 500,
        avatar: "🎮",
        totalMatches: 15,
        wins: 12,
        winRate: 80,
    };

    const recentAchievements = [
        { title: "Sharpshooter", subtitle: "80% accuracy", earned: true },
        { title: "Fast Solver", subtitle: "Completed quiz in under 20 secs", earned: true },
        { title: "Streak Master", subtitle: "3 days streak", earned: true },
        { title: "Quick Learner", subtitle: "10 matches completed", earned: false },
    ];


    const quests = [
        { title: "Earn 10 XP", progress: 3, goal: 10, icon: <Sparkles className="w-7 h-7 text-amber-400" /> },
        { title: "Defeat an opponent", progress: 0, goal: 1, icon: <Swords className="w-7 h-7 text-red-500" /> },
        { title: "Spend 5 minutes playing", progress: 2, goal: 5, icon: <Timer className="w-7 h-7 text-[#1d9bf0]" /> },
    ];

    const xpPerRank = 300;
    const getRankProgress = (xp: number) => {
        const currentRankXP = xp % xpPerRank;
        return Math.min(100, Math.round((currentRankXP / xpPerRank) * 100));
    };



    // Optional: define a background style
    const backgroundStyle = {
        background: "linear-gradient(to bottom, #04101F, #071122)",
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Firebase user:", user);
            if (user) {
                const name = user.displayName || user.email?.split("@")[0] || "User";
                console.log("Resolved username:", name);
                setUsername(name);
            }
        });
        return () => unsubscribe();
    }, []);



    return (
        <div className="flex flex-col lg:flex-row min-h-screen" style={backgroundStyle}>
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

            {/* Header (mobile) */}
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

            {/* Main content */}
            <main className="flex-1 lg:pl-64 pt-16 lg:pt-0 pb-20 min-h-screen">
                <div className="max-w-6xl mx-auto p-6">
                    {/* Top Welcome Card */}

                    <section
                        className="relative rounded-2xl p-6 md:p-8 overflow-hidden mb-8 min-h-[280px]"
                        style={{
                            background: "linear-gradient(181.49deg, #C64600 10.02%, #FF9053 53.1%, #FFB993 98.74%)"
                        }}

                    >


                        <div className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <Image
                                src={"/icon.png"}
                                alt="hero"
                                width={420}
                                height={420}
                                style={{ objectFit: "contain" }}
                            />
                        </div>


                        <div className="flex items-start gap-6 relative z-10">
                            <div className="flex items-center gap-4">

                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-xl"
                                    style={{
                                        background: "linear-gradient(180deg, #FF9053 28.12%, #CA4B05 100%)"
                                    }}
                                >

                                    {user.avatar}
                                </div>
                            </div>

                            <div className="flex-1 px-4 sm:px-6 md:px-0">

                                {/* Heading */}
                                <h2
                                    className="
      font-poppins font-semibold text-3xl sm:text-4xl md:text-[36px]
      leading-tight tracking-tight text-white flex items-center gap-2
      flex-wrap
    "
                                >
                                    <span className="inline-block">Welcome back,</span>

                                    {/* Username – truncates on small screens */}
                                    <span
                                        className="
        inline-block
        max-w-[150px] sm:max-w-[200px]
        truncate
        md:max-w-none md:whitespace-normal
      "
                                    >
                                        {username}
                                    </span>

                                    <span className="inline-block">👋</span>
                                </h2>

                                {/* Rank + Coins */}
                                <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                                    <RankBadge rank={user.rank} size="md" />

                                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                                        <Coins className="w-5 h-5 text-yellow-300" />
                                        <span className="font-semibold text-white">
                                            {user.coins.toLocaleString()}
                                        </span>
                                    </div>
                                </div>



                                {/* XP Bar */}
                            <div className="mt-8 sm:mt-16">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 text-[14px] font-medium text-white/80 mb-2">
                                        <span className="font-poppins text-white">Progress to next rank</span>
                                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                                            <Coins className="w-5 h-5 text-yellow-300 -translate-x-6" />

                                            <span className="font-semibold -ml-7 text-white">{user.coins.toLocaleString()} XP To Silver</span>
                                        </div>

                                        <div className="flex items-center gap-2">

                                        </div>
                                    </div>

                                    <div className="w-full sm:max-w-[600px] bg-white/10 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="h-3 rounded-full shadow-inner"
                                            style={{
                                                width: `${getRankProgress(user.xp)}%`,
                                                background: "#AA6037",
                                                transition: "width 800ms ease-out",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </section>

                    <div className="flex justify-end items-center gap-4 mb-4">
                        {/* Nigeria Flag + Score */}
                        <div className="flex items-center gap-1.5">
                            <img
                                src="https://flagcdn.com/48x36/ng.png"
                                alt="Nigeria"
                                className="w-8 ml-4 h-6 object-contain"
                            />
                        </div>

                        {/* Fire Streak */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-2xl drop-shadow-lg">🔥</span>
                            <span className="text-white font-bold text-lg">0</span>
                        </div>

                        {/* Blue Rectangular Gem (exact match to your screenshot) */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-2xl">🔷</span>
                            <span className="text-white font-bold text-lg">500</span>
                        </div>
                    </div>


                    {/* Quick Actions */}

                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                        {/* QUICK PLAY */}
                        <Link href="/games1/game2">
                            <div
                                className="rounded-2xl p-0 flex h-[200px] items-stretch overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90 cursor-pointer"
                                style={{
                                    background: "linear-gradient(180deg, #3468C6 0%, rgba(7, 39, 148, 0.9) 50%, #55A8FF 100%)"
                                }}
                            >
                                <img
                                    src="/quickplay.png"
                                    alt="Quick Play"
                                    className="h-full w-auto -ml-1"
                                />
                                <div className="flex flex-col justify-center -ml-7 pl-4 text-white whitespace-nowrap">
                                    <h3 className="text-lg font-bold">Quick Play</h3>
                                    <p className="text-sm opacity-90">Start a match now</p>
                                </div>
                            </div>
                        </Link>

                        {/* REWARDS */}
                        <Link href="/rewards">
                            <div
                                className="rounded-2xl p-0 flex h-[200px] items-stretch overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90 cursor-pointer"
                                style={{
                                    background: "linear-gradient(180deg, #9A2173 0%, #DE73B9 45.19%, #FFD4F1 100%)"
                                }}
                            >
                                <img
                                    src="/rewards.png"
                                    alt="Rewards"
                                    className="h-full w-auto -ml-8"
                                />
                                <div className="flex flex-col justify-center -ml-8 pl-4 text-white whitespace-nowrap">
                                    <h3 className="text-lg font-bold">Rewards</h3>
                                    <p className="text-sm opacity-90">Claim prizes</p>
                                </div>
                            </div>
                        </Link>

                        {/* LEADERBOARD */}
                        <Link href="/leaderboard">
                            <div
                                className="rounded-2xl p-0 flex h-[200px] items-stretch overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90 cursor-pointer"
                                style={{
                                    background: "linear-gradient(180deg, #7A3E00 0%, #DC7C0D 50%, #FFD279 100%)"
                                }}
                            >
                                <img
                                    src="/leaderboard.png"
                                    alt="Leaderboard"
                                    className="-ml-12"
                                />
                                <div className="flex flex-col justify-center pl-4 -ml-20 text-white whitespace-nowrap">
                                    <h3 className="text-lg font-bold">Leaderboard</h3>
                                    <p className="text-sm opacity-90">View Rankings</p>
                                </div>
                            </div>
                        </Link>

                        {/* FRIENDS */}
                        <Link href="/friends">
                            <div
                                className="rounded-2xl p-0 flex h-[200px] items-stretch overflow-hidden opacity-90 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90 cursor-pointer"
                                style={{
                                    background: "linear-gradient(180deg, #37189B 0%, #6B62A2 50%, #9C88E1 100%)"
                                }}
                            >
                                <img
                                    src="/friends.png"
                                    alt="Friends"
                                    className=""
                                />
                                <div className="flex flex-col justify-center pl-4 text-white whitespace-nowrap">
                                    <h3 className="text-lg font-bold">Friends</h3>
                                    <p className="text-sm opacity-90">Coming Soon</p>
                                </div>
                            </div>
                        </Link>

                    </section>






                    {/* Stats Overview */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                        <div className="rounded-xl p-6 min-h-[100px] bg-gradient-to-b from-[#d7d6d6] to-[#d98255]">
                            <div className="flex h-full items-center justify-between gap-x-8">
                                <div><p className="text-xl  text-sm font-bold">Total Matches</p>
                                    <p className=" font-medium text-slate-900 mt-3">{user.totalMatches}  Matches Played</p>

                                </div>

                                <Target className="w-8 h-8 text-black" />
                            </div>

                        </div>

                        <div className="rounded-xl p-6 min-h-[150px] bg-gradient-to-b from-[#d7d6d6] to-[#d98255]">
                            <div className="flex h-full items-center justify-between">
                                <div>
                                    <p className="text-xl  text-sm font-bold">Win Rate</p>
                                    <p className=" font-medium text-slate-900 mt-3">{user.winRate}% Win Rate</p>
                                </div>
                                <Zap className="w-8 h-8 text-black" />
                            </div>
                        </div>

                        <div className="rounded-xl p-6 min-h-[150px] bg-gradient-to-b from-[#d7d6d6] to-[#d98255]">
                            <div className="flex h-full items-center justify-between ">
                                <div>
                                    <p className="text-xl  text-sm font-bold">Best Subject</p>
                                    <p className=" font-medium text-slate-900  mt-3">Mathematics</p>
                                </div>
                                <BookOpen className="w-8 h-8 text-black" />
                            </div>
                        </div>

                    </section>


                    {/* Two Column: Daily Quests + Recent Achievements */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

                        {/* Daily Quests (smaller card) */}
                        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold">Daily Quests</h3>
                                <button className="text-sm text-amber-600 font-semibold">VIEW ALL</button>
                            </div>

                            <div className="space-y-4">
                                {quests.map((q, i) => {
                                    const pct = Math.round((q.progress / q.goal) * 100);

                                    return (
                                        <div key={i} className="flex items-center gap-4">
                                            {/* Left Icon */}
                                            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl shadow-sm">
                                                {q.icon}
                                            </div>

                                            {/* Center Text & Progress Bar */}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-semibold text-slate-800">{q.title}</p>
                                                    {/* Removed this percentage from here */}
                                                    {/* <p className="text-sm text-slate-500">{q.progress}/{q.goal}</p> */}
                                                </div>

                                                {/* Progress bar with text inside */}
                                                <div className="mt-2 w-full bg-slate-200 rounded-full h-4 relative overflow-hidden">
                                                    <div
                                                        className="h-4 rounded-full"
                                                        style={{
                                                            width: `${pct}%`,
                                                            background: "linear-gradient(90deg,#f59e0b,#f97316)",
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 font-semibold pointer-events-none">
                                                        {q.progress} / {q.goal}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Treasure Chest Icon */}
                                            <div className="w-10 h-10 mt-6 rounded-lg bg-amber-50 flex items-center justify-center shadow-sm">
                                                <Gift className="w-6 h-6 text-amber-600" />
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>

                        </div>

                        {/* Recent Achievements (wider card) */}
                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Recent Achievements</h3>
                            <div className="space-y-4">
                                {recentAchievements.map((a, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start justify-between gap-4 p-3 rounded-lg bg-gradient-to-b from-white to-slate-50 border border-white/20"
                                    >
                                        <div>
                                            <p className="font-semibold text-slate-900">{a.title}</p>
                                            <p className="text-sm text-slate-500">{a.subtitle}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {a.earned ? (
                                                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-5 h-5 text-yellow-400"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.376 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.63 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.966z" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    ☆
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </section>

                </div>
            </main>

            {/* Footer Navigation */}
            <FooterNav />
        </div>
    );
}