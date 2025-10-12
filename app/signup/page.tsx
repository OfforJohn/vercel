"use client";

import { useEffect, useState } from "react";
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
  const [validEmail, setValidEmail] = useState<boolean | null>(null);
  const [validPassword, setValidPassword] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slides = [
    { bg: "/Union2.svg", img: "/login-pencil.png" },
    { bg: "/Union1.svg", img: "/login-book.png" },
    { bg: "/Union2.svg", img: "/star.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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
      {/* LEFT SIDE — Signup Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-20 bg-white pt-16 md:pt-0">
        <div className="w-full max-w-md">
          <h2 className="text-xl sm:text-2xl mb-3 text-gray-500 font-semibold text-left">
            Join <span className="font-semibold text-orange-500">Highscore</span> and start scoring higher
          </h2>
          <h3 className="text-3xl font-bold mb-8 text-left">
            Sign up
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6 pb-32">
            {/* Email Input */}
            <div>
              <div className="relative mt-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
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
              {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
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

            {/* Firebase Error */}
            {errors.firebase && (
              <p className="text-sm text-red-500 text-center">{errors.firebase}</p>
            )}

            <div className="text-left text-gray-900 space-y-1 mt-7 pl-1">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 font-bold hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE — Illustration */}
      <div className="hidden md:flex w-full md:w-1/2 bg-[#132D46] flex-col justify-center items-center text-center text-white px-8 py-14">
        <div
          className="relative 
            w-[22rem] h-[22rem] 
            sm:w-[24rem] sm:h-[24rem] 
            md:w-[30rem] md:h-[28rem] 
            lg:w-[36rem] lg:h-[36rem] 
            xl:w-[42rem] xl:h-[34rem]
            mb-10
            bg-cover bg-center 
            rounded-2xl overflow-hidden
            transition-all duration-500"
          style={{ backgroundImage: `url(${currentSlide.bg})` }}
        >
          <Image
            key={currentSlide.img}
            src={currentSlide.img}
            alt="Signup Illustration"
            fill
            className="object-contain drop-shadow-2xl transform 
              scale-110 sm:scale-125 md:scale-145 lg:scale-165
              -translate-y-8 md:-translate-y-10
              transition-all duration-500"
          />
        </div>

        <h2 className="text-lg md:text-2xl font-bold tracking-wide mb-3 leading-snug">
          UNLOCK YOUR BEST SCORE
        </h2>

        <p className="text-sm md:text-base max-w-md leading-relaxed text-gray-300">
          From Video Lessons To Quiz Battles, Everything You Need To Level Up Your Exam Prep.
        </p>

        <div className="flex space-x-3 mt-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${index === currentIndex ? "bg-orange-500 scale-125" : "bg-white"
                }`}
            ></div>
          ))}
        </div>
      </div>

      {/* SUBMIT BUTTON — moved outside form to keep fixed if needed */}
      <div className="w-full px-6 py-6 border-t bg-white z-50 md:static md:w-auto md:mt-0 md:px-0 md:py-0 md:border-0 transition-all fixed bottom-0 left-0">
        <div className="max-w-md mx-auto">
          <Button
            type="submit"
            form="signup-form"
            className={`w-full py-4 text-lg font-semibold rounded-full transition-all ${isSubmitting || !validEmail || !validPassword
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            disabled={isSubmitting || !validEmail || !validPassword}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </Button>

          <p className="text-sm text-center text-gray-700 font-bold mt-6 leading-relaxed">
            By clicking "Continue with Email" you agree to our User
            <br />
            <Link href="#" className="text-orange-500 font-bold hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-orange-500 font-bold hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
