"use server";

import { ActionResponse } from "@/@Types/response";
import { getSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { listingSchema, ListingSchemaType } from "@/lib/schemas/listing.schema";

type CreateListingProps = ListingSchemaType & {
  images: string;
};

export const createListing = async (listing: CreateListingProps): Promise<ActionResponse> => {
  try {
    const session = await getSession();

    if (!session) {
      return {
        status: "ERROR",
        message: "You must be signed in to create a listing",
      };
    }

    const result = listingSchema.safeParse(listing);
    if (!result.success) {
      return {
        status: "ERROR",
        message: result.error.message,
      };
    }

    const { description, price, year, mileage, fuelType, transmission, bodyType, model, images, brand } = listing;

    const carModel = await prisma.carModel.findFirst({
      where: {
        name: model,
        brand: {
          name: brand,
        },
      },
      include: { brand: true },
    });

    if (!carModel) {
      return {
        status: "ERROR",
        message: "Model not found for the specified brand",
      };
    }

    await prisma.listing.create({
      data: {
        description,
        price,
        year: parseInt(year),
        mileage,
        fuelType,
        transmission,
        bodyType,
        imageUrls: images,
        model: {
          connect: {
            id: carModel.id,
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return {
      status: "SUCCESS",
      message: "Listing created successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Error creating listing",
    };
  }
};
