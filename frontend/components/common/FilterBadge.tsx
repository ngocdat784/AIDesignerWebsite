"use client";

import { X } from "lucide-react";

interface Props {
  label: string;
  value: string;
  onRemove?: () => void;
}

export default function FilterBadge({
  label,
  value,
  onRemove,
}: Props) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-3 py-1 text-sm transition-colors hover:bg-muted/80">
      <span className="font-medium">
        {label}:
      </span>

      <span>{value}</span>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-0.5 transition-colors hover:bg-background"
          aria-label={`Remove ${label} filter`}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}