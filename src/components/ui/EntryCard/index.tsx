/* eslint-disable @next/next/no-img-element */
import ago from "s-ago";
import { Entry } from "@/db";

export const EntryCard = ({ entry }: { entry: Entry }) => {
  const entryDate = new Date(entry.timestamp);
  return (
    <div
      key={entry.id}
      className="card card-compact lg:card-side bg-base-300 shadow-xl "
    >
      {entry.image && (
        <figure className="lg:max-w-96">
          <img src={entry.image} alt={entry.title} />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{entry.title}</h2>
        <p className="whitespace-pre">{entry.description}</p>
        <div className="flex justify-end">
          <div
            className="tooltip tooltip-left"
            data-tip={`${entryDate.toDateString()} ${entryDate.toLocaleTimeString()}`}
          >
            {ago(entryDate)}
          </div>
        </div>
      </div>
    </div>
  );
};
