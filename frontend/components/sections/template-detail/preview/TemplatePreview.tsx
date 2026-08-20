"use client";

import type { TemplatePreviewStyle } from "./types";

import ModernPreview from "./styles/ModernPreview";
import MinimalPreview from "./styles/MinimalPreview";
import DarkPreview from "./styles/DarkPreview";
import GlassPreview from "./styles/GlassPreview";

interface TemplatePreviewProps {
  style: TemplatePreviewStyle;
}

export default function TemplatePreview({
  style,
}: TemplatePreviewProps) {
  switch (style) {
    case "minimal":
      return <MinimalPreview />;

    case "dark":
      return <DarkPreview />;

    case "glass":
      return <GlassPreview />;

    case "modern":
    default:
      return <ModernPreview />;
  }
}