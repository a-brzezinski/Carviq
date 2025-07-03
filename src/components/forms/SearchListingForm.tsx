"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { SearchSelect } from "@/components/shared/SearchSelect";
import { Button } from "@/components/ui/button";
import { fetchBrands, fetchModels } from "@/lib/queries/cars";

export const SearchListingForm = () => {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const { data: brands = [], isLoading: loadingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const { data: models = [], isLoading: loadingModels } = useQuery({
    queryKey: ["models", selectedBrand],
    queryFn: () => fetchModels(selectedBrand),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const search = `listings/${selectedBrand.toLocaleLowerCase()}/${selectedModel.toLocaleLowerCase()}`;
    router.push(search);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
      <div className="flex flex-col gap-4 md:flex-row">
        <SearchSelect
          value={selectedBrand}
          onChange={val => {
            setSelectedBrand(val);
            setSelectedModel("");
          }}
          options={brands}
          selectText={loadingBrands ? "Loading..." : "Choose brand"}
          placeholder="Search brand..."
          emptyText="No results"
        />

        <SearchSelect
          value={selectedModel}
          onChange={setSelectedModel}
          options={models}
          selectText={selectedBrand ? (loadingModels ? "Loading models..." : "Choose model") : "Choose brand"}
          placeholder="Search model..."
          emptyText="No results"
          disabled={!selectedBrand}
        />
      </div>

      <Button className="w-[250px] md:w-[200px]" type="submit">
        Search list
      </Button>
    </form>
  );
};
