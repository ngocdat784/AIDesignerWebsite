"use client";

import { Share2 } from "lucide-react";

import ActionButton from "./ActionButton";

export default function ShareButton() {
  return (
    <ActionButton
      icon={<Share2 className="h-4 w-4" />}
    >
      Share
    </ActionButton>
  );
}