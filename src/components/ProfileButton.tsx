"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useProfile from "@/hooks/useProfile";
import { User } from "lucide-react";



const ProfileButton: React.FC = () => {
  const { profile, loading } = useProfile();
  const router = useRouter();

  const handleClickOnProfilePage = () => {
    router.push("/profile");
  };


  return (
    <button
      className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
      onClick={handleClickOnProfilePage}
    >
      {profile?.profilePicture ? (
        <img
          src={profile.profilePicture}
          alt="Profile"
          className="w-[35px] h-[35px] rounded-full"
        />
      ) : (
        <User className="w-5 h-5 text-blue-500" />
      )}
    </button>
  );
};

export default ProfileButton;
