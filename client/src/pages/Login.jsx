import React, { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const isSignUp = currentState === "Sign up";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F172A] px-4 py-8 text-[#F8FAFC]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#6366F1]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-[#6366F1]/10 blur-3xl" />

      {/* Main content */}
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute h-8 w-8 rounded-full border-2 border-[#6366F1]" />

              <div className="absolute h-2 w-2 -translate-x-1.5 rounded-full bg-[#6366F1]" />
              <div className="absolute h-2 w-2 rounded-full bg-[#6366F1]" />
              <div className="absolute h-2 w-2 translate-x-1.5 rounded-full bg-[#6366F1]" />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">Convo</h1>
          </div>

          <p className="mt-3 text-center text-sm text-[#64748B]">
            Connect, chat, and stay in touch.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-[#334155] bg-[#1E293B]/80 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
          {/* Heading */}
          <div className="mb-7 text-center">
            <h2 className="text-xl font-semibold text-[#F8FAFC]">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h2>

            <p className="mt-1.5 text-sm text-[#64748B]">
              {isSignUp
                ? "Create an account to start chatting."
                : "Sign in to continue to Convo."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            {isSignUp && (
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-[#CBD5E1]"
                >
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />

                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    required
                    className="h-11 w-full rounded-xl border border-[#334155] bg-[#0F172A] pl-11 pr-4 text-sm text-[#F8FAFC] outline-none transition placeholder:text-[#475569] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-[#CBD5E1]"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                />

                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  required
                  className="h-11 w-full rounded-xl border border-[#334155] bg-[#0F172A] pl-11 pr-4 text-sm text-[#F8FAFC] outline-none transition placeholder:text-[#475569] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#CBD5E1]"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  required
                  className="h-11 w-full rounded-xl border border-[#334155] bg-[#0F172A] pl-11 pr-11 text-sm text-[#F8FAFC] outline-none transition placeholder:text-[#475569] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] transition hover:text-[#CBD5E1]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-11 w-full rounded-xl bg-[#6366F1] text-sm font-semibold text-white transition hover:bg-[#5558E8] active:scale-[0.99]"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Switch Auth State */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#334155]" />
            <span className="text-xs text-[#475569]">OR</span>
            <div className="h-px flex-1 bg-[#334155]" />
          </div>

          <p className="text-center text-sm text-[#64748B]">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}

            <button
              type="button"
              onClick={() => setCurrentState(isSignUp ? "Sign in" : "Sign up")}
              className="ml-1 font-medium text-[#818CF8] transition hover:text-[#A5B4FC]"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#475569]">
          © 2026 Convo. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
