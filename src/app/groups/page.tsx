"use client";

import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import { useRouter } from "next/navigation";

interface Group {
  id: string;
  teamName: string;
  teamShortcut: string;
  squadType: string;
  postControl: string;
  status: string;
}

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchApprovedGroups = () => {
      const groupsRef = collection(db, "groups");
      const approvedQuery = query(groupsRef, where("status", "==", "approved"));

      const unsubscribe = onSnapshot(approvedQuery, (snapshot) => {
        const fetchedGroups: Group[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Group[];
        setGroups(fetchedGroups);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchApprovedGroups();
    return () => unsubscribe();
  }, []);

  const handleJoinGroup = (groupId: string) => {
    // Redirect to the group dashboard
    router.push(`/groups/${groupId}`);
  };

  return (
    <div className="min-h-screen bg-[#0e1116] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Approved Groups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div
              key={group.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{group.teamName}</h2>
              <p className="text-sm text-gray-400">
                Shortcut: {group.teamShortcut}
              </p>
              <p className="text-sm text-gray-400">Type: {group.squadType}</p>
              <p className="text-sm text-gray-400">
                Post Control: {group.postControl}
              </p>
              <button
                onClick={() => handleJoinGroup(group.id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Join Group
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No approved groups available.</p>
        )}
      </div>
    </div>
  );
};

export default GroupsPage;
