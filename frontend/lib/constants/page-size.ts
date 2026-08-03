export const PAGE_SIZE_OPTIONS = [
  12,
  24,
  48,
] as const;

export type PageSize =
  (typeof PAGE_SIZE_OPTIONS)[number];

export const DEFAULT_PAGE_SIZE = 12;