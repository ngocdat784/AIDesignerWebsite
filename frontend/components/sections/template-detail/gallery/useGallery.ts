"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Template } from "@/types/template/template";

export function useGallery(
  template: Template,
) {
  // =========================================================
  // Build gallery images
  // =========================================================
  //
  // Priority:
  //
  // 1. coverImage
  // 2. gallery
  // 3. images
  // 4. thumbnail fallback
  //
  // Đồng thời loại bỏ ảnh trùng.
  // =========================================================

  const images = useMemo(() => {
    const sources: string[] = [];

    // ---------------------------------------------------------
    // Cover image
    // ---------------------------------------------------------

    if (template.coverImage) {
      sources.push(
        template.coverImage,
      );
    }

    // ---------------------------------------------------------
    // Gallery
    // ---------------------------------------------------------

    if (template.gallery?.length) {
      sources.push(
        ...template.gallery,
      );
    }

    // ---------------------------------------------------------
    // Images
    // ---------------------------------------------------------

    if (template.images?.length) {
      sources.push(
        ...template.images,
      );
    }

    // ---------------------------------------------------------
    // Thumbnail fallback
    // ---------------------------------------------------------

    if (
      sources.length === 0 &&
      template.thumbnail
    ) {
      sources.push(
        template.thumbnail,
      );
    }

    // ---------------------------------------------------------
    // Remove duplicate images
    // ---------------------------------------------------------

    return Array.from(
      new Set(sources),
    );
  }, [
    template.coverImage,
    template.gallery,
    template.images,
    template.thumbnail,
  ]);

  // =========================================================
  // Current image
  // =========================================================

  const [current, setCurrent] =
    useState(0);

  // =========================================================
  // Lightbox
  // =========================================================

  const [lightboxOpen, setLightboxOpen] =
    useState(false);

  // =========================================================
  // Reset current image when
  // template/gallery changes
  // =========================================================

  useEffect(() => {
    setCurrent(0);
    setLightboxOpen(false);
  }, [template.id]);

  // =========================================================
  // Next
  // =========================================================

  function next() {
    if (images.length <= 1) {
      return;
    }

    setCurrent((value) =>
      value >= images.length - 1
        ? 0
        : value + 1,
    );
  }

  // =========================================================
  // Previous
  // =========================================================

  function previous() {
    if (images.length <= 1) {
      return;
    }

    setCurrent((value) =>
      value <= 0
        ? images.length - 1
        : value - 1,
    );
  }

  // =========================================================
  // Open lightbox
  // =========================================================

  function openLightbox() {
    setLightboxOpen(true);
  }

  // =========================================================
  // Close lightbox
  // =========================================================

  function closeLightbox() {
    setLightboxOpen(false);
  }

  // =========================================================
  // Keyboard navigation
  // =========================================================

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      // Không xử lý keyboard khi không có gallery
      if (images.length === 0) {
        return;
      }

      switch (event.key) {
        case "ArrowRight":
          next();
          break;

        case "ArrowLeft":
          previous();
          break;

        case "Escape":
          closeLightbox();
          break;
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [images.length]);

  // =========================================================
  // Current image
  // =========================================================

  const currentImage =
    images[current] ??
    template.coverImage ??
    template.thumbnail;

  // =========================================================
  // Return
  // =========================================================

  return {
    images,

    current,

    currentImage,

    lightboxOpen,

    setCurrent,

    next,

    previous,

    openLightbox,

    closeLightbox,
  };
}