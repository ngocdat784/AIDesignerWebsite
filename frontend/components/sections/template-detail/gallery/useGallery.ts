"use client";

import { useMemo, useState } from "react";

import type { Template } from "@/types";

export function useGallery(template: Template) {
  const images = useMemo(() => {
    return [
      template.coverImage,
      ...template.gallery,
    ];
  }, [template]);

  const [current, setCurrent] = useState(0);

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

  return {
    images,
    current,
    currentImage: images[current],
    setCurrent,
    next,
    previous,
  };
}