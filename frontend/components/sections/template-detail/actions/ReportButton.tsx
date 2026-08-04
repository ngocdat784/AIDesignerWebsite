"use client";

import { Flag } from "lucide-react";

import ActionButton from "./ActionButton";

export default function ReportButton() {
  return (
    <ActionButton
      icon={<Flag className="h-4 w-4" />}
    >
      Report
    </ActionButton>
  );
}