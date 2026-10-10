import { Camera, LogOut, UserRound, X, Phone, Pencil } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const {authUser, token, backendUrl} = useContext(AuthContext)

  const [formOpen, setFormOpen] = useState(false);

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [preview, setPreview] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    // Update profile API will come here
    console.log({
      image,
      name,
      bio,
    });

    setFormOpen(false);
  };

  const handleLogout = () => {

  }

  return (
    <div className="min-h-screen bg-[#0F172A] px-4 py-6 text-[#F8FAFC] sm:px-6">
      {/* Header */}
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between border-b border-[#334155] pb-4">
        <div>
          <h1 className="text-lg font-semibold">Profile</h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Manage your personal information
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#94A3B8] transition hover:bg-[#1E293B] hover:text-[#F8FAFC]"
        >
          <X size={19} />
        </button>
      </div>

      {/* Profile Card */}
      <div className="mx-auto mt-6 w-full max-w-2xl">
        <div className="rounded-2xl border border-[#334155] bg-[#1E293B] p-6 sm:p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-[#334155] bg-[#0F172A]">
                {authUser?.profileImage ? (
                  <img
                    src={authUser?.profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={48} className="text-[#64748B]" />
                )}
              </div>
            </div>

            <h2 className="mt-4 text-xl font-semibold">{name}</h2>

            <div className="mt-2 flex items-center gap-2 text-sm text-[#94A3B8]">
              <Phone size={15} />
              <span>{authUser?.phone}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8 border-t border-[#334155] pt-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#64748B]">
              About
            </p>

            <p className="text-sm leading-6 text-[#CBD5E1]">
              {authUser?.bio || "No bio added yet."}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setFormOpen(true)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6366F1] px-4 text-sm font-semibold text-white transition hover:bg-[#5558E8] sm:flex-1"
            >
              <Pencil size={16} />
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#334155] px-4 text-sm font-medium text-[#F87171] transition hover:bg-[#0F172A] sm:flex-1"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[#334155] bg-[#1E293B] shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#334155] px-5 py-4">
              <div>
                <h2 className="text-base font-semibold">Edit Profile</h2>

                <p className="mt-0.5 text-xs text-[#64748B]">
                  Update your profile information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-[#0F172A] hover:text-[#F8FAFC]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-5 p-5">
              {/* Profile Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#334155] bg-[#0F172A]">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={38} className="text-[#64748B]" />
                    )}
                  </div>

                  <input
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg, image/webp"
                    hidden
                    onChange={handleImageChange}
                  />

                  <label
                    htmlFor="image"
                    className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-[#1E293B] bg-[#6366F1] text-white transition hover:bg-[#5558E8]"
                  >
                    <Camera size={15} />
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#CBD5E1]"
                >
                  Name
                </label>

                <input
                  value={authUser.fullName || name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  required
                  className="h-11 w-full rounded-xl border border-[#334155] bg-[#0F172A] px-4 text-sm text-[#F8FAFC] outline-none transition placeholder:text-[#475569] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10"
                />
              </div>

              {/* Phone - Read Only */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[#CBD5E1]"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />

                  <input
                    type="tel"
                    id="phone"
                    value={authUser.phone}
                    disabled
                    className="h-11 w-full cursor-not-allowed rounded-xl border border-[#334155] bg-[#0F172A]/60 pl-11 pr-4 text-sm text-[#64748B] outline-none"
                  />
                </div>

                <p className="mt-1.5 text-xs text-[#475569]">
                  Phone number cannot be changed.
                </p>
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="mb-2 block text-sm font-medium text-[#CBD5E1]"
                >
                  Bio
                </label>

                <textarea
                  value={authUser?.bio || bio}
                  onChange={(e) => setBio(e.target.value)}
                  name="bio"
                  id="bio"
                  rows={4}
                  maxLength={150}
                  placeholder="Tell something about yourself..."
                  className="w-full resize-none rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm leading-5 text-[#F8FAFC] outline-none transition placeholder:text-[#475569] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10"
                />

                <p className="mt-1 text-right text-xs text-[#475569]">
                  {bio.length}/150
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="h-11 flex-1 rounded-xl border border-[#334155] text-sm font-medium text-[#CBD5E1] transition hover:bg-[#0F172A]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-11 flex-1 rounded-xl bg-[#6366F1] text-sm font-semibold text-white transition hover:bg-[#5558E8]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
