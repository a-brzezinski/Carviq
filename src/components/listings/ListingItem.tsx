import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaClock, FaGasPump, FaRoad } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";

import { ListingWithRelations } from "@/@Types/listing";

import { DetailItem } from "./DetailItem";

interface ListingItemProps {
  listing: ListingWithRelations;
}

export const ListingItem = ({ listing }: ListingItemProps) => {
  const { model, price, fuelType, transmission, mileage, year, createdAt, imageUrls, id } = listing;

  const listingImage = imageUrls.split(",")[0];

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  const formattedMileage = new Intl.NumberFormat("en-Us").format(mileage);

  const relativeTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: enUS,
  });

  return (
    <li className="overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 hover:shadow-xl md:hover:scale-105">
      <Link href={`/offer/${id}`}>
        <div className="flex flex-col gap-4 p-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              className="object-cover transition-transform duration-300 hover:scale-105"
              src={listingImage}
              fill
              alt={`${model.brand.name} ${model.name} image`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold text-gray-800">
              {model.brand.name} | {model.name}
            </p>
            <p className="text-xl font-bold text-gray-800">{formattedPrice}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <DetailItem icon={<FaGasPump />} label={fuelType} />
              <DetailItem icon={<GiGearStickPattern />} label={transmission} />
              <DetailItem icon={<FaRoad />} label={`${formattedMileage} km`} />
              <DetailItem icon={<FaCalendar />} label={year} />
              <DetailItem icon={<FaClock />} label={`Posted ${relativeTime}`} />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
