"use client";

import type { TemplateDetailProps } from "./types";

import GalleryControls from "./gallery/GalleryControls";
import GalleryMainImage from "./gallery/GalleryMainImage";
import GalleryThumbnail from "./gallery/GalleryThumbnail";
import { useGallery } from "./gallery/useGallery";

export default function TemplateGallery({
  template,
}: TemplateDetailProps) {
  const {
    images,
    current,
    currentImage,
    setCurrent,
    next,
    previous,
  } = useGallery(template);

  return (
    <section className="space-y-5">
      <GalleryMainImage image={currentImage} />

      <GalleryControls
        onNext={next}
        onPrevious={previous}
      />

      <div className="grid grid-cols-5 gap-3">
        {images.map((image, index) => (
          <GalleryThumbnail
            key={image}
            image={image}
            active={current === index}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}