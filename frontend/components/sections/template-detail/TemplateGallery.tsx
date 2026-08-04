"use client";

import type { TemplateDetailProps } from "./types";

import GalleryControls from "./gallery/GalleryControls";
import GalleryMainImage from "./gallery/GalleryMainImage";
import GalleryThumbnail from "./gallery/GalleryThumbnail";
import { useGallery } from "./gallery/useGallery";
import GalleryLightbox
from "./gallery/GalleryLightbox";


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

    lightboxOpen,
    openLightbox,
    closeLightbox,
} = useGallery(template);

  return (
    <section className="space-y-5">
      <GalleryMainImage
    image={currentImage}
    onClick={openLightbox}
/>

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
      <GalleryLightbox
    image={currentImage}
    open={lightboxOpen}
    onClose={closeLightbox}
/>
    </section>
  );
}