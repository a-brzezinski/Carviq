import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ConfirmationDialog } from "../dialogs/ConfirmationDialog";

interface ListingThumbnailProps {
  imageUrl: string;
  model: string;
  brand: string;
  id: number;
}

export const ListingThumbnail = ({ brand, id, imageUrl, model }: ListingThumbnailProps) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border shadow-sm transition hover:shadow-md">
      <div className="relative aspect-square w-full bg-gray-100">
        <Image src={imageUrl} alt={`${brand} ${model}`} fill className="object-cover" />
      </div>

      <div className="flex flex-col gap-1 p-4">
        <p className="text-sm text-gray-500">{brand}</p>
        <p className="text-lg font-semibold">{model}</p>
      </div>

      <div className="mt-auto flex items-center justify-between px-4 pb-4 text-sm">
        <ConfirmationDialog listingId={id} />

        <Link href={`/your-listings/update/${id}`} className="flex items-center gap-1 text-blue-500 hover:underline">
          <Pencil size={16} />
          Update
        </Link>
      </div>
    </div>
  );
};
