import { getMemoryAction } from "@/actions";
import { getMemoryEntries } from "@/db";
import { cookies, headers } from "next/headers";

const PLACEHOLDER_MEMORY = {
  memory: undefined,
  memoryEntries: [],
  isAdmin: false,
  adminURL: "",
};

export const findMemorySecurly = async (id: number) => {
  const memory = await getMemoryAction(id);

  if (!memory) {
    return PLACEHOLDER_MEMORY;
  }

  const memoryEntries = await getMemoryEntries(id);
  const secretCookie = cookies().get("secret");

  let isAdmin = false;
  let adminURL = "";
  if (secretCookie && secretCookie.value === memory.secret) {
    isAdmin = true;
    adminURL = `${headers().get("host")}/memories/${id}/auth?secret=${
      memory.secret
    }`;
  } else {
    memory.secret = "";
  }

  return { memory, memoryEntries, isAdmin, adminURL };
};
