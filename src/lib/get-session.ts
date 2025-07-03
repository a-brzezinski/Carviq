import "server-only";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return session;
};
