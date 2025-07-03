"use client";

import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ListingWithRelations } from "@/@Types/listing";
import { updateListing } from "@/actions/listings/update-listing";
import { InfoText } from "@/components/shared/InfoText";
import { NumberInput } from "@/components/shared/NumberInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BodyType, FuelType, Transmission } from "@/generated/prisma";
import { bodyTypeLabels, fuelLabels, transmissionLabels, years } from "@/helpers/constants";
import { listingUpdateSchema, ListingUpdateSchemaType } from "@/lib/schemas/listing.schema";

interface UpdateListingFormProps {
  listing: ListingWithRelations;
}

export const UpdateListingForm = ({ listing }: UpdateListingFormProps) => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      description: listing.description || "",
      price: listing.price || 0,
      year: String(listing.year) || "2025",
      mileage: listing.mileage || 0,
      fuelType: listing.fuelType || "PETROL",
      transmission: listing.transmission || "MANUAL",
      bodyType: listing.bodyType || "SEDAN",
    } as ListingUpdateSchemaType,
    validators: {
      onChange: listingUpdateSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateListing(value, listing.id);
        router.push("/your-listings");
        toast.success("Listing updated successfully!");
      } catch (error) {
        toast.error("Error in form submission: " + (error instanceof Error ? error.message : "Unknown error"));
      }
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="mx-auto w-full max-w-xl space-y-6 rounded-2xl bg-white p-4 shadow-md">
      <form.Field name="description">
        {({ state, handleChange }) => (
          <div className="w-full xl:col-span-2">
            <Label className="pb-2 text-sm font-medium text-gray-700">Description</Label>
            <Textarea
              value={state.value}
              onChange={e => handleChange(e.target.value)}
              placeholder="Type your description here"
              className="resize-none placeholder:text-sm"
            />
            {state.meta.errors.length > 0 && state.meta.isTouched && (
              <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
            )}
          </div>
        )}
      </form.Field>
      <form.Field name="price">
        {({ state, handleChange }) => (
          <div className="w-full">
            <Label className="pb-2 text-sm font-medium text-gray-700">Price</Label>
            <NumberInput sufix=" $" onChange={val => handleChange(val ?? 1)} value={state.value} placeholder="" />
            {state.meta.errors.length > 0 && state.meta.isTouched && (
              <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
            )}
          </div>
        )}
      </form.Field>
      <form.Field name="year">
        {({ state, handleChange }) => (
          <div className="w-full">
            <Label className="pb-2 text-sm font-medium text-gray-700">Production Year</Label>
            <Select value={state.value} onValueChange={val => handleChange(val as (typeof years)[number])}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Year of production" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {state.meta.errors.length > 0 && state.meta.isTouched && (
              <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
            )}
          </div>
        )}
      </form.Field>
      <form.Field name="mileage">
        {({ state, handleChange }) => (
          <div className="w-full">
            <Label className="pb-2 text-sm font-medium text-gray-700">The exact mileage</Label>
            <NumberInput sufix=" km" onChange={val => handleChange(val ?? 1)} value={state.value} placeholder="" />
            {state.meta.errors.length > 0 && state.meta.isTouched && (
              <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
            )}
          </div>
        )}
      </form.Field>
      <form.Field name="fuelType">
        {({ state, handleChange }) => (
          <div className="w-full">
            <Label className="pb-2 text-sm font-medium text-gray-700">Fuel Type</Label>
            <Select value={state.value} onValueChange={val => handleChange(val as FuelType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Fuel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(fuelLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {state.meta.errors.length > 0 && state.meta.isTouched && (
              <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
            )}
          </div>
        )}
      </form.Field>
      <form.Field name="transmission">
        {({ state, handleChange }) => (
          <div className="w-full">
            <Label className="pb-2 text-sm font-medium text-gray-700">Transmission</Label>
            <Select value={state.value} onValueChange={val => handleChange(val as Transmission)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(transmissionLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {state.meta.errors.length > 0 && state.meta.isTouched && (
              <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
            )}
          </div>
        )}
      </form.Field>
      <form.Field name="bodyType">
        {({ state, handleChange }) => (
          <div className="w-full">
            <Label className="pb-2 text-sm font-medium text-gray-700">Body Type</Label>
            <Select value={state.value} onValueChange={val => handleChange(val as BodyType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Body Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.entries(bodyTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {state.meta.errors.length > 0 && state.meta.isTouched && (
              <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
            )}
          </div>
        )}
      </form.Field>
      <form.Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        // eslint-disable-next-line react/no-children-prop
        children={([canSubmit, isSubmitting]) => (
          <div className="w-full xl:col-span-2">
            <Button type="submit" disabled={!canSubmit} className="w-full">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  Updating Listing..
                  <Loader2 className="animate-spin" />
                </span>
              ) : (
                "Update Listing"
              )}
            </Button>
          </div>
        )}
      />
    </form>
  );
};
