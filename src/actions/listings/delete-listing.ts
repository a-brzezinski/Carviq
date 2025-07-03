"use server";

import { revalidatePath } from "next/cache";

import { ActionResponse } from "@/@Types/response";
import { getSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";

export const deleteListing = async (listingId: number): Promise<ActionResponse> => {
  try {
    const session = await getSession();

    if (!session) {
      return {
        status: "ERROR",
        message: "You must be signed in to delete a listing",
      };
    }

    await prisma.listing.delete({
      where: {
        id: listingId,
        userId: session.user.id,
      },
    });

    revalidatePath("/your-listings");
    return {
      status: "SUCCESS",
      message: "Listing deleted successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "An error occurred while trying to delete the listing",
    };
  }
};
