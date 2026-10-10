import {
  ArrowLeft,
  File,
  MessageCircle,
  MoreVertical,
  Send,
  UserRound,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatSection = ({ user, onBack, onUserClick }) => {
  const [message, setMessage] = useState("");
  const [optionsOpen, setOptionsOpen] = useState(false);
  const scrollEnd = useRef(null);

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messagesDummyData]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    console.log("Message:", message);

    setMessage("");
  };

  return user ? (
    <div className="flex h-full min-h-0 flex-col bg-[#0F172A]">
      {/* ================= HEADER ================= */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#334155] bg-[#0F172A] px-4">
        {/* User Info */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Back button - mobile */}
          <button
            onClick={onBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-[#1E293B] hover:text-[#F8FAFC] md:hidden"
          >
            <ArrowLeft size={20} />
          </button>

          {/* User */}
          <button
            onClick={onUserClick}
            className="flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-[#1E293B]"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#334155]">
                  <UserRound size={20} className="text-[#94A3B8]" />
                </div>
              )}

              {/* Online */}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0F172A] bg-emerald-400" />
            </div>

            {/* Name + status */}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#F8FAFC]">
                {user.fullName}
              </p>

              <p className="mt-0.5 text-xs text-emerald-400">Online</p>
            </div>
          </button>
        </div>

        {/* More */}
        <button
          onClick={() => setOptionsOpen(true)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#94A3B8] transition hover:bg-[#1E293B] hover:text-[#F8FAFC]"
        >
          <MoreVertical size={20} />
        </button>
      </header>

      {/* ================= MESSAGES ================= */}
      <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          {messagesDummyData.map((msg, index) => {
            // Change this later according to your actual message structure
            const isOwnMessage = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex items-end gap-2.5 ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                {/* Other user's avatar */}
                {!isOwnMessage && (
                  <div className="shrink-0">
                    {msg.image ? (
                      <img
                        src={msg.image}
                        alt="user"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#334155]">
                        <UserRound size={16} className="text-[#94A3B8]" />
                      </div>
                    )}
                  </div>
                )}

                {/* Message */}
                <div
                  className={`max-w-[75%] md:max-w-[60%] ${
                    isOwnMessage ? "items-end" : "items-start"
                  } flex flex-col`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      isOwnMessage
                        ? "rounded-br-md bg-[#6366F1] text-white"
                        : "rounded-bl-md bg-[#1E293B] text-[#E2E8F0]"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="mt-1 px-1 text-[10px] text-[#64748B]">
                    {formatMessageTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}

          <div ref={scrollEnd} />
        </div>
      </main>

      {/* ================= INPUT ================= */}
      <div className="shrink-0 border-t border-[#334155] bg-[#0F172A] px-3 py-3 md:px-6">
        <form
          onSubmit={handleSendMessage}
          className="mx-auto flex max-w-3xl items-center gap-2"
        >
          {/* Input container */}
          <div className="flex min-w-0 flex-1 items-center rounded-2xl border border-[#334155] bg-[#1E293B] px-3 transition focus-within:border-[#6366F1]">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message..."
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-[#F8FAFC] outline-none placeholder:text-[#64748B]"
            />

            {/* File */}
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              hidden
            />

            <label
              htmlFor="image"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#94A3B8] transition hover:bg-[#334155] hover:text-[#F8FAFC]"
            >
              <File size={19} />
            </label>
          </div>

          {/* Send */}
          <button
            type="submit"
            disabled={!message.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#6366F1] text-white transition hover:bg-[#5558E8] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  ) : (
    /* ================= EMPTY STATE ================= */
    <div className="flex h-full flex-col items-center justify-center bg-[#0F172A] px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E293B]">
        <MessageCircle size={30} className="text-[#6366F1]" />
      </div>

      <h2 className="text-lg font-semibold text-[#F8FAFC]">
        Chat anytime, anywhere
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#64748B]">
        Select a conversation from your messages to start chatting.
      </p>
    </div>
  );
};

export default ChatSection;
