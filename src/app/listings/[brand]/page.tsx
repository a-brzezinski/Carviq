import { ListingList } from "@/components/listings/ListingList";
import { NotFoundListings } from "@/components/listings/NotFoundListings";
import { PagePagination } from "@/components/shared/Pagination";
import { getListings } from "@/lib/data/listings";
import { parseListingParams } from "@/utils/parseSearchParams";

interface Props {
  params: Promise<{ brand: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}

export default async function CarsByBrandPage({ params, searchParams }: Props) {
  const { brand } = await params;
  const { limit, page, sort, urlParams } = parseListingParams(await searchParams);

  const { listings, totalCount } = await getListings({
    brand,
    page,
    limit,
    sort,
  });

  if (listings.length === 0) {
    return <NotFoundListings infoText={`No cars found for brand: ${brand}`} />;
  }

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="flex flex-col gap-6">
      <ListingList listings={listings} />
      {totalPages > 1 && <PagePagination currentPage={page} totalPages={totalPages} searchParams={urlParams} />}
    </div>
  );
}
