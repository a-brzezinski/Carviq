import { ListingList } from "@/components/listings/ListingList";
import { NotFoundListings } from "@/components/listings/NotFoundListings";
import { PagePagination } from "@/components/shared/Pagination";
import { getListings } from "@/lib/data/listings";
import { parseListingParams } from "@/utils/parseSearchParams";

interface Props {
  params: Promise<{ brand: string; model: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}

export default async function CarsByModelPage({ params, searchParams }: Props) {
  const { brand, model } = await params;
  const searchParamsObj = await searchParams;
  const { limit, page, sort, urlParams } = parseListingParams(searchParamsObj);

  const { listings, totalCount } = await getListings({
    brand,
    page,
    limit,
    sort,
    model,
  });

  if (listings.length === 0) {
    return <NotFoundListings infoText={`No cars found for model: ${model} under brand: ${brand}`} />;
  }

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="flex flex-col gap-6">
      <ListingList listings={listings} />
      {totalPages > 1 && <PagePagination currentPage={page} totalPages={totalPages} searchParams={urlParams} />}
    </div>
  );
}
