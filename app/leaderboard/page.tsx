"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, TrendingUp, Users, Target, Calendar } from "lucide-react";
import Link from "next/link";
import Leaderboard from "@/components/leaderboard";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [activePlayers, setActivePlayers] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [avgImprovement, setAvgImprovement] = useState(0);
  const [dailyUpdates, setDailyUpdates] = useState(0);

  // Fetch all stats from Supabase
  useEffect(() => {
    async function loadStats() {
      // Fetch all users
      const { data: users, error } = await supabase
        .from("users")
        .select("*");

      if (error || !users) return;

      // 1️⃣ Active Players Count
      setActivePlayers(users.length);

      // 2️⃣ Games Played = SUM(totalmatches)
      const totalGames = users.reduce(
        (sum, user) => sum + (user.totalmatches || 0),
        0
      );
      setGamesPlayed(totalGames);

      // 3️⃣ Avg Improvement = (wins / totalmatches) averaged
      let totalPercentage = 0;
      let counted = 0;

      users.forEach((u) => {
        if (u.totalmatches > 0) {
          totalPercentage += (u.wins / u.totalmatches) * 100;
          counted++;
        }
      });

      const avg = counted > 0 ? (totalPercentage / counted).toFixed(1) : 0;
      //setAvgImprovement(avg);

      // 4️⃣ Daily updates: updated_at is today
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const updatedToday = users.filter(
        (u) => new Date(u.updated_at) >= today
      ).length;

      setDailyUpdates(updatedToday);
    }

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-16 h-16 relative">
              <Image
                src="/highscore-logo-final.png"
                alt="HighScore Logo"
                width={64}
                height={64}
                className="object-contain rounded-lg"
              />
            </div>
            <span className="text-2xl font-bold text-blue-900">HighScore.</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
      
     

        {/* Main Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <Leaderboard showAllGames={true} />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
            <CardContent className="pt-6">
              <Trophy className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Join the Champions?
              </h3>
              <p className="text-gray-600 mb-6">
                Start playing our educational games and see your name climb up
                the leaderboard!
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/games1">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Play Games
                  </Button>
                </Link>
                <Link href="/courses/CBT-PRACTICE">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 bg-transparent"
                  >
                    Practice CBT
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
