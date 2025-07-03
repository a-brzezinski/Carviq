"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { SortOptions } from "@/@Types/listing";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortSelectProps {
  currentSort?: string;
}

export const SortSelect = ({ currentSort }: SortSelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex w-full flex-col justify-between gap-4 xl:w-auto xl:flex-row">
      <Label className="mr-2">Sort by:</Label>
      <Select onValueChange={handleSortChange} defaultValue={currentSort}>
        <SelectTrigger className="w-full xl:w-[200px]">
          <SelectValue placeholder="Sort Options" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={SortOptions.Date}>Addition date</SelectItem>
            <SelectItem value={SortOptions.Decreasingly}>Price decreasingly</SelectItem>
            <SelectItem value={SortOptions.Ascending}>Price ascending</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
