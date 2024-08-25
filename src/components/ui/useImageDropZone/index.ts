import { useCallback, useState } from "react";

export const useImageDropZone = () => {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleDrag = useCallback(function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = function (e: ProgressEvent<FileReader>) {
        setImage(e.target?.result?.toString() || null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const resetImage = useCallback(() => setImage(null), []);

  return {
    dragActive,
    image,
    resetImage,
    dragEvents: {
      onDrop: handleDrop,
      onDragEnter: handleDrag,
      onDragOver: handleDrag,
      onDragLeave: handleDrag,
    },
  };
};
