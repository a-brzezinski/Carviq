"use client";

import { useField, useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createListing } from "@/actions/listings/create-listing";
import { ImagePicker } from "@/components/features/ImagePicker/ImagePicker";
import { InfoText } from "@/components/shared/InfoText";
import { NumberInput } from "@/components/shared/NumberInput";
import { SearchSelect } from "@/components/shared/SearchSelect";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BodyType, FuelType, Transmission } from "@/generated/prisma";
import { bodyTypeLabels, fuelLabels, transmissionLabels, years } from "@/helpers/constants";
import { fetchBrands, fetchModels } from "@/lib/queries/cars";
import { listingSchema, ListingSchemaType } from "@/lib/schemas/listing.schema";
import { useUploadThing } from "@/utils/uploadthing";

const formDefaultValues = {
  brand: "",
  model: "",
  description: "",
  price: 0,
  year: "2025",
  mileage: 0,
  fuelType: FuelType.PETROL,
  transmission: Transmission.AUTOMATIC,
  bodyType: BodyType.SEDAN,
} as ListingSchemaType;

export const CreateListingForm = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader", {
    onUploadError: error => {
      toast.error("Upload failed: " + error.message);
    },
  });

  const [files, setFiles] = useState<File[]>([]);

  const form = useForm({
    defaultValues: formDefaultValues,
    validators: {
      onChange: listingSchema,
      onMount: listingSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (files.length === 0) {
          toast.error("A minimum of one image is required to create a listing");
          return;
        }

        setUploading(true);

        const response = await startUpload(files);
        if (!response || response.length === 0) {
          toast.error("No files uploaded");
          return;
        }
        const uploadedUrls = response.map(file => file.ufsUrl).join(",");

        const payload = {
          ...value,
          images: uploadedUrls,
        };

        const { message, status, data } = await createListing(payload);

        if (status === "SUCCESS" && data?.id) {
          router.push(`/offer/${data.id}`);
          toast.success("Listing created successfully!");
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error("Error in form submission: " + (error instanceof Error ? error.message : "Unknown error"));
      } finally {
        setUploading(false);
      }
    },
  });

  const brandField = useField({
    form,
    name: "brand",
  });

  const selectedBrand = brandField.state.value;

  const { data: brands = [], isLoading: loadingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const { data: models = [], isLoading: loadingModels } = useQuery({
    queryKey: ["models", selectedBrand],
    queryFn: () => fetchModels(selectedBrand),
    enabled: !!selectedBrand,
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-4 xl:grid-cols-2 xl:gap-x-8 xl:gap-y-6">
        <form.Field name="brand">
          {({ state, handleChange }) => (
            <div className="w-full">
              <Label className="pb-2 text-sm font-medium text-gray-700">Choose brand (Required)</Label>
              <InfoText variant="default">This cannot be changed later</InfoText>
              <SearchSelect
                onChange={val => {
                  handleChange(val);
                  form.setFieldValue("model", "");
                }}
                value={state.value}
                options={brands}
                selectText={loadingBrands ? "Loading..." : "Choose brand"}
                placeholder="Search brand..."
                emptyText="No results"
              />
              {state.meta.errors.length > 0 && state.meta.isTouched && (
                <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="model">
          {({ state, handleChange }) => (
            <div className="w-full">
              <Label className="pb-2 text-sm font-medium text-gray-700">Choose model (Required)</Label>
              <InfoText variant="default">This cannot be changed later</InfoText>
              <SearchSelect
                value={state.value}
                onChange={handleChange}
                options={models}
                selectText={selectedBrand ? (loadingModels ? "Loading models..." : "Choose model") : "Choose brand"}
                placeholder="Search model..."
                emptyText="No results"
                disabled={!selectedBrand}
              />
              {state.meta.errors.length > 0 && state.meta.isTouched && (
                <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="description">
          {({ state, handleChange }) => (
            <div className="w-full xl:col-span-2">
              <Label className="pb-2 text-sm font-medium text-gray-700">Description (Required)</Label>
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

        <div className="w-full xl:col-span-2">
          <ImagePicker onFilesSelected={setFiles} disabled={uploading} />
          <InfoText variant="default">Uploaded images cannot be changed after listing is created</InfoText>
        </div>

        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          // eslint-disable-next-line react/no-children-prop
          children={([canSubmit, isSubmitting]) => (
            <div className="w-full xl:col-span-2">
              <Button type="submit" disabled={!canSubmit || files.length === 0} className="w-full">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    Creating Listing...
                    <Loader2 className="animate-spin" />
                  </span>
                ) : (
                  "Create Listing"
                )}
              </Button>
            </div>
          )}
        />
      </div>
    </form>
  );
};
