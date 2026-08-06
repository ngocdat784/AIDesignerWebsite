import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { HeroData } from "./types";

export const heroData: HeroData = {
  badge: {
    icon: Sparkles,
    text: "AI Powered Website Builder",
  },

  title: "Design Beautiful Websites",

  highlight: "with Artificial Intelligence",

  description:
    "Build modern websites in minutes using AI or explore a marketplace filled with premium templates created by talented designers.",

  buttons: [
    {
      label: "Start Building",
      href: "/builder",
      icon: ArrowRight,
    },
    {
      label: "Explore Templates",
      href: "/templates",
      variant: "outline",
    },
  ],

  stats: [
    {
      value: "20K+",
      label: "Templates",
    },
    {
      value: "150K+",
      label: "Creators",
    },
    {
      value: "99.9%",
      label: "Uptime",
    },
  ],

  trusted: [
    {
      name: "Google",
      logo: "/images/brands/google.svg",
    },
    {
      name: "Microsoft",
      logo: "/images/brands/microsoft.svg",
    },
    {
      name: "OpenAI",
      logo: "/images/brands/openai.svg",
    },
    {
      name: "Vercel",
      logo: "/images/brands/vercel.svg",
    },
    {
      name: "Adobe",
      logo: "/images/brands/adobe.svg",
    },
  ],

  preview: {
    browserTitle: "AI Designer",

    cards: [
      {
        title: "Landing Page",
        image: "/images/hero/preview-1.webp",
        badge: "New",
      },
      {
        title: "Dashboard",
        image: "/images/hero/preview-2.webp",
      },
      {
        title: "Portfolio",
        image: "/images/hero/preview-3.webp",
      },
    ],
  },
};