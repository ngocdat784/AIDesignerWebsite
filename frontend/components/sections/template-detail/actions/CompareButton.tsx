"use client";

import { GitCompare } from "lucide-react";

import ActionButton from "./ActionButton";

export default function CompareButton() {
  return (
    <ActionButton
      icon={<GitCompare className="h-4 w-4" />}
    >
      Compare
    </ActionButton>
  );
}