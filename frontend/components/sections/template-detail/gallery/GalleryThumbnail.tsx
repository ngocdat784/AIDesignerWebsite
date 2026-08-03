"use client";

import Image from "next/image";

interface Props {
  image: string;
  active: boolean;
  onClick(): void;
}

export default function GalleryThumbnail({
  image,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        aspect-video
        overflow-hidden
        rounded-xl
        border-2
        transition-all
        ${
          active
            ? "border-primary"
            : "border-transparent"
        }
      `}
    >
      <Image
        src={image}
        alt=""
        fill
        className="object-cover"
      />
    </button>
  );
}