"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "@/app/services/firebase";
import { User } from "@/app/types/User";
import {
  disableUserInFirestore,
  enableUserInFirestore,
  removeUserFromFirestore,
} from "@/app/utils/firebaseUtils";

const ManagePost = () => {
  const [users, setUsers] = useState<User[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "user"), (snapshot) => {
      const userList: User[] = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          // Validate required fields to match the User interface
          if (
            data.email &&
            data.role &&
            data.uid !== undefined &&
            data.disabled !== undefined
          ) {
            return {
              id: doc.id,
              email: data.email,
              role: data.role,
              uid: data.uid,
              disabled: data.disabled,
            } as User;
          } else {
            console.error(`Document with ID ${doc.id} is missing required fields.`);
            return null; // Skip invalid documents
          }
        })
        .filter((user): user is User => user !== null); // Remove null results
      setUsers(userList);
    });

    return () => unsubscribe();
  }, [db]);

  const handleDisableUser = async (uid: string) => {
    try {
      await disableUserInFirestore(uid);
      console.log(`User with UID: ${uid} has been disabled in Firestore.`);
    } catch (error) {
      console.error("Error disabling user:", error);
    }
  };

  const handleEnableUser = async (uid: string) => {
    try {
      await enableUserInFirestore(uid);
      console.log(`User with UID: ${uid} has been enabled in Firestore.`);
    } catch (error) {
      console.error("Error enabling user:", error);
    }
  };

  const handleRemoveUser = async (uid: string) => {
    try {
      await removeUserFromFirestore(uid);
      console.log(`User with UID: ${uid} has been removed from Firestore.`);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-6 border border-gray-300">
          <h2 className="text-xl font-semibold mb-4">User Log in List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="border-b py-4">
                <p className="text-gray-700">Email: {user.email}</p>
                <p className="text-gray-600">Role: {user.role}</p>
                <p className="text-gray-600">UID: {user.uid}</p>
                <p className="text-gray-600">
                  Status: {user.disabled ? "Disabled" : "Active"}
                </p>
                <div className="flex space-x-4 mt-2">
                  {user.disabled ? (
                    <button
                      onClick={() => handleEnableUser(user.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition"
                    >
                      Enable
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDisableUser(user.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded shadow-md hover:bg-yellow-600 transition"
                    >
                      Disable
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagePost;
