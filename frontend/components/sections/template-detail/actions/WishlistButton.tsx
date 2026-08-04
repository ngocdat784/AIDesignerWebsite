"use client";

import { Heart } from "lucide-react";

import ActionButton from "./ActionButton";

export default function WishlistButton() {
  return (
    <ActionButton
      icon={<Heart className="h-4 w-4" />}
    >
      Wishlist
    </ActionButton>
  );
}