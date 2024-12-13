import React, { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "/home/vath/wct-togethertechs/src/app/services/firebase"; // Adjust the path as needed
import TechnologyData from "/home/vath/wct-togethertechs/src/app/Data/page";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(formData); 

      await setDoc(doc(db, "projects", Date.now().toString()), {
        title: formData.title,
        description: formData.description,
        url: formData.url,
        techList: formData.techList,
        fileName: formData.file ? formData.file.name : null, // Store file name
        timestamp: new Date(), // Optional timestamp
      });

      console.log("Document successfully written!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        url: "",
        file: null,
        techList: [],
      });
      setTechList([]);
    } catch (error) {
      console.error("Error writing document:", error);
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
    <div>
      <h2 className="text-xl font-bold mb-4">Add Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write description here"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="url">
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter URL"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select Technologies
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {TechnologyData.Technology.map((item) => (
              <div key={item.id} className="flex gap-2 items-center">
                <input
                  id={`tech-${item.id}`}
                  type="checkbox"
                  onChange={(e) => onTechSelect(item.name, e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor={`tech-${item.id}`} className="text-sm">
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="file">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#111827] text-white font-bold py-2 px-4 rounded-md hover:bg-white hover:text-black transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProjectForm;
