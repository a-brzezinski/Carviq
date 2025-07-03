import { redirect } from "next/navigation";

import { getSession } from "@/lib/get-session";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <div className="flex min-h-screen items-center justify-center">{children}</div>;
}
