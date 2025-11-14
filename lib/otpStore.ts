// otpStore.ts
interface OTPRecord {
  otp: string;
  expiresAt: number;
}

export const otpStore: Record<string, OTPRecord> = {};
