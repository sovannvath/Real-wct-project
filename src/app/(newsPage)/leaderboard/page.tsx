"use client";

import React from "react";

const leaderboardData = {
  highestHonorableGuys: [
    { rank: 1, player: "Ny SreyNit", points: 175, icon: "🏆" },
    { rank: 2, player: "Try voukie", points: 174, icon: "🥈" },
    { rank: 3, player: "Bo sreylin", points: 163, icon: "🥉" },
    { rank: 4, player: "......Vath", points: 154 },
    { rank: 5, player: "Ny SreyNit", points: 123 },
    { rank: 6, player: "Ny SreyNit", points: 122 },
    { rank: 7, player: "Ny SreyNit", points: 120 },
    { rank: 8, player: "Ny SreyNit", points: 111 },
    { rank: 9, player: "Ny SreyNit", points: 101 },
    { rank: 10, player: "Ny SreyNit", points: 99 },
  ],
  unbrokenChainGuys: [
    { rank: 1, player: "Ny SreyNit", points: 175, icon: "🏆" },
    { rank: 2, player: "Try voukie", points: 174, icon: "🥈" },
    { rank: 3, player: "Bo sreylin", points: 163, icon: "🥉" },
    { rank: 4, player: "......Vath", points: 154 },
    { rank: 5, player: "Ny SreyNit", points: 123 },
    { rank: 6, player: "Ny SreyNit", points: 122 },
    { rank: 7, player: "Ny SreyNit", points: 120 },
    { rank: 8, player: "Ny SreyNit", points: 111 },
    { rank: 9, player: "Ny SreyNit", points: 101 },
    { rank: 10, player: "Ny SreyNit", points: 99 },
  ],
};

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-[#0C0F1C] text-white p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">🏆 Leaderboards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Highest Honorable Guys */}
        <LeaderboardCard
          title="Highest honorable guys"
          subtitle="Honor gets from upvotes from comment and article"
          data={leaderboardData.highestHonorableGuys}
        />

        {/* Unbroken Chain Guys */}
        <LeaderboardCard
          title="Unbroken chain guys"
          subtitle="Gets from active on feeds everyday and earn multiple streaks"
          data={leaderboardData.unbrokenChainGuys}
        />
      </div>
    </div>
  );
};

// Leaderboard Card Component
const LeaderboardCard = ({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: { rank: number; player: string; points: number; icon?: string }[];
}) => (
  <div className="bg-[#141414] rounded-lg shadow-lg p-4 md:p-6 border border-[#222]">
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p className="text-sm text-gray-400 mb-4">{subtitle}</p>

    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="border-b-2 pb-2">Ranking</th>
          <th className="border-b-2 pb-2">Player</th>
          <th className="border-b-2 pb-2 text-right">Honorable point</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.rank} className="hover:bg-[#1F2937] transition">
            <td className="py-2">{item.icon || item.rank}</td>
            <td className="py-2">{item.player}</td>
            <td className="py-2 text-right">{item.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="text-right mt-4">
      <button className="text-sm font-medium text-blue-400 hover:underline">
        View more ➡️
      </button>
    </div>
  </div>
);

export default LeaderboardPage;
