"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/services/firebase";

interface Group {
  id: string;
  teamName: string;
  teamShortcut: string;
  squadType: string;
  postControl: string;
  status?: string;
}

const AddUser: React.FC = () => {
  const [pendingGroups, setPendingGroups] = useState<Group[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "groups"),
      (snapshot) => {
        const groups = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
            } as Group;
          })
          .filter((group) => group.status === "pending"); // Filter by 'pending' status
          
        console.log(groups); // Log to ensure groups are being fetched
        setPendingGroups(groups);
      },
      (error) => {
        console.error("Error fetching groups:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await updateDoc(doc(db, "groups", id), {
        status: "approved",
      });
      alert("Group approved successfully!");
    } catch (error) {
      console.error("Error approving group:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateDoc(doc(db, "groups", id), {
        status: "rejected",
      });
      alert("Group rejected successfully!");
    } catch (error) {
      console.error("Error rejecting group:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingGroups.map((groups) => (
          <div key={groups.id} className="bg-white p-4 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold">{groups.teamName}</h2>
            <p className="text-sm text-gray-600">Shortcut: {groups.teamShortcut}</p>
            <p className="text-sm text-gray-600">Squad Type: {groups.squadType}</p>
            <p className="text-sm text-gray-600">Post Control: {groups.postControl}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleApprove(groups.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(groups.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddUser;
