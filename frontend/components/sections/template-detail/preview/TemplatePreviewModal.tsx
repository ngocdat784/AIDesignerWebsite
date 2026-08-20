"use client";

import { useState } from "react";
import { X } from "lucide-react";

import TemplatePreview from "./TemplatePreview";
import TemplatePreviewSelector from "./TemplatePreviewSelector";

import type {
  TemplatePreviewStyle,
} from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
  template: any;
}

export default function TemplatePreviewModal({
  open,
  onClose,
  template,
}: Props) {
  const [
    selectedStyle,
    setSelectedStyle,
  ] = useState<TemplatePreviewStyle>(
    "modern"
  );

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 p-4 md:p-8">

      <div className="mx-auto flex h-full max-w-[1600px] overflow-hidden rounded-2xl bg-background shadow-2xl">

        {/* STYLE SELECTOR */}

        <TemplatePreviewSelector
          value={selectedStyle}
          onChange={setSelectedStyle}
        />

        {/* PREVIEW */}

        <main className="relative min-w-0 flex-1 overflow-y-auto bg-neutral-100">

          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              right-5
              top-5
              z-50
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              shadow
            "
          >
            <X className="h-5 w-5" />
          </button>

          <TemplatePreview
            style={selectedStyle}
            template={template}
          />

        </main>

      </div>

    </div>
  );
}