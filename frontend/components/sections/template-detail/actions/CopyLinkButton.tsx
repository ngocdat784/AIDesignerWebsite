"use client";

import { Link2 } from "lucide-react";

import ActionButton from "./ActionButton";

export default function CopyLinkButton() {
  return (
    <ActionButton
      icon={<Link2 className="h-4 w-4" />}
    >
      Copy Link
    </ActionButton>
  );
}