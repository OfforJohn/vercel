import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Required fields
    if (!body.authid || !body.email) {
      return NextResponse.json(
        { error: "authId and email are required" },
        { status: 400 }
      );
    }

    // Map to lowercase column names
    const row = {
      authid: body.authid,
      email: body.email,
      username: body.username || body.email.split("@")[0],
      displayname: body.displayName || body.email.split("@")[0],
      rank: body.rank || "Bronze",
      xp: body.xp || 0,
      coins: body.coins || 0,
      avatar: body.avatar || "🎮",
      totalmatches: body.totalMatches || 0,
      wins: body.wins || 0,
      winrate: body.winRate || 0,
    };

    const { data, error } = await supabase.from("users").insert([row]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
