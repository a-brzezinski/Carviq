import { BadgePlus, Car, Menu } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/get-session";

import { LogoutButton } from "./LogoutButton";

export const UserButton = async () => {
  const session = await getSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Menu size={26} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">{session?.user.name}</span>
          <span className="truncate text-xs font-normal text-muted-foreground">{session?.user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-muted/50">
            <Link href="/create-listing" className="flex items-center gap-2">
              <BadgePlus size={16} />
              <span>Sell Your Car</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-muted/50">
            <Link href="/your-listings" className="flex items-center gap-2">
              <Car size={16} />
              <span>Your Listings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
