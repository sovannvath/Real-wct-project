import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/services/firebase"; 
import React, { useState, useEffect } from "react";

interface Group {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
}

const GroupsList = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
      const groupData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Group[];
      setGroups(groupData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Groups</h1>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
            <p>{group.isPublic ? "Public" : "Private"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;
