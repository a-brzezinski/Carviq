import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: URLSearchParams;
}

export const PagePagination = ({ currentPage, totalPages, searchParams }: PaginationProps) => {
  const createPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };
  return (
    <Pagination className="py-8">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageHref(currentPage - 1)} />
          </PaginationItem>
        )}
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink href={createPageHref(pageNum)} isActive={pageNum === currentPage}>
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageHref(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
