import { AddEntryForm } from "@/components/ui/AddEntryForm";
import { findMemorySecurly } from "./findMemory";
import { EntryCard } from "@/components/ui/EntryCard";
import { Error404 } from "@/components/Errors/Error404";

export default async function MemoryPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const { memory, memoryEntries, isAdmin, adminURL } = await findMemorySecurly(
    id
  );

  if (!memory) {
    return <Error404 />;
  }

  return (
    <div className="flex flex-col">
      <div className="py-5 border-b-neutral border-b-[1px] mb-5">
        <h1 className="text-center text-5xl font-semibold text-secondary py-2 capitalize">
          {memory.title}
        </h1>
        <p className="p-2 pb-2 whitespace-pre">{memory.description}</p>
      </div>
      {isAdmin && (
        <div className="flex flex-col pb-5 border-b-neutral border-b-[1px] mb-5">
          <AddEntryForm memoryId={id} adminURL={adminURL} />
        </div>
      )}
      <div className="flex flex-col space-y-4 w-full">
        {memoryEntries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
