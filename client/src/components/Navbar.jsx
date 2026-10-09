import React, { useContext } from "react";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const user = authUser;

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
        <button
          onClick={() => navigate("/profile")}
          className="group flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-[#1E293B]"
          aria-label="Open profile"
        >
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#334155] bg-[#1E293B]">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.fullName || "Profile"}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={20} className="text-[#94A3B8]" />
            )}
          </div>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
