import { SortOptions } from "@/@Types/listing";

export const parseListingParams = (searchParams: Record<string, string | string[] | undefined>) => {
  const urlParams = new URLSearchParams(searchParams as Record<string, string>);
  const page = parseInt((searchParams.page as string) || "1", 10);
  const sort = (searchParams.sort as SortOptions) || SortOptions.Date;
  const limit = 20;

  return { urlParams, page, sort, limit };
};
