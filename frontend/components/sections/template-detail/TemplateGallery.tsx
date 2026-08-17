"use client";

import type { TemplateDetailProps } from "./types";

import GalleryControls from "./gallery/GalleryControls";
import GalleryMainImage from "./gallery/GalleryMainImage";
import GalleryThumbnail from "./gallery/GalleryThumbnail";
import GalleryLightbox from "./gallery/GalleryLightbox";

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
    lightboxOpen,
    openLightbox,
    closeLightbox,
  } = useGallery(template);

  return (
    <section className="space-y-5">
      {/* =====================================================
          Main Image
         ===================================================== */}

      <GalleryMainImage
        image={currentImage}
        onClick={openLightbox}
      />

      {/* =====================================================
          Navigation Controls
         ===================================================== */}

      <GalleryControls
        onNext={next}
        onPrevious={previous}
      />

      {/* =====================================================
          Thumbnails
         ===================================================== */}

      {images.length > 1 && (
        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-4
            md:grid-cols-5
          "
        >
          {images.map((image, index) => (
            <GalleryThumbnail
              key={`${image}-${index}`}
              image={image}
              active={current === index}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      )}

      {/* =====================================================
          Lightbox
         ===================================================== */}

      <GalleryLightbox
        image={currentImage}
        open={lightboxOpen}
        onClose={closeLightbox}
      />
    </section>
  );
}