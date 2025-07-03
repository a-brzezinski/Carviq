import { z } from "zod";

import { BodyType, FuelType, Transmission } from "@/generated/prisma";
import { years } from "@/helpers/constants";

export const listingSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  price: z.number().min(1, "Price must be greater than 0").max(10000000, "Price must be less than 10,000,000"),
  year: z.enum(years),
  mileage: z
    .number()
    .min(0, "Mileage must be greater than or equal to 0")
    .max(5000000, "Mileage must be less than 5,000,000"),
  fuelType: z.nativeEnum(FuelType),
  transmission: z.nativeEnum(Transmission),
  bodyType: z.nativeEnum(BodyType),
});

export type ListingSchemaType = z.infer<typeof listingSchema>;

export const listingUpdateSchema = listingSchema.omit({
  brand: true,
  model: true,
});

export type ListingUpdateSchemaType = z.infer<typeof listingUpdateSchema>;