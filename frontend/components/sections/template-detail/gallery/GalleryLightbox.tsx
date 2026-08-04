"use client";

import Image from "next/image";
import { useEffect } from "react";

interface Props {
  image: string;
  open: boolean;
  onClose(): void;
}

export default function GalleryLightbox({
  image,
  open,
  onClose,
}: Props) {
  useEffect(() => {
  if (!open) return;

  const previous =
    document.body.style.overflow;

  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = previous;
  };
}, [open]);

  return (
    <div
      onClick={onClose}
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/90
      backdrop-blur-sm
      "
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
        relative
        h-[90vh]
        w-[90vw]
        "
      >
        <Image
          src={image}
          alt=""
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}