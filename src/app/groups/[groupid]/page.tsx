"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import GroupPostForm from "@/components/GroupPostForm";
import ContentHeader from "@/components/contentHeader";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  createdAt: any;
}

const GroupDashboard = () => {
  const params = useParams();
  const groupId = Array.isArray(params.groupid) ? params.groupid[0] : params.groupid;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const generateToken = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  };

  const handleManageGroup = async () => {
    setLoading(true);

    try {
      // Fetch or create the invite link
      const groupRef = doc(db, "groups", groupId);
      const groupDoc = await getDoc(groupRef);

      if (groupDoc.exists()) {
        const groupData = groupDoc.data();
        if (groupData?.inviteLink) {
          // Use existing invite link
          setInviteLink(groupData.inviteLink);
        } else {
          // Generate new invite link and save it
          const newInviteLink = generateToken();
          await updateDoc(groupRef, { inviteLink: newInviteLink });
          setInviteLink(newInviteLink);
        }

        // Copy the link to the clipboard
        const link = `${window.location.origin}/join/${groupId}?invite=${inviteLink}`;
        navigator.clipboard.writeText(link);
        alert("Invite link copied to clipboard!");
      } else {
        alert("Group does not exist.");
      }
    } catch (error) {
      console.error("Error managing group:", error);
      alert("Failed to generate invite link.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!groupId) return;

    const postsRef = collection(db, "groups", groupId, "posts");
    const unsubscribe = onSnapshot(postsRef, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, [groupId]);

  return (
    <>
      <ContentHeader />
      <div className="min-h-screen bg-[white] text-black py-10 px-6">
        {/* Group Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Group Dashboard</h1>
          <button
            onClick={handleManageGroup}
            className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition text-white shadow-md"
          >
            {loading ? "Loading..." : "Copy Link"}
          </button>
        </div>

        {/* Add Post Form */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-4">Create a Post</h2>
          <GroupPostForm groupId={groupId} />
        </div>

        {/* Group Posts */}
        <h2 className="text-3xl font-semibold mb-6">Group Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col text-white"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold truncate">{post.title}</h3>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                    {post.content}
                  </p>
                  <p className="text-gray-500 text-xs mt-4">
                    {post.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
                <div className="p-4 border-t border-gray-700 flex justify-between items-center">
                  <button className="text-blue-400 hover:underline text-sm">
                    Edit
                  </button>
                  <button className="text-red-400 hover:underline text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No posts in this group yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupDashboard;
