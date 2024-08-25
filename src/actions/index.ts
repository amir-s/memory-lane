"use server";
import { createEntry, createMemory, Entry, getMemory, Memory } from "@/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import RandomString from "randomstring";

const createSecretCookie = (id: number, secret: string) => {
  cookies().set("secret", secret, {
    path: `/memories/${id}`,
  });
};

export const createMemoryAction = async ({
  title,
  description,
  timestamp,
}: Omit<Memory, "id" | "secret">): Promise<{ id: number; secret: string }> => {
  if (!title || !description || !timestamp) {
    throw new Error("Please provide all fields: title, description, timestamp");
  }

  const secret = RandomString.generate(32);

  const id = await createMemory({
    title,
    description,
    timestamp,
    secret,
  });
  createSecretCookie(id, secret);
  return { id, secret };
};

export const addMemoryEntryAction = async (
  entry: Omit<Entry, "id" | "timestamp">
) => {
  const secretCookie = cookies().get("secret");
  if (!secretCookie) {
    throw new Error("Unauthorized");
  }
  const memory = await getMemory(entry.memory_id);
  if (!memory) {
    throw new Error("Memory not found");
  }
  if (memory.secret !== secretCookie.value) {
    throw new Error("Unauthorized");
  }
  await createEntry(entry.memory_id, {
    ...entry,
    timestamp: new Date().toISOString(),
  });
  revalidatePath(`/memories/${entry.memory_id}`);
};

export const getMemoryAction = async (id: number) => {
  const memory = await getMemory(id);
  return memory;
};
