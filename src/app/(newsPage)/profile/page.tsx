"use client";

import React, { useState } from "react";
import useProfile from "@/hooks/useProfile";

const ProfilePage = () => {
  const { profile, setProfile, loading, updateProfile, user } = useProfile();
  const [isEditing, setIsEditing] = useState(false); 
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      await updateProfile(profile);
      alert("Profile updated!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center px-4">
      
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg mt-8">

        {/* Profile Information Section */}
        <div className="p-6 text-center">
          <div className="relative -top-12 mx-auto w-24 h-24 bg-gray-600 rounded-full border-4 border-gray-800 overflow-hidden">
            <img
              src={profile.profilePicture || "/default-avatar.png"}
              alt="userProfile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold">{profile.name || user?.email}</h1>
          <p className="text-gray-400">@Nick name *Join {new Date().toLocaleDateString()}</p>
          <div className="mt-2 text-sm">
            <p>168K Followers · 0 Following</p>
            <p>10.25 Reputation · 100K Views · 10 Upvotes</p>
          </div>
          <p className="mt-4 text-gray-300">
            {profile.bio || (
              <span className="italic">"Add a bio to tell the world more about you."</span>
            )}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-6 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition"
          >
            Edit your profile
          </button>
        </div>
      </div>

      {/* Edit Profile Section */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="w-full max-w-lg bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Edit Profile</h2>
            <div className="mb-4">
              <label className="block font-medium text-white">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700 text-white"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-white">Bio</label>
              <textarea
                className="w-full p-2 border rounded bg-gray-700 text-white"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-white">Profile Picture URL</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700 text-white"
                placeholder="Profile picture URL"
                value={profile.profilePicture}
                onChange={(e) =>
                  setProfile({ ...profile, profilePicture: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4">
              <button
                className="px-6 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </button>
              <button
                className="px-6 py-2 bg-gray-500 rounded text-white hover:bg-gray-600 transition"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
