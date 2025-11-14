// lib/auth.ts
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

export const otpStore: Record<
  string,
  { otp: string; expiresAt: number }
> = {};
