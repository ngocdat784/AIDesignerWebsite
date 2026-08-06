"use client";

import {
  Sparkles,
  Wand2,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface HeroPreviewProps {
  className?: string;
}

export default function HeroPreview({
  className,
}: HeroPreviewProps) {
  return (
    <div
      className={cn(
        `
        relative
        mx-auto
        mt-16
        w-full
        max-w-6xl
        `,
        className
      )}
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-x-10
          -bottom-12
          h-32
          rounded-full
          bg-primary/20
          blur-3xl
        "
      />

      {/* Browser */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          bg-card/90
          shadow-2xl
          backdrop-blur-xl
        "
      >
        {/* Browser Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            bg-muted/40
            px-6
            py-4
          "
        >
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          <div
            className="
              hidden
              rounded-full
              bg-background
              px-4
              py-1
              text-xs
              text-muted-foreground
              md:block
            "
          >
            https://ai-designer.app
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-primary/10
              px-3
              py-1
              text-xs
              font-medium
              text-primary
            "
          >
            <Sparkles className="h-3.5 w-3.5" />

            AI Live
          </div>
        </div>

        {/* Content */}

        <div className="space-y-8 p-8">
          {/* Hero */}

          <div className="space-y-4">
            <div className="h-6 w-60 rounded-full bg-muted" />

            <div className="h-4 w-full rounded-full bg-muted" />

            <div className="h-4 w-2/3 rounded-full bg-muted" />
          </div>

          {/* Cards */}

          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  group
                  rounded-2xl
                  border
                  bg-background
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-primary/30
                  hover:shadow-xl
                "
              >
                <div
                  className="
                    mb-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                  "
                >
                  <Wand2 className="h-5 w-5" />
                </div>

                <div className="space-y-3">
                  <div className="h-4 w-2/3 rounded-full bg-muted" />

                  <div className="h-3 rounded-full bg-muted" />

                  <div className="h-3 w-3/4 rounded-full bg-muted" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom */}

          <div
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              bg-background
              p-5
            "
          >
            <div className="space-y-3 flex-1">
              <div className="h-4 w-36 rounded-full bg-muted" />

              <div className="h-3 w-2/3 rounded-full bg-muted" />
            </div>

            <div
              className="
                rounded-xl
                bg-primary
                px-6
                py-3
                text-sm
                font-semibold
                text-primary-foreground
              "
            >
              Generate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}