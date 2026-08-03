export const VIEW_MODES = [
  "grid",
  "list",
] as const;

export type ViewMode =
  (typeof VIEW_MODES)[number];

export const DEFAULT_VIEW_MODE: ViewMode =
  "grid";