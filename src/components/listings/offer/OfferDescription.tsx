"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

interface OfferDescriptionProps {
  description: string;
}

export const OfferDescription = ({ description }: OfferDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  const lineCount = description.split("\n").length;

  const shouldCollapse = lineCount > 5;

  return (
    <div className="relative mb-6 text-gray-800">
      <h3 className="text-2xl font-bold">Description</h3>
      <div
        className={`text-md mt-5 overflow-hidden pr-4 whitespace-pre-line ${
          expanded || !shouldCollapse ? "max-h-full" : "max-h-50"
        }`}>
        {description}
      </div>

      {shouldCollapse && (
        <div className="mt-4">
          <Button onClick={() => setExpanded(!expanded)} variant="outline">
            {expanded ? "Collapse description" : "See more"}
          </Button>
        </div>
      )}
    </div>
  );
};
