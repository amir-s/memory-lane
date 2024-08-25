/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import classNames from "classnames";
import { addMemoryEntryAction } from "@/actions";
import { useCopyToClipboard } from "usehooks-ts";
import { useTextInput } from "../useTextInput";
import { useImageDropZone } from "../useImageDropZone";
import { ImageDropZone } from "./ImageDropZone";

const SHOW_SUCCESS_TIMEOUT = 3000;

export const AddEntryForm = ({
  memoryId,
  adminURL,
}: {
  memoryId: number;
  adminURL: string;
}) => {
  const titleInput = useTextInput("");
  const descriptionInput = useTextInput("");
  const { dragActive, image, resetImage, dragEvents } = useImageDropZone();
  const [lockForm, setLockForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, copy] = useCopyToClipboard();

  const handleFormSubmit = async function (
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLockForm(true);

    await addMemoryEntryAction({
      memory_id: memoryId,
      title: titleInput.value,
      description: descriptionInput.value,
      image: image || "",
    });

    setShowSuccess(true);
    setTimeout(() => {
      setLockForm(false);
      setShowSuccess(false);
      resetImage();
      descriptionInput.onChange({ target: { value: "" } } as any);
      titleInput.onChange({ target: { value: "" } } as any);
    }, SHOW_SUCCESS_TIMEOUT);
  };

  const handleCopyAdminURL = function () {
    copy(adminURL);
  };

  return (
    <div
      className={classNames(
        "card card-compact bg-base-300 shadow-xl border-[2px] border-base-300",
        showSuccess && "border-success"
      )}
    >
      <ImageDropZone
        dragEvents={dragEvents}
        dragActive={dragActive}
        image={image}
      />

      <div className="card-body">
        <form className="flex flex-col space-y-4" onSubmit={handleFormSubmit}>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="py-1 w-24">Title</div>
            <input
              type="text"
              className="grow input input-bordered"
              placeholder="..."
              disabled={lockForm}
              {...titleInput}
            />
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="py-1 w-24">Description</div>
            <textarea
              className="grow input input-bordered h-28"
              placeholder="..."
              disabled={lockForm}
              {...descriptionInput}
            />
          </div>
          <div className="card-actions justify-between">
            <button
              type="button"
              className="btn btn-secondary btn-link"
              onClick={handleCopyAdminURL}
            >
              <div>{copied && "👍"}</div> Copy Admin URL
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-block lg:w-auto"
              disabled={
                lockForm || !titleInput.value || !descriptionInput.value
              }
            >
              Add Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
