"use client";

import { createMemoryAction } from "@/actions";
import { useRouter } from "next/navigation";
import { useTextInput } from "../useTextInput";

export const CreateMemoryForm = () => {
  const router = useRouter();
  const titleInput = useTextInput("");
  const descriptionInput = useTextInput("");

  const handleCreateMemory = async () => {
    try {
      const { id } = await createMemoryAction({
        title: titleInput.value,
        description: descriptionInput.value,
        timestamp: new Date().toISOString(),
      });
      router.push(`/memories/${id}`);
    } catch (error) {
      alert("Sorry, something went wrong. Please try again.");
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col space-y-4">
      <label className="input input-bordered flex items-center gap-2">
        Title
        <input
          type="text"
          className="grow"
          placeholder="My Euro Trip 2024"
          {...titleInput}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Description
        <input
          type="text"
          className="grow"
          placeholder="..."
          {...descriptionInput}
        />
      </label>

      <button
        type="button"
        onClick={handleCreateMemory}
        className="btn btn-primary"
        disabled={!titleInput.value || !descriptionInput.value}
      >
        Create Memory
      </button>
    </form>
  );
};
