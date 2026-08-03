export type PaginationItem = number | "...";

export function getPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): PaginationItem[] {
  // Ít trang thì hiển thị tất cả
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );
  }

  const pages: PaginationItem[] = [];

  pages.push(1);

  const left = Math.max(
    currentPage - siblingCount,
    2
  );

  const right = Math.min(
    currentPage + siblingCount,
    totalPages - 1
  );

  if (left > 2) {
    pages.push("...");
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}