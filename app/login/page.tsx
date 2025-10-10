"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", firebase: "" });
  const [validEmail, setValidEmail] = useState<boolean | null>(null);
  const [validPassword, setValidPassword] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
const slides = [
  { bg: "/Union2.svg", img: "/login-pencil.png" },
  { bg: "/Union1.svg", img: "/login-book.png" },
  { bg: "/Union2.svg", img: "/star.png" },
];



  const [currentIndex, setCurrentIndex] = useState(0);

  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];



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
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      let errorMessage = "Login failed.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      }

      setErrors((prev) => ({ ...prev, firebase: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE — Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-20 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <h2 className="text-xl sm:text-2xl mb-3 text-gray-800 text-center md:text-left">
            Welcome Back to <span className="font-semibold">Highscore</span>
          </h2>
          <h3 className="text-3xl font-bold mb-8 text-center md:text-left">Log in</h3>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <Label htmlFor="email" className="text-base font-medium">
                  Email Address
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address or UserName"
                    className={`w-full h-14 text-lg px-4 pr-12 border-2 rounded-xl transition-all outline-none 
          focus-visible:ring-0 focus:ring-0 focus:border-transparent shadow-none 
          ${validEmail === false
                        ? "border-red-500"
                        : validEmail === true
                          ? "border-green-500"
                          : "border-gray-300 focus:border-orange-500"
                      }`}
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                  />
                  {validEmail === true && (
                    <Check className="absolute right-4 top-4 text-green-500 h-6 w-6" />
                  )}
                  {validEmail === false && (
                    <X className="absolute right-4 top-4 text-red-500 h-6 w-6" />
                  )}
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 mt-2">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <Label htmlFor="password" className="text-base font-medium">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className={`w-full h-14 text-lg px-4 pr-12 border-2 rounded-xl transition-all outline-none 
          focus-visible:ring-0 focus:ring-0 focus:border-transparent shadow-none 
          ${validPassword === false
                        ? "border-red-500"
                        : validPassword === true
                          ? "border-green-500"
                          : "border-gray-300 focus:border-orange-500"
                      }`}
                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                  />
                  <div className="mt-3">
                    <Link href="#" className="text-base text-gray-700 ">
                      Forgot password?{" "}
                      <span className="text-orange-500 font-semibold hover:underline">Reset here</span>
                    </Link>
                  </div>
                  {validPassword === true && (
                    <Check className="absolute right-4 top-4 text-green-500 h-6 w-6" />
                  )}
                  {validPassword === false && (
                    <X className="absolute right-4 top-4 text-red-500 h-6 w-6" />
                  )}
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-2">{errors.password}</p>
                )}
              </div>

            </div>



            {/* Sign up link */}
            <div className="text-center text-gray-700 mt-4 space-y-1">
              <p className="text-base">Don’t have an account?</p>
              <Link
                href="/signup"
                className="text-orange-500 font-semibold hover:underline block"
              >
                Sign up
              </Link>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !validEmail || !validPassword}
              className={`w-full py-4 text-lg font-semibold rounded-full transition-all ${isSubmitting || !validEmail || !validPassword
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
            >
              {isSubmitting ? "Signing in..." : "Login"}
            </button>



            {/* Terms & Policy */}
            <p className="text-sm text-center text-gray-500 mt-6 leading-relaxed">
              By clicking “Continue with Email” you agree to our User{" "}
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
      {/* RIGHT SIDE — Illustration */}
      <div className="w-full md:w-1/2 bg-[#132D46] flex flex-col justify-center items-center text-center text-white px-8 py-14">
        <div
          className="
      relative 
      w-[22rem] h-[22rem] 
      sm:w-[24rem] sm:h-[24rem] 
      md:w-[30rem] md:h-[28rem] 
      lg:w-[36rem] lg:h-[6rem] 
      xl:w-[42rem] xl:h-[34rem]
      mb-10      
      bg-cover bg-center 
      rounded-2xl overflow-hidden
      transition-all duration-500
    "
    
    style={{ backgroundImage: `url(${currentSlide.bg})` }}  // ✅ dynamic background here
    >
          <Image
            key={currentSlide.img}
      src={currentSlide.img}
         alt="Login Illustration"
            fill
            className="
        object-contain 
        drop-shadow-2xl 
        transform 
        scale-110 sm:scale-125 md:scale-145 lg:scale-165
          -translate-y-8 md:-translate-y-10
        transition-all duration-500
      "
          />
        </div>


        <h2 className="text-lg md:text-2xl font-bold tracking-wide mb-3 leading-snug">
          WELCOME BACK TO YOUR LEARNING JOURNEY
        </h2>

        <p className="text-sm md:text-base max-w-md leading-relaxed text-gray-300">
          From Video Lessons To Quiz Battles, Everything You Need To Level Up Your Exam Prep.
        </p>
 {/* INDICATOR DOTS */}
      <div className="flex space-x-3 mt-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentIndex ? "bg-orange-500 scale-125" : "bg-white opacity-70"
            }`}
          ></div>
        ))}
      </div>
    </div>  </div>
  );
}
