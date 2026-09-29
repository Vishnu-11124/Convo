
import { Search, UserRound, X } from 'lucide-react'
import React, { useState } from 'react'
import { userDummyData } from '../assets/assets'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const [searchUser, setSearchUser] = useState('')

  const filteredUsers = userDummyData.filter((user) =>
    user.fullName.toLowerCase().includes(searchUser.toLowerCase())
  )

  return (
    <div className="h-full bg-[#0F172A] text-[#F8FAFC]">

      {/* Search */}
      <div className="px-4 py-4">
        <div className="flex h-11 items-center gap-3 rounded-xl border border-[#334155] bg-[#1E293B] px-3 transition focus-within:border-[#6366F1]">
          <Search
            size={18}
            className="shrink-0 text-[#94A3B8]"
          />

          <input
            type="text"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search people"
            className="min-w-0 flex-1 bg-transparent text-sm text-[#F8FAFC] outline-none placeholder:text-[#64748B]"
          />

          {searchUser && (
            <button
              onClick={() => setSearchUser('')}
              className="text-[#64748B] transition hover:text-[#F8FAFC]"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Section title */}
      <div className="flex items-center justify-between px-5 pb-3">
        <h2 className="text-sm font-semibold text-[#F8FAFC]">
          Messages
        </h2>

        <span className="text-xs text-[#64748B]">
          {filteredUsers.length}
        </span>
      </div>

      {/* Chats */}
      <div className="px-2">

        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => {
            const isSelected = selectedUser?._id === user._id
            const isOnline = index < 3
            const unread = index < 2

            return (
              <button
                key={user._id || index}
                onClick={() => setSelectedUser(user)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                  isSelected
                    ? 'bg-[#6366F1]/15'
                    : 'hover:bg-[#1E293B]'
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
                      <UserRound
                        size={22}
                        className="text-[#94A3B8]"
                      />
                    </div>
                  )}

                  {/* Online indicator */}
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0F172A] ${
                      isOnline
                        ? 'bg-emerald-400'
                        : 'bg-[#64748B]'
                    }`}
                  />
                </div>

                {/* User details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-sm font-medium ${
                        isSelected
                          ? 'text-[#F8FAFC]'
                          : 'text-[#E2E8F0]'
                      }`}
                    >
                      {user.fullName}
                    </p>

                    {unread && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#6366F1] px-1.5 text-[10px] font-semibold text-white">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 truncate text-xs text-[#64748B]">
                    {isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>

              </button>
            )
          })
        ) : (
          /* Empty search state */
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1E293B]">
              <Search size={20} className="text-[#64748B]" />
            </div>

            <p className="text-sm font-medium text-[#CBD5E1]">
              No people found
            </p>

            <p className="mt-1 text-xs text-[#64748B]">
              Try searching with a different name
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Sidebar

