"use client";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CarBrand, CarModel } from "@/generated/prisma";
import { cn } from "@/lib/utils";

interface SearchSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CarBrand[] | CarModel[];
  selectText: string;
  placeholder: string;
  emptyText: string;
  disabled?: boolean;
}

export const SearchSelect = ({
  value,
  onChange,
  options,
  selectText,
  placeholder,
  emptyText,
  disabled,
}: SearchSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-input px-3 font-normal outline-offset-0 outline-none hover:bg-background focus-visible:outline-[3px]">
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value ? options.find(o => o.name === value)?.name : selectText}
            </span>
            <ChevronDownIcon size={16} className="shrink-0 text-muted-foreground/80" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0" align="start">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map(option => (
                  <CommandItem
                    key={option.id}
                    value={option.name}
                    onSelect={currentValue => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}>
                    {option.name}
                    {value === option.name && <CheckIcon size={16} className="ml-auto" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
