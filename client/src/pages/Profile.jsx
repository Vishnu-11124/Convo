import {
  ArrowLeft,
  Camera,
  LogOut,
  Pencil,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const {
    authUser,
    setToken,
    setAuthUser,
    getUser,
    socket,
    setOnlineUsers,
    backendUrl,
    token,
  } = useContext(AuthContext);

  const [formOpen, setFormOpen] = useState(false);

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [preview, setPreview] = useState(null);

  // Fill the form with the current user's data when it opens
  const openForm = () => {
    setName(authUser?.fullName || "");
    setBio(authUser?.bio || "");
    setImage(null);
    setPreview(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setImage(null);
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const currentName = authUser.fullName?.trim() || "";
      const updatedName = name.trim();

      const currentBio = authUser.bio?.trim() || "";
      const updatedBio = bio.trim();

      if (updatedName && updatedName !== currentName) {
        formData.append("fullName", updatedName);
      }

      if (updatedBio !== currentBio) {
        formData.append("bio", updatedBio);
      }

      if (image) {
        formData.append("profileImage", image);
      }

      if ([...formData.keys()].length === 0) {
        closeForm();
        return;
      }

      const { data } = await axios.patch(
        `${backendUrl}/api/users/profile/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.message === "Profile updated successfully") {
        getUser();
        closeForm();
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setAuthUser(null);
      setToken(null);
      setOnlineUsers([]);
      socket?.disconnect();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    authUser && (
      <div className="flex h-dvh flex-col overflow-hidden bg-neutral-950 px-4 text-neutral-50">
        {/* Top bar */}
        <div className="mx-auto flex w-full max-w-sm items-center py-5">
          <button
            onClick={() => navigate("/")}
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-500"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Profile card */}
        <div className="flex flex-1 items-start justify-center pb-6 sm:items-center">
          <div className="w-full max-w-sm rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
            {/* Avatar + identity */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-neutral-800 ring-1 ring-neutral-700 ring-offset-4 ring-offset-neutral-900">
                {authUser?.profileImage ? (
                  <img
                    src={authUser.profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={40} className="text-neutral-500" />
                )}
              </div>

              <h1 className="mt-6 text-xl font-semibold tracking-tight">
                {authUser.fullName}
              </h1>

              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-neutral-400">
                <Phone size={13} />
                {authUser?.phone}
              </p>
            </div>

            {/* Bio */}
            <p className="mx-auto mt-6 max-w-xs text-center text-sm leading-6 text-neutral-400">
              {authUser?.bio || "No bio yet. Add one to tell people about you."}
            </p>

            {/* Actions */}
            <div className="mt-8 space-y-2">
              <button
                onClick={openForm}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-neutral-50 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
              >
                <Pencil size={15} />
                Edit profile
              </button>

              <button
                onClick={handleLogout}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-500"
              >
                <LogOut size={15} />
                Log out
              </button>
            </div>
          </div>
        </div>

        {/* Edit profile modal */}
        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="max-h-full w-full max-w-sm overflow-y-auto rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
              {/* Header */}
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-semibold">Edit profile</h2>

                <button
                  type="button"
                  onClick={closeForm}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-50"
                >
                  <X size={17} />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                {/* Photo + name */}
                <div className="flex items-end gap-4">
                  <div className="relative shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-neutral-800 ring-1 ring-neutral-700">
                      {preview || authUser?.profileImage ? (
                        <img
                          src={preview || authUser.profileImage}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound size={26} className="text-neutral-500" />
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
                      aria-label="Change photo"
                      className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-neutral-900 bg-neutral-50 text-neutral-950 transition hover:bg-neutral-300"
                    >
                      <Camera size={12} />
                    </label>
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-medium text-neutral-400"
                    >
                      Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your name"
                      required
                      className="h-10 w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-50 outline-none transition placeholder:text-neutral-600 focus:border-neutral-500"
                    />
                  </div>
                </div>

                {/* Phone (read only) */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-medium text-neutral-400"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={authUser.phone}
                    disabled
                    className="h-10 w-full cursor-not-allowed rounded-xl border border-neutral-800 bg-neutral-950/50 px-3 text-sm text-neutral-500 outline-none"
                  />
                </div>

                {/* Bio */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="bio"
                      className="text-xs font-medium text-neutral-400"
                    >
                      Bio
                    </label>
                    <span className="text-xs text-neutral-600">
                      {bio.length}/150
                    </span>
                  </div>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    name="bio"
                    id="bio"
                    rows={3}
                    maxLength={150}
                    placeholder="Write a short bio"
                    className="w-full resize-none rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm leading-5 text-neutral-50 outline-none transition placeholder:text-neutral-600 focus:border-neutral-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="h-10 flex-1 rounded-full border border-neutral-800 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="h-10 flex-1 rounded-full bg-neutral-50 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
