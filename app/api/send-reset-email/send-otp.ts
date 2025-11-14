// /api/send-otp.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  const { error } = await supabase.from("otps").insert([{ email, otp, expires_at: expiresAt }]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  console.log(`OTP for ${email}: ${otp}`);
  return NextResponse.json({ success: true, message: "OTP sent! Check Your Email." });
}
