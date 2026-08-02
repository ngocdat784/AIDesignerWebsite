export function getTotalPages(
  total: number,
  pageSize: number
) {
  return Math.ceil(total / pageSize);
}