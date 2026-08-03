"use client";

import Image from "next/image";

interface Props {
  image: string;
}

export default function GalleryMainImage({
  image,
}: Props) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border">
      <Image
        src={image}
        alt="Template Preview"
        fill
        className="object-cover"
      />
    </div>
  );
}