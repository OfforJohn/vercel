import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Zap, Trophy } from 'lucide-react';
import { supabase } from "@/lib/supabaseClient";


import type { User } from './types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface MatchSimulationProps {
  user: User;

  authid: string;
  gameMode: string;
  subjects: string[];
  onGameStart: () => void;
  onBack: () => void;
}

const MatchSimulation: React.FC<MatchSimulationProps> = ({
  user,
  authid,
  gameMode,
  subjects,
  onGameStart,
  onBack
}) => {
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [foundMatch, setFoundMatch] = useState(false);
  const [opponents, setOpponents] = useState<Array<{
    name: string;
    avatar: string;
    rank: string;
    rating: number;
  }>>([]);





  const [username, setUsername] = useState<string | null>(null);
  


  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("username") : null;
    setUsername(stored ?? "ControlEdu");
  }, []);



  // 1️⃣ Interval to update progress
  useEffect(() => {
    const interval = setInterval(() => {
      setMatchingProgress(prev => Math.min(prev + 10, 100));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // 2️⃣ Fetch opponents when progress hits 100
  useEffect(() => {
    if (matchingProgress === 100 && !foundMatch) {
      setFoundMatch(true);
      fetchRealOpponents(); // will only run once
    }
  }, [matchingProgress, foundMatch]);

  function formatRank(rank: string) {
  if (!rank) return "Bronze";
  return rank.charAt(0).toUpperCase() + rank.slice(1).toLowerCase();
}




  async function fetchRealOpponents() {
    const { data, error } = await supabase
      .from("users")
      .select("username, displayname, avatar, rank, xp, authid")
      .neq("authid", user.authid)   // exclude yourself by Firebase UID
      .limit(10);

    if (error || !data) return;

  const formatted = data.map(u => ({
  name: u.username,
  avatar: u.avatar ?? "🙂",
  rank: getRank(Number(u.xp ?? 0)),  // ⭐ calculate fresh rank
  rating: Number(u.xp ?? 0),
}));

    console.log("Fetched opponents:", formatted);
    console.log("Current user authid:", getRankColor(user.rank));
    

    const shuffled = formatted.sort(() => 0.5 - Math.random());
    setOpponents(shuffled.slice(0, 3));
  }

  


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



  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'bronze': return 'text-orange-400';
      case 'silver': return 'text-gray-300';
      case 'gold': return 'text-yellow-400';
      case 'platinum': return 'text-amber-400';
      case 'diamond': return 'text-orange-300';
      case 'master': return 'text-yellow-500';
      default: return 'text-gray-400';
    }
    
  };
function getRank(xp: number) {
  if (xp >= 3500) return "Legend";
  if (xp >= 2500) return "Grandmaster";
  if (xp >= 1500) return "Master";
  if (xp >= 800) return "Diamond";
  if (xp >= 500) return "Gold";
  if (xp >= 300) return "Silver";
  return "Bronze";
}

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#04101F]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Finding Match</h1>
          <div></div>
        </div>

        {/* Game Info */}
        <div className="bg-[#1B1B1B] backdrop-blur-md rounded-2xl p-6 mb-8 border border-orange-400/30">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-orange-300 mb-2">
              Game Mode: {gameMode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h2>
            <div className="flex justify-center flex-wrap gap-2">
              {subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-br from-orange-400 to-yellow-400 text-black rounded-full text-sm font-semibold"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Your Profile */}
          <div className="bg-[#1B1B1B]/60 rounded-xl p-4 mb-6 border border-orange-400/30">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2" />

              {username}
            </h3>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-xl">
                {user.avatar}
              </div>
              <div>
                <p className="text-white font-medium">{user.displayName}</p>
                <p className={`text-sm ${getRankColor(user.rank)}`}>{user.rank}</p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">{user.xp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Matchmaking Progress */}
        {!foundMatch ? (
          <div className="bg-[#1B1B1B] backdrop-blur-md rounded-2xl p-8 border border-orange-400/30 text-center">
            <div className="animate-spin w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-4">Searching for opponents...</h2>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-orange-400 to-yellow-400 h-3 rounded-full transition-all duration-200"
                style={{ width: `${matchingProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-300">Finding players with similar skill level...</p>
          </div>
        ) : (
          <div className="bg-[#1B1B1B] backdrop-blur-md rounded-2xl p-8 border border-orange-400/30">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Match Found!</h2>
              <p className="text-gray-300">Get ready to battle these opponents</p>
            </div>

            {/* Opponents */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {opponents.map((opponent, index) => (
                <div
                  key={index}
                  className="bg-[#1B1B1B] rounded-xl p-4 border border-orange-400/30 transform hover:scale-105 transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                      {opponent.avatar}
                    </div>
                    <h3 className="text-white font-bold">{opponent.name}</h3>
                    <p className={`text-sm ${getRankColor(opponent.rank)} mb-2`}>{opponent.rank}</p>
                    <div className="flex items-center justify-center space-x-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-bold">{opponent.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={onGameStart}
                className="bg-gradient-to-br from-orange-400 to-yellow-400 text-black font-bold py-4 px-8 rounded-xl hover:from-orange-500 hover:to-yellow-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                Start Battle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchSimulation;
