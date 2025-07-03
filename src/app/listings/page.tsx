import { ListingList } from "@/components/listings/ListingList";
import { NotFoundListings } from "@/components/listings/NotFoundListings";
import { PagePagination } from "@/components/shared/Pagination";
import { getListings } from "@/lib/data/listings";
import { parseListingParams } from "@/utils/parseSearchParams";

interface Props {
  searchParams: Promise<{ page?: string; sort?: string }>;
}

export default async function ListingPage({ searchParams }: Props) {
  const params = await searchParams;
  const { limit, page, sort, urlParams } = parseListingParams(params);

  const { listings, totalCount } = await getListings({
    page,
    limit,
    sort,
  });

  if (listings.length === 0) {
    return <NotFoundListings infoText="No listings available at the moment." />;
  }

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="flex flex-col gap-6">
      <ListingList listings={listings} />
      {totalPages > 1 && <PagePagination currentPage={page} totalPages={totalPages} searchParams={urlParams} />}
    </div>
  );
}
