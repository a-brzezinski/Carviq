import { Prisma } from "@/generated/prisma";

export const listingWithRelations = Prisma.validator<Prisma.ListingDefaultArgs>()({
  include: {
    model: {
      include: {
        brand: true,
      },
    },
  },
});

export type ListingWithRelations = Prisma.ListingGetPayload<typeof listingWithRelations>;

export enum SortOptions {
  Date = "date",
  Decreasingly = "decreasingly",
  Ascending = "ascending",
}
