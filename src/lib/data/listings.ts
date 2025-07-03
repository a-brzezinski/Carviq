import "server-only";

import { listingWithRelations, SortOptions } from "@/@Types/listing";
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";

type GetListingsParams = {
  brand?: string;
  model?: string;
  page?: number;
  limit?: number;
  sort?: SortOptions;
};

export const getListings = async ({
  brand,
  model,
  page = 1,
  limit = 5,
  sort = SortOptions.Date,
}: GetListingsParams) => {
  const skip = (page - 1) * limit;

  let orderBy;
  switch (sort) {
    case SortOptions.Ascending:
      orderBy = { price: "asc" as Prisma.SortOrder };
      break;
    case SortOptions.Decreasingly:
      orderBy = { price: "desc" as Prisma.SortOrder };
      break;
    case SortOptions.Date:
    default:
      orderBy = { createdAt: "desc" as Prisma.SortOrder };
      break;
  }

  const where: Prisma.ListingWhereInput = {};

  if (brand && model) {
    where.model = {
      name: {
        equals: model,
        mode: "insensitive",
      },
      brand: {
        name: {
          equals: brand,
          mode: "insensitive",
        },
      },
    };
  } else if (brand) {
    where.model = {
      brand: {
        name: {
          equals: brand,
          mode: "insensitive",
        },
      },
    };
  } else if (model) {
    where.model = {
      name: {
        equals: model,
        mode: "insensitive",
      },
    };
  }

  const listings = await prisma.listing.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    include: listingWithRelations.include,
  });

  const totalCount = await prisma.listing.count({ where });

  return { listings, totalCount };
};

export const getListingById = async (id: number) => {
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      ...listingWithRelations.include,
      user: {
        select: {
          name: true,
          phone: true,
        },
      },
    },
  });

  if (!listing) {
    return null;
  }

  return listing;
};

export const getUserListings = async (userId: string) => {
  const listings = await prisma.listing.findMany({
    where: { userId },
    include: listingWithRelations.include,
    orderBy: { createdAt: "desc" },
  });

  return listings;
};
