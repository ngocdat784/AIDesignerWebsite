import type { ComponentType } from "react";

export interface HeroButton {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  external?: boolean;
  icon?: ComponentType<{
    className?: string;
  }>;
}

export interface HeroBadge {
  text: string;
  icon?: ComponentType<{
    className?: string;
  }>;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface HeroTrustedItem {
  name: string;
  logo: string;
}

export interface HeroPreviewCard {
  title: string;
  image: string;
  badge?: string;
}

export interface HeroPreview {
  browserTitle?: string;
  cards: HeroPreviewCard[];
}

export interface HeroData {
  badge: HeroBadge;

  title: string;

  highlight: string;

  description: string;

  buttons: HeroButton[];

  stats: HeroStat[];

  trusted: HeroTrustedItem[];

  preview: HeroPreview;
}