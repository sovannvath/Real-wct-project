"use client";
import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import { useRouter } from "next/navigation";

const CreateTeamPage = () => {
  const [teamName, setTeamName] = useState("");
  const [teamShortcut, setTeamShortcut] = useState("");
  const [squadType, setSquadType] = useState("");
  const [postControl, setPostControl] = useState("");
  const [adminApproval, setAdminApproval] = useState("");
  const [inviteControl, setInviteControl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      
      await addDoc(collection(db, "groups"), {
        teamName,
        teamShortcut,
        squadType,
        postControl,
        adminApproval,
        inviteControl,
        status: "pending", // Status is set to "pending"
        createdAt: Timestamp.now(),
      });
      alert("Team successfully created!");
      setTeamName("");
      setTeamShortcut("");
      setSquadType("");
      setPostControl("");
      setAdminApproval("");
      setInviteControl("");
      router.push("/feed");
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Failed to create the team. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0C0F1C] min-h-screen py-10">
      <h1 className="text-center text-4xl font-bold text-white mb-8">Create Team</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="teamName" className="text-white text-lg font-medium mb-[5px]">
              Enter your team name:
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              className="w-full p-3 rounded-xl border bg-[#17404a] text-white focus:outline-none"
              placeholder="Your team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="teamShortcut" className="text-white text-lg font-medium">
              Enter your team shortcut's name:
            </label>
            <input
              type="text"
              id="teamShortcut"
              name="teamShortcut"
              className="w-full p-3 rounded-xl border bg-[#17404a] text-white focus:outline-none"
              placeholder="Your team shortcut's Name"
              value={teamShortcut}
              onChange={(e) => setTeamShortcut(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h2 className="text-center text-2xl font-bold text-white mb-4">Squad Type</h2>
          <select
            id="squadType"
            className="w-full p-3 rounded-xl border bg-[#17404a] text-white focus:outline-none"
            value={squadType}
            onChange={(e) => setSquadType(e.target.value)}
          >
            <option value="">Choose a Squad Type</option>
            <option value="Public">Public Squad</option>
            <option value="Private">Private Squad</option>
          </select>
        </div>

        <div>
          <h2 className="text-center text-2xl font-bold text-white mb-4">Moderate Setting</h2>
          <label htmlFor="postControl" className="text-white text-lg font-medium">
            Post Control:
          </label>
          <select
            id="postControl"
            className="w-full p-3 rounded-xl border bg-[#17404a] text-white focus:outline-none"
            value={postControl}
            onChange={(e) => setPostControl(e.target.value)}
          >
            <option value="">All members are allowed</option>
            <option value="AdminOnly">Only admin is allowed to post</option>
          </select>
        </div>

        <div>
          <h2 className="text-center text-2xl font-bold text-white mb-4">Admin Control</h2>
          <label htmlFor="adminApproval" className="text-white text-lg font-medium">
            Require Admin Approval:
          </label>
          <select
            id="adminApproval"
            className="w-full p-3 rounded-xl border bg-[#17404a] text-white focus:outline-none"
            value={adminApproval}
            onChange={(e) => setAdminApproval(e.target.value)}
          >
            <option value="">Turn On</option>
            <option value="Off">Turn Off</option>
          </select>
        </div>

        <div>
          <label htmlFor="inviteControl" className="text-white text-lg font-medium">
            Invitation Control:
          </label>
          <select
            id="inviteControl"
            className="w-full p-3 rounded-xl border bg-[#17404a] text-white focus:outline-none"
            value={inviteControl}
            onChange={(e) => setInviteControl(e.target.value)}
          >
            <option value="">Turn On</option>
            <option value="Off">Turn Off</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-sm bg-[#17404a] text-white text-lg font-bold py-3 rounded-xl hover:bg-[#111827] transition"
          >
            {loading ? "Creating Team..." : "Create Team"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamPage;
