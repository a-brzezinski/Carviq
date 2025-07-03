import { Suspense } from "react";

import { BrandAndModelFilter } from "@/components/shared/BrandAndModelFilter";
import { SortSelect } from "@/components/shared/SortSelect";

export default function ListingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 px-4 pt-24">
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl p-4 shadow-sm xl:flex-row">
        <BrandAndModelFilter />
        <Suspense fallback={<div>Loading sort...</div>}>
          <SortSelect />
        </Suspense>
      </div>
      {children}
    </div>
  );
}
