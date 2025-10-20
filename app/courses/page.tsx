
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  MessageSquare,
  Palette,
  Settings,
  Atom,
  Book,
  BookOpenText,
  FlaskConical,
  Ruler,
  Search,
} from "lucide-react";


import { useMediaQuery } from 'react-responsive'; // at the top of your file



export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("ControlEdu");
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 1024 }); // lg breakpoint

  // Inside the component:
  const backgroundStyle = isDesktop
    ? { background: 'linear-gradient(to bottom, white 7%, #f3f4f6 7%)' }
    : { backgroundColor: '#f3f4f6' }; // solid gray for mobile


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

   const subjects = [
    { title: "Mathematics", color: "bg-blue-500", icon: <Ruler className="w-8 h-8 text-white" /> },
    { title: "English Language", color: "bg-green-500", icon: <BookOpenText className="w-8 h-8 text-white" /> },
    { title: "Physics", color: "bg-red-500", icon: <Atom className="w-8 h-8 text-white" /> },
    { title: "Chemistry", color: "bg-orange-400", icon: <FlaskConical className="w-8 h-8 text-white" /> },
    { title: "Biology", color: "bg-green-400", icon: <Book className="w-8 h-8 text-white" /> },
    { title: "Literature", color: "bg-purple-500", icon: <BookOpenText className="w-8 h-8 text-white" /> },
  ]


  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen"
      style={backgroundStyle}
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
            { name: "Dashboard", icon: Home, route: "lms" },
            { name: "Courses", icon: BookOpen, route: "/courses" },

            { name: "Play", icon: Gamepad2 },
            { name: "Community", icon: Users },
            { name: "Certification", icon: Award },
            { name: "Profile", icon: User },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (item.route) router.push(item.route);
              }}
              className={`flex items-center w-full gap-3 px-3 py-2 text-sm rounded-md transition-all
    hover:bg-orange-100 hover:text-orange-600
    ${pathname === item.route ? "bg-orange-100 text-orange-600" : "text-white"}`}
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
                  { name: "Dashboard", icon: Home, route: "/" },
                  { name: "Courses", icon: BookOpen, route: "/courses" },
                  { name: "Play", icon: Gamepad2, route: "/play" },
                  { name: "Community", icon: Users, route: "/community" },
                  { name: "Certification", icon: Award, route: "/certification" },
                  { name: "Profile", icon: User, route: "/profile" },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { }}
                    className={`flex items-center w-full gap-3 px-3 py-2 text-sm rounded-md transition-all
    hover:bg-[#F97316] hover:text-white
    ${pathname === item.route ? "bg-[#F97316]/10 text-[#F97316]" : "text-white"}`}
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
      <div className="lg:hidden mt-4 ml-4 mb-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="#F97316"  // <- your desired orange
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>


      {/* Main Content */}

      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:ml-64 pb-24">

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


<div className="min-h-screen bg-gray-50 p-6">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search subject or topic......"
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center  mb-6">
  
  <h2 className="text-2xl font-semibold text-gray-800 mb-1">Videos Tutorials</h2>
  <p className="text-gray-500 text-sm mb-4">
    Master WAEC & JAMB Subjects with bite-sized tutorials
  </p>
  <button className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-medium px-5 py-2 rounded-lg shadow">
    Continue Watching
  </button>
</div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100 hover:shadow-md transition"
          >
            <div className={`${subject.color} flex items-center justify-center h-32`}>
              {subject.icon}
            </div>
            <div className="py-3 text-center">
              <h3 className="text-gray-800 font-medium">{subject.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
          {/* Your content here */}
        </div>







        {/* Footer Navigation */}<footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">

          <div className="flex justify-around items-center h-16">
            <button className="flex flex-col items-center text-orange-500">
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-orange-500">
              <Users className="w-5 h-5" />
              <span className="text-xs mt-1">Leaderboard</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-orange-500">
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs mt-1">Chat</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-orange-500">
              <Settings className="w-5 h-5" />
              <span className="text-xs mt-1">Settings</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-orange-500">
              <Palette className="w-5 h-5" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>



        </footer>
      </main>
    </div>
  );
}
