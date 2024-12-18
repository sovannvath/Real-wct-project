import React, { useState, useEffect } from "react";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/services/firebase";

type FormDataType = {
  title: string;
  description: string;
  url: string;
  file: File | null;
  techList?: string[];
};

const AddProjectForm: React.FC = () => {
  const [techList, setTechList] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    url: "",
    file: null,
    techList: [],
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(false); // Success banner visibility
  const [error, setError] = useState<string | null>(null); // Error banner visibility

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      let imageUrl = null;

      if (formData.file) {
        imageUrl = await uploadToImageKit(formData.file);
      }

      // Add document to Firestore with automatic ID generation
      const postRef = await addDoc(collection(db, "addPostByUser"), {
        title: formData.title,
        description: formData.description,
        url: formData.url,
        techList: formData.techList,
        imageUrl: imageUrl || "", // Empty string if image upload fails
        timestamp: serverTimestamp(), // Firestore server-side timestamp
      });

      console.log("Document written with ID:", postRef.id);

      setLoading(false);
      setSuccess(true);

      // Reset form state
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
      setError("Failed to submit the project. Please try again.");
      setLoading(false);
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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Project</h2>

      {/* Success Banner */}
      {success && (
        <div className="flex flex-col items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 transition-transform duration-500">
          <div className="w-16 h-16 mb-2 animate-bounce">
            <img
              src="https://img.icons8.com/color/96/000000/checkmark.png"
              alt="Success"
            />
          </div>
          <p className="font-bold text-lg">Submitted Successfully</p>
          <p className="text-sm">Your project has been added successfully!</p>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 transition-transform duration-500">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Upload File</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProjectForm;
