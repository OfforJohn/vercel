import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json();
  const { authid, coinsEarned, xpEarned, didWin } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // needed for safe server updates
  );

  // Get the user's current stats
  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("coins, xp, totalmatches, wins")
    .eq("authid", authid)
    .single();

  if (fetchError) return NextResponse.json({ error: fetchError }, { status: 400 });

  const newCoins = user.coins + coinsEarned;
  const newXP = user.xp + xpEarned;
  const newTotal = user.totalmatches + 1;
  const newWins = didWin ? user.wins + 1 : user.wins;
  const newWinrate = Math.floor((newWins / newTotal) * 100);

  // Update user record
  const { error: updateError } = await supabase
    .from("users")
    .update({
      coins: newCoins,
      xp: newXP,
      totalmatches: newTotal,
      wins: newWins,
      winrate: newWinrate,
    })
    .eq("authid", authid);

  if (updateError) {
    return NextResponse.json({ error: updateError }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
