"use client";

import { Bookmark } from "lucide-react";

import ActionButton from "./ActionButton";

export default function SaveLaterButton() {
  return (
    <ActionButton
      icon={<Bookmark className="h-4 w-4" />}
    >
      Save
    </ActionButton>
  );
}