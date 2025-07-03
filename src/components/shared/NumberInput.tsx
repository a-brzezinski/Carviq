"use client";

import { NumericFormat } from "react-number-format";

import { Input } from "@/components/ui/input";

interface PriceInputProps {
  value: number | undefined;
  placeholder?: string;
  onChange: (value: number | undefined) => void;
  sufix?: string;
}

export const NumberInput = ({ placeholder, onChange, value, sufix }: PriceInputProps) => {
  return (
    <NumericFormat
      value={value}
      
      thousandSeparator=" "
      allowNegative={false}
      onValueChange={values => {
        onChange(values.floatValue);
      }}
      placeholder={placeholder || "Price"}
      customInput={Input}
      suffix={sufix || " "}
    />
  );
};
