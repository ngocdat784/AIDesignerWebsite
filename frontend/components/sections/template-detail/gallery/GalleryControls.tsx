"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import AppButton from "@/components/common/AppButton";

interface Props {
  onNext(): void;
  onPrevious(): void;
}

export default function GalleryControls({
  onNext,
  onPrevious,
}: Props) {
  return (
    <div className="flex justify-end gap-2">
      <AppButton
        variant="outline"
        onClick={onPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </AppButton>

      <AppButton
        variant="outline"
        onClick={onNext}
      >
        <ChevronRight className="h-4 w-4" />
      </AppButton>
    </div>
  );
}