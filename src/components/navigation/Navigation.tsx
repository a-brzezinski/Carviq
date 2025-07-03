import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/get-session";

import { UserButton } from "./UserButton";

export const Navigation = async () => {
  const session = await getSession();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white p-4 shadow-md">
      <div className="container mx-auto flex w-full items-center justify-between">
        <div className="flex items-center text-2xl font-bold">
          <Image src="/logo.svg" width={50} alt="Logo" height={50} />
          <Link href="/">Carvig</Link>
        </div>
        <nav className="flex items-center space-x-4">
          {!session ? (
            <>
              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/sign-up">Sign Up</Link>
              </Button>{" "}
            </>
          ) : (
            <UserButton />
          )}
        </nav>
      </div>
    </header>
  );
};
