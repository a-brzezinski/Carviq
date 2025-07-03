import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ImageSwiper } from "@/components/features/ImageSwiper";
import { OfferDescription } from "@/components/listings/offer/OfferDescription";
import { OfferDetails } from "@/components/listings/offer/OfferDetails";
import { OfferFooter } from "@/components/listings/offer/OfferFooter";
import { OfferHeading } from "@/components/listings/offer/OfferHeading";
import { getListingById } from "@/lib/data/listings";

export default async function OfferPage({ params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = await params;

  const offer = await getListingById(Number(offerId));

  if (!offer) {
    return notFound();
  }

  const imagesUrl = offer.imageUrls.split(",");

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28">
      <Link
        href="/listings"
        className="mb-4 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-primary">
        <ChevronLeft size={32} />
      </Link>
      <ImageSwiper imagesUrl={imagesUrl} />
      <OfferHeading brand={offer.model.brand.name} model={offer.model.name} price={offer.price} />
      <OfferDetails offer={offer} />
      <OfferDescription description={offer.description} />
      <OfferFooter userName={offer.user.name} userPhone={offer.user.phone} />
    </div>
  );
}
