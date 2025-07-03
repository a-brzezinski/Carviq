import { notFound } from "next/navigation";

import { UpdateListingForm } from "@/components/forms/UpdateListingForm";
import { getListingById } from "@/lib/data/listings";
import { getSession } from "@/lib/get-session";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UpdateListingPage({ params }: Props) {
  const { id } = await params;
  const session = await getSession();
  const listing = await getListingById(+id);
  if (!session || !listing) {
    return notFound();
  }

  if (listing.userId !== session.user.id) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-4">
      <h3 className="pt-25 text-center text-2xl font-bold">Update Listing</h3>
      <UpdateListingForm listing={listing} />
    </div>
  );
}
