"use client";

import Link from "next/link";

import AppButton from "@/components/common/AppButton";
import { cn } from "@/lib/utils";

import { heroData } from "./hero.data";

interface HeroActionsProps {
  className?: string;
}

export default function HeroActions({
  className,
}: HeroActionsProps) {
  return (
    <div
      className={cn(
        `

        flex
        flex-col
        items-center
        gap-5
        sm:flex-row sm:items-center
        sm:justify-center
        `,
        className
      )}
    >
      {heroData.buttons.map((button) => {
        const Icon = button.icon;

        return (
          <Link
            key={button.label}
            href={button.href}
            target={button.external ? "_blank" : undefined}
            rel={
              button.external
                ? "noopener noreferrer"
                : undefined
            }
          >
            <AppButton
              size="lg"
              variant={button.variant ?? "default"}
              className="
  group
  h-14
  min-w-[200px]
  rounded-2xl
  px-10
  text-base
  font-semibold
  shadow-md
  transition-all
  duration-300
  hover:-translate-y-1
  hover:shadow-2xl
"
            >
              <span>{button.label}</span>

              {Icon && (
                <Icon
                  className="
                    ml-2
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              )}
            </AppButton>
          </Link>
        );
      })}
    </div>
  );
}