import { ListingThumbnail } from "@/components/your-listings/ListingThumbnail";
import { getUserListings } from "@/lib/data/listings";
import { getSession } from "@/lib/get-session";

export default async function YourListingsPage() {
  const session = await getSession();

  const userListings = await getUserListings(session?.user.id || "");

  return (
    <section className="px-4 pt-24">
      <h2 className="mb-6 text-3xl font-bold">Your Listings</h2>

      {userListings.length === 0 ? (
        <p className="text-gray-500">You have no listings yet.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userListings.map(listing => {
            const firstImageUrl = listing.imageUrls.split(",")[0];
            return (
              <li key={listing.id}>
                <ListingThumbnail
                  brand={listing.model.brand.name}
                  model={listing.model.name}
                  imageUrl={firstImageUrl}
                  id={listing.id}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
