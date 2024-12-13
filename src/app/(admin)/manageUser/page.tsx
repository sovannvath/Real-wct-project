"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "@/app/services/firebase";

const ManagePost = () => {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const db = getFirestore(app); 

  useEffect(() => {
    // Real-time listener for Firestore collection
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [db]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Manage Posts</h1>
        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold mb-2">User List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="border-b py-2">
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>UID: {user.uid}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagePost;
