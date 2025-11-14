import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { email, otp } = await req.json();
  if (!email || !otp)
    return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });

  console.log("Verifying OTP:", { email, otp, now: new Date().toISOString() });

  // Optional: remove previous OTPs first
  // await supabase.from("otps").delete().eq("email", email);

  const { data, error } = await supabase
    .from("otps")
    .select("*")
    .eq("email", email)
    .eq("otp", otp.toString())
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (!data || error) {
    console.log("OTP verification failed:", { data, error });
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  console.log(`OTP verified for ${email}: ${otp}`);

  await supabase.from("otps").delete().eq("id", data.id);

  return NextResponse.json({ success: true });
}
