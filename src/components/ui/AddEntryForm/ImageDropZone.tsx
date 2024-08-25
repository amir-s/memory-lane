/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import { useImageDropZone } from "../useImageDropZone";

export const ImageDropZone = ({
  dragActive,
  image,
  dragEvents,
}: {
  dragActive: boolean;
  image: string | null;
  dragEvents: ReturnType<typeof useImageDropZone>["dragEvents"];
}) => {
  return (
    <figure
      className={classNames(
        "bg-base-200 text-primary",
        dragActive || image ? "opacity-100" : "opacity-80",
        !image && "h-24"
      )}
      {...dragEvents}
    >
      {image ? (
        <img src={`${image}`} alt="entry image" />
      ) : (
        <h3 className="text-xl">Drag &amp; Drop An Image!</h3>
      )}
    </figure>
  );
};
