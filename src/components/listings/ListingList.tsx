import { ListingWithRelations } from "@/@Types/listing";
import { ListingItem } from "@/components/listings/ListingItem";

interface ListingListProps {
  listings: ListingWithRelations[];
}

export const ListingList = ({ listings }: ListingListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {listings.map(listing => (
        <ListingItem key={listing.id} listing={listing} />
      ))}
    </ul>
  );
};
