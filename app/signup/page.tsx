"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", firebase: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validEmail, setValidEmail] = useState<boolean | null>(null);
  const [validPassword, setValidPassword] = useState<boolean | null>(null);

  // Validation
  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = regex.test(value);
    setValidEmail(valid);
    setErrors((prev) => ({ ...prev, email: valid ? "" : "Enter a valid email address" }));
    setEmail(value);
  };

  const validatePassword = (value: string) => {
    const valid = value.length >= 6;
    setValidPassword(valid);
    setErrors((prev) => ({
      ...prev,
      password: valid ? "" : "Password must be at least 6 characters",
    }));
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validEmail || !validPassword) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, firebase: "" }));

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      let errorMessage = "Something went wrong.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      }

      setErrors((prev) => ({ ...prev, firebase: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE — Sign Up Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-16 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-lg sm:text-xl  mb-6 text-center md:text-left whitespace-nowrap">
            Join <span className="text-orange-500">HighScore</span> and start scoring higher
          </h2>

          <h3 className="text-2xl font-semibold mb-6">Sign up</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`mt-1 pr-10 border-2 transition-all outline-none 
                    focus-visible:ring-0 focus:ring-0 focus:border-transparent shadow-none 
                    ${
                      validEmail === false
                        ? "border-red-500"
                        : validEmail === true
                        ? "border-green-500"
                        : "border-gray-300 focus:border-orange-500"
                    }`}
                  value={email}
                  onChange={(e) => validateEmail(e.target.value)}
                />
                {validEmail === true && (
                  <Check className="absolute right-3 top-3 text-green-500 h-5 w-5" />
                )}
                {validEmail === false && (
                  <X className="absolute right-3 top-3 text-red-500 h-5 w-5" />
                )}
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  className={`mt-1 pr-10 border-2 transition-all outline-none 
                    focus-visible:ring-0 focus:ring-0 focus:border-transparent shadow-none 
                    ${
                      validPassword === false
                        ? "border-red-500"
                        : validPassword === true
                        ? "border-green-500"
                        : "border-gray-300 focus:border-orange-500"
                    }`}
                  value={password}
                  onChange={(e) => validatePassword(e.target.value)}
                />
                {validPassword === true && (
                  <Check className="absolute right-3 top-3 text-green-500 h-5 w-5" />
                )}
                {validPassword === false && (
                  <X className="absolute right-3 top-3 text-red-500 h-5 w-5" />
                )}
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Firebase Error */}
            {errors.firebase && (
              <p className="text-xs text-red-500 mt-2 text-center">{errors.firebase}</p>
            )}

            <div className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 hover:underline">
                Log in
              </Link>
            </div>

            <Button
              type="submit"
              className={`w-full ${
                isSubmitting || !validEmail || !validPassword
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
              disabled={isSubmitting || !validEmail || !validPassword}
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </Button>

            <p className="text-[11px] text-gray-500 text-center mt-2">
              By signing up you agree to our{" "}
              <Link href="#" className="text-orange-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-orange-500 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE — Illustration */}
      <div className="w-full md:w-1/2 bg-[#132D46] flex flex-col justify-center items-center text-center text-white px-8 py-12">
        <div className="relative w-64 h-64 mb-6">
          <Image
            src="/signup-pencil.png"
            alt="Signup Illustration"
            fill
            className="object-contain"
          />
        </div>
 <h2 className="text-lg font-bold tracking-wide mb-2">
          UNLOCK YOUR BEST SCORE
        </h2>
        <p className="text-sm max-w-xs leading-relaxed text-gray-300">
          From Video Lessons To Quiz Battles, Everything You Need To Level Up
          Your Exam Prep.
        </p>

        <div className="flex space-x-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
}
