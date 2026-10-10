import {
  MessageCircle,
  Search,
  UserRound,
  UserRoundPlus,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { userDummyData } from "../assets/assets";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const [searchUser, setSearchUser] = useState("");
  const [addUserForm, setAddUserForm] = useState(false);

  const filteredUsers = userDummyData.filter((user) =>
    user.fullName.toLowerCase().includes(searchUser.toLowerCase()),
  );

  return (
    <div className=" relative flex h-full min-h-0 flex-col bg-[#0F172A] text-[#F8FAFC]">
      {addUserForm ? (
        /* ================= Find Users ================= */
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Header */}
          {/* <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#334155] px-4">
            <div>
              <h3 className="text-base font-semibold">Find Users</h3>
              <p className="mt-0.5 text-xs text-[#64748B]">
                Add people to your conversations
              </p>
            </div>

            <button
              onClick={() => {
                setAddUserForm(false);
                setSearchUser("");
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[#94A3B8] transition hover:bg-[#1E293B] hover:text-[#F8FAFC]"
              aria-label="Close user search"
            >
              <X size={19} />
            </button>
          </div> */}

          {/* Phone search */}
          <div className="shrink-0 px-4 py-4">
            <label
              htmlFor="find-user"
              className="mb-2 block text-xs font-medium text-[#94A3B8]"
            >
              Search by phone number
            </label>

            <div className="flex h-11 items-center gap-3 rounded-xl border border-[#334155] bg-[#1E293B] px-3 transition focus-within:border-[#6366F1] focus-within:ring-2 focus-within:ring-[#6366F1]/10">
              <Search size={18} className="shrink-0 text-[#94A3B8]" />

              <input
                type="tel"
                id="find-user"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Enter phone number"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#F8FAFC] outline-none placeholder:text-[#64748B]"
              />

              {searchUser && (
                <button
                  type="button"
                  onClick={() => setSearchUser("")}
                  className="shrink-0 text-[#64748B] transition hover:text-[#F8FAFC]"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Search results */}
          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
            {!searchUser.trim() ? (
              <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#334155] bg-[#1E293B]">
                  <UserRoundPlus size={24} className="text-[#818CF8]" />
                </div>

                <p className="text-sm font-medium text-[#CBD5E1]">
                  Find someone on Convo
                </p>

                <p className="mt-1.5 max-w-[220px] text-xs leading-5 text-[#64748B]">
                  Enter a registered phone number to find and add a new contact.
                </p>
              </div>
            ) : (
              /*
              Render your API search results here.

              Example structure:
              searchResults.map((user) => (
                ...
              ))
            */
              <div className="flex flex-col items-center px-5 py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1E293B]">
                  <Search size={20} className="text-[#64748B]" />
                </div>

                <p className="text-sm font-medium text-[#CBD5E1]">
                  Search for this number
                </p>

                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  Matching users will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ================= Chat List ================= */
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Search */}
          <div className="shrink-0 px-4 py-4">
            <div className="flex h-11 items-center gap-3 rounded-xl border border-[#334155] bg-[#1E293B] px-3 transition focus-within:border-[#6366F1]">
              <Search size={18} className="shrink-0 text-[#94A3B8]" />

              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Search conversations"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#F8FAFC] outline-none placeholder:text-[#64748B]"
              />

              {searchUser && (
                <button
                  type="button"
                  onClick={() => setSearchUser("")}
                  className="shrink-0 text-[#64748B] transition hover:text-[#F8FAFC]"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Section title */}
          <div className="flex shrink-0 items-center justify-between px-5 pb-3">
            <h2 className="text-sm font-semibold text-[#F8FAFC]">Messages</h2>

            <span className="rounded-full bg-[#1E293B] px-2 py-1 text-xs text-[#94A3B8]">
              {filteredUsers.length}
            </span>
          </div>

          {/* Scrollable chat list */}
          <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => {
                const isSelected = selectedUser?._id === user._id;
                const isOnline = index < 3;
                const unread = index < 2;

                return (
                  <button
                    key={user._id || index}
                    onClick={() => setSelectedUser(user)}
                    className={`group mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      isSelected ? "bg-[#6366F1]/15" : "hover:bg-[#1E293B]"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      {user?.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt={user.fullName}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#334155]">
                          <UserRound size={22} className="text-[#94A3B8]" />
                        </div>
                      )}

                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0F172A] ${
                          isOnline ? "bg-emerald-400" : "bg-[#64748B]"
                        }`}
                      />
                    </div>

                    {/* User details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-[#E2E8F0]">
                          {user.fullName}
                        </p>

                        {unread && (
                          <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#6366F1] px-1.5 text-[10px] font-semibold text-white">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 truncate text-xs text-[#64748B]">
                        {isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1E293B]">
                  <Search size={20} className="text-[#64748B]" />
                </div>

                <p className="text-sm font-medium text-[#CBD5E1]">
                  No conversations found
                </p>

                <p className="mt-1 text-xs text-[#64748B]">
                  Try a different search term.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= Bottom Add User Action ================= */}
      <button
        type="button"
        onClick={() => {
          setAddUserForm((prev) => !prev);
          setSearchUser("");
        }}
        title={addUserForm ? "Back to messages" : "Add a user"}
        aria-label={addUserForm ? "Back to messages" : "Add a user"}
        className={`absolute bottom-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
          addUserForm
            ? "border border-[#334155] bg-[#1E293B] text-[#CBD5E1] hover:bg-[#334155]"
            : "bg-[#6366F1] text-white shadow-indigo-500/20 hover:bg-[#5558E8]"
        }`}
      >
        {addUserForm ? <X size={21} /> : <UserRoundPlus size={21} />}
      </button>
    </div>
  );
};

export default Sidebar;
