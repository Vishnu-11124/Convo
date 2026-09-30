import { UserRound, X, Images } from "lucide-react";
import React from "react";
import { imagesDummyData } from "../assets/assets";

const RightSidebar = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <aside className="flex h-full w-full flex-col bg-[#1E293B] text-[#F8FAFC]">
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#334155] px-4">
        <h2 className="text-sm font-semibold">Contact Info</h2>

        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#94A3B8] transition hover:bg-[#334155] hover:text-[#F8FAFC]"
        >
          <X size={19} />
        </button>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Profile */}
        <div className="flex flex-col items-center px-6 py-8 text-center">
          {/* Avatar */}
          <div className="relative">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-[#334155]"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#334155] ring-4 ring-[#334155]">
                <UserRound size={38} className="text-[#94A3B8]" />
              </div>
            )}

            {/* Online indicator */}
            <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-[#1E293B] bg-emerald-400" />
          </div>

          {/* Name */}
          <h1 className="mt-4 text-lg font-semibold text-[#F8FAFC]">
            {user.fullName}
          </h1>

          {/* Status */}
          <div className="mt-1 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="text-xs text-emerald-400">Online</span>
          </div>

          {/* Bio */}
          {user?.bio && (
            <p className="mt-4 max-w-[250px] text-sm leading-relaxed text-[#94A3B8]">
              {user.bio}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-[#334155]" />

        {/* Shared Media */}
        <section className="px-4 py-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Images size={17} className="text-[#94A3B8]" />

              <h3 className="text-sm font-medium text-[#E2E8F0]">
                Shared Media
              </h3>
            </div>

            <span className="text-xs text-[#64748B]">
              {imagesDummyData.length}
            </span>
          </div>

          {/* Images */}
          {imagesDummyData.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {imagesDummyData.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => window.open(img, "_blank")}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-[#0F172A]"
                >
                  <img
                    src={img}
                    alt={`Shared media ${index + 1}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-[#0F172A] px-4 py-8 text-center">
              <Images size={24} className="mx-auto text-[#475569]" />

              <p className="mt-2 text-xs text-[#64748B]">No shared media yet</p>
            </div>
          )}
        </section>
      </div>
    </aside>
  );
};

export default RightSidebar;
