"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Template } from "@/types/template/template";

export function useGallery(template: Template) {
  const images = useMemo(() => {
    return [
      template.coverImage,
      ...template.gallery,
    ];
  }, [template]);

  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] =
  useState(false);

  function next() {
    setCurrent((value) =>
      value === images.length - 1
        ? 0
        : value + 1
    );
  }

  function previous() {
    setCurrent((value) =>
      value === 0
        ? images.length - 1
        : value - 1
    );
  }
  function openLightbox() {
  setLightboxOpen(true);
}

function closeLightbox() {
  setLightboxOpen(false);
}
useEffect(() => {
  function handleKeyDown(
    event: KeyboardEvent
  ) {
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
    handleKeyDown
  );

  return () =>
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
}, [next, previous]);

  return {
    images,
    current,
    currentImage: images[current],
    lightboxOpen,
    setCurrent,
    next,
    previous,
openLightbox,
closeLightbox,
  };
}