"use server";

import { ActionResponse } from "@/@Types/response";
import { getSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { listingUpdateSchema, ListingUpdateSchemaType } from "@/lib/schemas/listing.schema";

export const updateListing = async (listing: ListingUpdateSchemaType, listingId: number): Promise<ActionResponse> => {
  try {
    const session = await getSession();
    if (!session) {
      return {
        status: "ERROR",
        message: "You must be signed in to update a listing",
      };
    }

    const result = listingUpdateSchema.safeParse(listing);
    if (!result.success) {
      return {
        status: "ERROR",
        message: result.error.message,
      };
    }

    const { bodyType, description, fuelType, mileage, price, transmission, year } = listing;

    await prisma.listing.update({
      where: {
        id: listingId,
        userId: session.user.id,
      },
      data: {
        description,
        price,
        year: parseInt(year),
        mileage,
        fuelType,
        transmission,
        bodyType,
      },
    });

    return {
      status: "SUCCESS",
      message: "Listing updated successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "An error occurred while updating the listing",
    };
  }
};
