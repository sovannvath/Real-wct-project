"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import Technology from "@/app/data/data";

type FormDataType = {
  title: string;
  description: string;
  url: string;
  file: File | null;
  techList: string[];
};

const AdminPostForm: React.FC = () => {
  const [techList, setTechList] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    url: "",
    file: null,
    techList: [],
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "failure" | null
  >(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (
      name === "file" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus(null); // Reset status on new submission

    try {
      let imageUrl: string | null = null;
      if (formData.file) {
        imageUrl = await uploadToImageKit(formData.file);
      }

      // Save admin post in the unified `allPosts` collection
      await setDoc(doc(db, "allPosts", Date.now().toString()), {
        title: formData.title,
        description: formData.description,
        url: formData.url,
        techList: formData.techList,
        imageUrl: imageUrl || "",
        timestamp: new Date(),
        source: "admin", // Mark this as an admin post
      });

      setSubmissionStatus("success"); // Indicate success
      console.log("Admin post successfully created!");

      // Reset the form state
      setFormData({
        title: "",
        description: "",
        url: "",
        file: null,
        techList: [],
      });
      setTechList([]);
    } catch (error) {
      setSubmissionStatus("failure");
      console.error("Error submitting form:", error);
    }
  };

  const uploadToImageKit = async (file: File): Promise<string> => {
    const privateKey = process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_API_KEY;

    if (!privateKey) {
      throw new Error(
        "ImageKit Private API Key is missing. Check your .env file."
      );
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

      if (response.data && response.data.url) {
        return response.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Error uploading to ImageKit:",
        axiosError.response?.data || axiosError.message
      );
      throw error;
    }
  };

  const onTechSelect = (name: string, isChecked: boolean) => {
    if (isChecked) {
      setTechList((prevTechList) => [...prevTechList, name]);
    } else {
      setTechList((prevTechList) =>
        prevTechList.filter((item) => item !== name)
      );
    }
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      techList,
    }));
  }, [techList]);

  return (
    <div className="bg-[#1e1e2f] p-8 rounded-lg shadow-lg border border-[#2a2a3f]">
      <h2 className="text-3xl font-bold text-[#4ade80] mb-6">
        Create Admin Post
      </h2>
      {submissionStatus === "success" && (
        <div className="mb-4 p-4 text-green-500 bg-green-100 border border-green-500 rounded">
          Your submission was successful!
        </div>
      )}
      {submissionStatus === "failure" && (
        <div className="mb-4 p-4 text-red-500 bg-red-100 border border-red-500 rounded">
          There was an error submitting your post. Please try again.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            className="block text-gray-300 font-semibold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-3 bg-[#2a2a3f] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#4ade80]"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-300 font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-3 bg-[#2a2a3f] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#4ade80]"
            placeholder="Write description here"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-300 font-semibold mb-2"
            htmlFor="url"
          >
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-3 bg-[#2a2a3f] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#4ade80]"
            placeholder="Enter URL"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 font-semibold mb-2">
            Select Technologies
          </label>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {Technology.map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  id={`tech-${item.id}`}
                  type="checkbox"
                  onChange={(e) => onTechSelect(item.name, e.target.checked)}
                  className="h-5 w-5 text-[#4ade80] bg-[#2a2a3f] border-gray-700 rounded focus:ring-[#4ade80]"
                />
                <label
                  htmlFor={`tech-${item.id}`}
                  className="ml-2 text-gray-300"
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-300 font-semibold mb-2"
            htmlFor="file"
          >
            Upload File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-lg p-3 bg-[#2a2a3f] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#4ade80]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#4ade80] text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-[#3ac771] transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminPostForm;
