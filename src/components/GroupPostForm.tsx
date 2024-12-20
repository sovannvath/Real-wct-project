"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/services/firebase";

interface GroupPostFormProps {
  groupId: string; // Pass the group ID as a prop
}

const GroupPostForm: React.FC<GroupPostFormProps> = ({ groupId }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    file: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Get the authenticated user ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
    });

    return () => unsubscribe();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "file" && e.target instanceof HTMLInputElement && e.target.files) {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Upload file to ImageKit
  const uploadToImageKit = async (file: File): Promise<string> => {
    const privateKey = process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_API_KEY;

    if (!privateKey) {
      throw new Error("ImageKit Private API Key is missing.");
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", file);
    formDataToUpload.append("fileName", file.name);

    try {
      const response = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formDataToUpload,
        {
          headers: {
            Authorization: `Basic ${btoa(privateKey + ":")}`,
          },
        }
      );

      if (response.data?.url) return response.data.url;
      throw new Error("Image upload failed");
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      if (!userId) throw new Error("User not authenticated.");

      let imageUrl = "";
      if (formData.file) {
        imageUrl = await uploadToImageKit(formData.file);
      }

      // Add the post to the group's `posts` subcollection
      await addDoc(collection(db, "groups", groupId, "posts"), {
        title: formData.title,
        description: formData.description,
        url: formData.url,
        imageUrl,
        authorId: userId,
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      setSuccess(true);

      // Reset form state
      setFormData({
        title: "",
        description: "",
        url: "",
        file: null,
      });
    } catch (error) {
      console.error("Error submitting post:", error);
      setError("Failed to submit the post. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-white mb-4">Create a Group Post</h2>

      {/* Success Banner */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
          <p>Post created successfully!</p>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-white mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="url" className="block text-white mb-2">
            URL (Optional)
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-white mb-2">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-white  hover:text-black transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default GroupPostForm;
