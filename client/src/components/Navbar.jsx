import React from "react";
import { UserRound } from "lucide-react";

const Navbar = () => {
  const user = true;

  return (
    <nav className="flex h-16 items-center justify-between border-b border-[#334155] bg-[#0F172A] px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="relative flex h-8 w-8 items-center justify-center">
          <div className="absolute h-7 w-7 rounded-full border-2 border-[#6366F1]" />

          <div className="absolute h-2 w-2 rounded-full bg-[#6366F1] -translate-x-1.5" />
          <div className="absolute h-2 w-2 rounded-full bg-[#6366F1]" />
          <div className="absolute h-2 w-2 rounded-full bg-[#6366F1] translate-x-1.5" />
        </div>

        <h1 className="text-xl font-semibold tracking-tight text-[#F8FAFC]">
          Convo
        </h1>
      </div>

      {/* Profile */}
      {user && (
        <button className="group flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-[#1E293B]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#334155]">
            <UserRound size={19} className="text-[#CBD5E1]" />
          </div>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
