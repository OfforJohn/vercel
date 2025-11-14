"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, X } from "lucide-react";

export default function ResetPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]); // ✅ OTP as array
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validEmail, setValidEmail] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"email" | "otp" | "reset" | "success">("email");

  const [errors, setErrors] = useState({ email: "", otp: "", password: "", confirmPassword: "" });
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmValid, setConfirmValid] = useState(false);

  const slides = [{ bg: "/Union2.svg", img: "/lock.png" }];
  const currentSlide = slides[0];

  // ===== Helpers =====
  const validatePassword = (val: string) => {
    const strong =
      /[A-Z]/.test(val) &&
      /[a-z]/.test(val) &&
      /[0-9]/.test(val) &&
      /[^A-Za-z0-9]/.test(val) &&
      val.length >= 8;
    setPasswordValid(strong);
  };

  const checkConfirmPassword = (confirmValue: string, mainPassword: string) => {
    if (confirmValue === mainPassword && confirmValue.length > 0) {
      setConfirmValid(true);
      setErrors(prev => ({ ...prev, confirmPassword: "" }));
    } else {
      setConfirmValid(false);
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
    }
  };

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = regex.test(value);
    setValidEmail(valid);
    setErrors(prev => ({ ...prev, email: valid ? "" : "Enter a valid email address" }));
    setEmail(value);
  };

  // ===== OTP & Email =====
  const sendOtp = async () => {
    if (isSubmitting) return; // prevent multiple clicks
    if (!validEmail || !email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-reset-email/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      toast.success("OTP generated! Check your email.");
      setStep("otp");
      setOtp(["", "", "", ""]); // reset OTP inputs
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
      setErrors(prev => ({ ...prev, email: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      toast.error("Enter the complete 4-digit OTP.");
      return;
    }

    if (!email) {
      toast.error("Email missing. Go back and enter your email.");
      setStep("email");
      return;
    }

    if (isSubmitting) return; // prevent multiple verification requests
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-reset-email/verify-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");

      toast.success("OTP verified! You can now reset your password.");
      setStep("reset");
    } catch (error: any) {
      toast.error(error.message || "Invalid OTP");
      setErrors(prev => ({ ...prev, otp: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== Reset Password =====
  const resetPassword = async () => {
    if (!password) {
      toast.error("Please enter a new password.");
      return;
    }

    if (!email) {
      toast.error("Email missing. Go back and enter your email.");
      setStep("email");
      return;
    }

    if (isSubmitting) return; // prevent double submit
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password");

      toast.success("Password reset successfully! Redirecting to login...");
      setStep("success");

      setTimeout(() => router.push("/login"), 1500); // redirect after toast

      // Reset state
      setEmail("");
      setOtp(["", "", "", ""]);
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
      setErrors(prev => ({ ...prev, password: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE — Reset Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-20 bg-white pt-16 md:pt-0">
        <div className="w-full max-w-md">
          <h3 className="text-2xl mb-8 text-left">
            {step === "email"
              ? "Enter your email"
              : step === "otp"
                ? "A reset link has been sent to your email. Enter the 4-digit code below."
                : "Enter your new password"}
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step === "email") sendOtp();
              else if (step === "otp") handleVerifyOtp();
              else if (step === "reset") resetPassword();
            }}
            className="space-y-6"
          >
            {/* Email Step */}
            {step === "email" && (
              <div className="relative mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => validateEmail(e.target.value)}
                  className={`w-full h-14 px-4 pr-12 text-lg border-2 rounded-xl outline-none transition-all shadow-none focus:ring-0 focus-visible:ring-0 focus:border-orange-500 ${
                    validEmail === false
                      ? "border-red-500"
                      : validEmail === true
                        ? "border-green-500"
                        : "border-gray-300"
                  }`}
                />
                {validEmail === true && <Check className="absolute right-4 top-4 text-green-500 h-6 w-6" />}
                {validEmail === false && <X className="absolute right-4 top-4 text-red-500 h-6 w-6" />}
                {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email}</p>}
              </div>
            )}

            {/* OTP Step */}
            {step === "otp" && (
              <div className="w-full">
                <p className="text-gray-600 mb-3 text-md">OTP code</p>
                <div className="flex justify-center md:justify-start gap-3 md:gap-4">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/, "");
                        setOtp(prev => {
                          const newOtp = [...prev];
                          newOtp[i] = val;
                          return newOtp;
                        });
                        if (val && i < 3) {
                          document.getElementById(`otp-${i + 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[i] && i > 0) {
                          document.getElementById(`otp-${i - 1}`)?.focus();
                        }
                      }}
                      className="w-14 h-14 text-center text-lg rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:outline-none bg-[#FFE9DD]"
                    />
                  ))}
                </div>
                {errors.otp && <p className="text-sm text-red-500 mt-2">{errors.otp}</p>}
            
              </div>
            )}

            {/* Reset Password Step */}
            {step === "reset" && (
              <div className="w-full max-w-md space-y-6">
                {/* New Password */}
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    className={`w-full h-14 text-lg px-4 pr-12 rounded-xl border-2 transition-all focus:border-orange-500 focus:outline-none ${
                      passwordValid ? "border-green-500" : errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {passwordValid && <Check className="absolute right-4 top-4 text-green-500 h-6 w-6" />}
                  {errors.password && <p className="text-sm text-red-500 mt-2">{errors.password}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    Must include an uppercase & lowercase letter, a number & a special character
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      const val = e.target.value;
                      setConfirmPassword(val);
                      checkConfirmPassword(val, password);
                    }}
                    className={`w-full h-14 text-lg px-4 pr-12 rounded-xl border-2 transition-all focus:border-orange-500 focus:outline-none ${
                      confirmValid ? "border-green-500" : errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {confirmValid && <Check className="absolute right-4 top-4 text-green-500 h-6 w-6" />}
                  {errors.confirmPassword && <p className="text-sm text-red-500 mt-2">{errors.confirmPassword}</p>}
                </div>
              </div>
            )}
            

            {/* Submit Button */}
            <div className="fixed bottom-0 left-0 w-full bg-white px-6 py-6 border-t md:static md:w-auto md:mt-0 md:px-0 md:py-0 md:border-0 transition-all">
                  <p className="text-right md:text-left text-sm mt-2 text-gray-500">
                  Did not receive code?{" "}
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={isSubmitting}
                    className="text-orange-500 underline disabled:opacity-50"
                  >
                    Resend code
                  </button>
                </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-5 h-[52px] text-base font-semibold rounded-full text-white bg-[linear-gradient(180deg,#FF9053_0%,#DB5206_100%)] hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {isSubmitting
                  ? "Processing..."
                  : step === "email"
                    ? "Send OTP"
                    : step === "otp"
                      ? "Verify OTP"
                      : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE — Illustration */}
      <div className="hidden md:flex w-full md:w-1/2 bg-[#132D46] flex-col justify-center items-center text-center text-white px-8 py-14">
        <div
          className="relative w-[22rem] h-[22rem] sm:w-[24rem] sm:h-[24rem] md:w-[30rem] md:h-[28rem] lg:w-[32rem] lg:h-[26rem] xl:w-[38rem] xl:h-[32rem] mb-10 bg-cover bg-center rounded-2xl overflow-hidden transition-all duration-500"
          style={{ backgroundImage: `url(${currentSlide.bg})` }}
        >
          <Image
            key={currentSlide.img}
            src={currentSlide.img}
            alt="Reset Illustration"
            fill
            className="object-contain drop-shadow-2xl transform scale-110 sm:scale-125 md:scale-145 lg:scale-165 translate-y-4 md:translate-y-4 -translate-x-6 md:-translate-x-14 transition-all duration-500"
          />
        </div>
        <h2 className="text-lg md:text-2xl font-bold tracking-wide mb-3 leading-snug">LOCKED OUT?</h2>
        <p className="text-sm md:text-base max-w-md leading-relaxed text-gray-300">
          Enter your email to receive an OTP and regain access to your account.
        </p>
      </div>
    </div>
  );
}
