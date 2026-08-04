"use client";

import type { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppTooltipProps {
  children: ReactNode;

  content: ReactNode;

  side?: "top" | "right" | "bottom" | "left";

  align?: "start" | "center" | "end";

  delay?: number;
}

export default function AppTooltip({
  children,
  content,
  side = "top",
  align = "center",
  delay = 200,
}: AppTooltipProps) {
  return (
    <TooltipProvider delay={delay}>
      <Tooltip>
        <TooltipTrigger>
          {children}
        </TooltipTrigger>

        <TooltipContent
          side={side}
          align={align}
          className="
            rounded-xl
            border
            bg-popover
            px-3
            py-2
            text-sm
            shadow-xl
            backdrop-blur-sm
          "
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}