import React, { useState } from "react";
import { createGroup } from "@/app/services/groupservice";

const CreateGroupForm: React.FC<{ userId: string }> = ({ userId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description) {
      alert("Please fill out all fields.");
      return;
    }

    await createGroup({
      name,
      description,
      isPublic,
      createdBy: userId,
    });

    setName("");
    setDescription("");
    setIsPublic(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Group Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Public Group</label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
      </div>
      <button type="submit">Create Group</button>
    </form>
  );
};

export default CreateGroupForm;
