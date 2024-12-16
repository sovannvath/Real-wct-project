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
  techList?: string[];
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const uploadToImageKit = async (file: File) => {
    const privateKey = process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_API_KEY;

    if (!privateKey) {
      throw new Error("ImageKit Private API Key is missing. Check your .env file.");
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
      console.error("Error uploading to ImageKit:", axiosError.response?.data || axiosError.message);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = null;

      if (formData.file) {
        imageUrl = await uploadToImageKit(formData.file);
      }

      await setDoc(doc(db, "adminPosts", Date.now().toString()), {
        title: formData.title,
        description: formData.description,
        url: formData.url,
        techList: formData.techList,
        imageUrl: imageUrl,
        timestamp: new Date(),
      });

      console.log("Admin post successfully created!");

      setFormData({
        title: "",
        description: "",
        url: "",
        file: null,
        techList: [],
      });
      setTechList([]);
    } catch (error) {
      console.error("Error submitting form:", error);
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
    <div className="bg-[#141414] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#105b69] mb-4">Create Admin Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-[#105b69] rounded-md p-2 bg-[#141414] text-white focus:outline-none focus:ring-2 focus:ring-[#105b69]"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-[#105b69] rounded-md p-2 bg-[#141414] text-white focus:outline-none focus:ring-2 focus:ring-[#105b69]"
            placeholder="Write description here"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2" htmlFor="url">
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full border border-[#105b69] rounded-md p-2 bg-[#141414] text-white focus:outline-none focus:ring-2 focus:ring-[#105b69]"
            placeholder="Enter URL"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">
            Select Technologies
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {Technology.map((item) => (
              <div key={item.id} className="flex gap-2 items-center">
                <input
                  id={`tech-${item.id}`}
                  type="checkbox"
                  onChange={(e) => onTechSelect(item.name, e.target.checked)}
                  className="w-4 h-4 text-[#105b69] bg-[#141414] border-[#105b69] focus:ring-[#105b69]"
                />
                <label htmlFor={`tech-${item.id}`} className="text-white text-sm">
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2" htmlFor="file">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="w-full border border-[#105b69] rounded-md p-2 bg-[#141414] text-white focus:outline-none focus:ring-2 focus:ring-[#105b69]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#105b69] text-white font-bold py-2 px-4 rounded-md hover:bg-white hover:text-[#105b69] transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminPostForm;
