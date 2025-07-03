"use client";

import { useField, useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchBrands, fetchModels } from "@/lib/queries/cars";

export function BrandAndModelFilter() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      brand: "",
      model: "",
    },
    onSubmit: ({ value }) => {
      const { brand, model } = value;
      if (brand === "all") {
        router.push("/listings");
      } else if (model) {
        router.push(`/listings/${brand}/${model}`);
      } else {
        router.push(`/listings/${brand}`);
      }
    },
  });

  const { data: brands = [], isLoading: loadingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const brandField = useField({
    form,
    name: "brand",
  });

  const selectedBrand = brandField.state.value;

  const { data: models = [], isLoading: loadingModels } = useQuery({
    queryKey: ["models", selectedBrand],
    queryFn: () => fetchModels(selectedBrand),
    enabled: selectedBrand !== "all" && !!selectedBrand,
  });

  return (
    <form
      className="flex w-full flex-col gap-4 xl:w-2/4 xl:flex-row"
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}>
      <form.Field name="brand">
        {({ state, handleChange }) => (
          <>
            <Select
              value={state.value}
              onValueChange={val => {
                handleChange(val);
                if (val === "all") {
                  form.setFieldValue("model", "");
                }
              }}
              disabled={loadingBrands}>
              <SelectTrigger className="w-full xl:w-48">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand.id} value={brand.name.toLowerCase()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </form.Field>
      <form.Field name="model">
        {({ state, handleChange }) => (
          <Select
            value={state.value}
            onValueChange={val => handleChange(val)}
            disabled={loadingModels || selectedBrand === "all" || !selectedBrand}>
            <SelectTrigger className="w-full xl:w-48">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {models.map(model => (
                <SelectItem key={model.id} value={model.name.toLowerCase()}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </form.Field>
      <Button type="submit" disabled={loadingBrands} className="">
        Search
      </Button>
    </form>
  );
}
