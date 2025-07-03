"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";

export const LogoutButton = () => {
  const router = useRouter();
  return (
    <DropdownMenuItem
    className="cursor-pointer hover:bg-muted/50"
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
              router.refresh();
            },
          },
        });
      }}>
      <LogOutIcon size={16} className="text-red-400" aria-hidden="true" />
      <span className="text-red-400">Logout</span>
    </DropdownMenuItem>
  );
};
