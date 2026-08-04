"use client";

import { useState } from "react";

import { CheckCircle2 } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

interface AppAvatarProps {
  src?: string;

  name?: string;

  alt?: string;

  size?: "xs" | "sm" | "md" | "lg" | "xl";

  online?: boolean;

  verified?: boolean;

  ring?: boolean;

  className?: string;

  onClick?: () => void;
}

const sizes = {
  xs: "h-7 w-7 text-xs",

  sm: "h-9 w-9 text-sm",

  md: "h-12 w-12 text-base",

  lg: "h-16 w-16 text-lg",

  xl: "h-24 w-24 text-2xl",
};

function getInitials(name?: string) {
  if (!name) return "?";

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return (
    words[0][0] +
    words[words.length - 1][0]
  ).toUpperCase();
}

export default function AppAvatar({
  src,

  name,

  alt,

  size = "md",

  online = false,

  verified = false,

  ring = false,

  className,

  onClick,
}: AppAvatarProps) {
  const [imageError, setImageError] =
    useState(false);

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0",
        className
      )}
    >
      <Avatar
        onClick={onClick}
        className={cn(
          sizes[size],

          "overflow-hidden transition-all duration-300",

          onClick &&
            "cursor-pointer hover:scale-105 active:scale-95",

          ring &&
            "ring-2 ring-primary ring-offset-2"
        )}
      >
        {!imageError && src && (
          <AvatarImage
            src={src}
            alt={alt ?? name}
            onError={() =>
              setImageError(true)
            }
          />
        )}

        <AvatarFallback
          className="
            bg-primary/10
            font-semibold
            text-primary
          "
        >
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      {online && (
        <span
          className="
            absolute
            bottom-0
            right-0
            h-3.5
            w-3.5
            rounded-full
            border-2
            border-background
            bg-green-500
          "
        />
      )}

      {verified && (
        <CheckCircle2
          className="
            absolute
            -bottom-1
            -right-1
            h-5
            w-5
            rounded-full
            bg-background
            text-sky-500
          "
        />
      )}
    </div>
  );
}