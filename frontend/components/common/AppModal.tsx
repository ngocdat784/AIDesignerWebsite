"use client";

import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

export interface AppModalProps {
  open: boolean;

  onOpenChange(open: boolean): void;

  title: string;

  description?: string;

  children: ReactNode;

  footer?: ReactNode;

  className?: string;
}

export default function AppModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: AppModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className={cn(
          "max-w-xl rounded-3xl border bg-background p-0 shadow-2xl",
          className
        )}
      >
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="px-8 py-6">
          {children}
        </div>

        {footer && (
          <DialogFooter className="border-t bg-muted/30 px-8 py-5">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}