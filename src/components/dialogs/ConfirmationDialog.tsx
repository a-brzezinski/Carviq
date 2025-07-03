"use client";

import { Trash } from "lucide-react";
import { toast } from "sonner";

import { deleteListing } from "@/actions/listings/delete-listing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const ConfirmationDialog = ({ listingId }: { listingId: number }) => {
  const handleDelete = async () => {
    const response = await deleteListing(listingId);
    if (response.status === "SUCCESS") {
      toast.success(response.message);
    }
    if (response.status === "ERROR") {
      toast.error(response.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex cursor-pointer items-center gap-1 text-sm text-red-500">
          <Trash size={16} />
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your listing and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
