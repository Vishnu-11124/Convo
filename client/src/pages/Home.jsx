import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatSection from "../components/ChatSection";
import RightSidebar from "../components/RightSidebar";
import Navbar from "../components/Navbar";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  return (
    <div className="h-screen w-full overflow-hidden bg-[#0F172A] text-[#F8FAFC]">
      <div className="relative flex h-full w-full">
        {/* ================= LEFT SIDEBAR ================= */}
        <aside
          className={`
            w-full shrink-0 bg-[#0F172A]
            md:w-[340px]
            ${selectedUser ? "hidden md:block" : "block"}
          `}
        >
          {/* Navbar */}
          <div className="h-16 border-b border-[#334155]">
            <Navbar
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div>

          {/* Chat List */}
          <div className="h-[calc(100vh-64px)] overflow-y-auto">
            <Sidebar
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
            />
          </div>
        </aside>

        {/* ================= CHAT SECTION ================= */}
        <main
          className={`
            min-w-0 flex-1
            ${selectedUser ? "block" : "hidden md:block"}
          `}
        >
          <ChatSection
            user={selectedUser}
            onBack={() => {
              setSelectedUser(null);
              setShowRightSidebar(false);
            }}
            onUserClick={() => setShowRightSidebar(true)}
          />
        </main>

        {/* ================= DESKTOP RIGHT SIDEBAR ================= */}
        {showRightSidebar && (
          <aside className="hidden w-[300px] shrink-0 border-l border-[#334155] bg-[#1E293B] lg:block">
            <RightSidebar
              user={selectedUser}
              onClose={() => setShowRightSidebar(false)}
            />
          </aside>
        )}

        {/* ================= MOBILE RIGHT SIDEBAR ================= */}
        {showRightSidebar && (
          <div className="absolute inset-0 z-50 bg-[#1E293B] lg:hidden">
            <RightSidebar
              user={selectedUser}
              onClose={() => setShowRightSidebar(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
