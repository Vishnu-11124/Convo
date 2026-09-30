import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  return (
    <div>
      {/* logo */}
      <div>
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
      {/* form */}
      <div>
        <form>
          <h2>{currentState === "Sign up" ? "Sign Up" : "Sign In"}</h2>
          <hr />

          {currentState === "Sign up" && (
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" required />
            </div>
          )}

          <div>

          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>

          <div>
            <button type="submit">{currentState === "Sign up" ? "Sign Up" : "Sign In"}</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
