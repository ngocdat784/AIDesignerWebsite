import {
  Bot,
  LayoutTemplate,
  MousePointerClick,
  Rocket,
  Search,
  Users,
} from "lucide-react";

import type { FeaturesData } from "./types";

export const featuresData: FeaturesData = {
  header: {
    badge: "Built for Modern Creators",

    title: "Everything You Need",

    highlight: "to Ship Faster",

    description:
      "From AI-powered generation to seamless deployment, every tool is crafted to help you design, collaborate, and launch exceptional websites effortlessly.",
  },

  features: [
    {
      title: "AI Website Generation",

      description:
        "Transform simple ideas into fully responsive websites with intelligent AI assistance.",

      icon: Bot,
    },

    {
      title: "Visual Editor",

      description:
        "Design every page with an intuitive drag-and-drop experience while keeping full creative control.",

      icon: MousePointerClick,
    },

    {
      title: "Premium Marketplace",

      description:
        "Discover professionally crafted templates and launch your next project instantly.",

      icon: LayoutTemplate,
    },

    {
      title: "Instant Deployment",

      description:
        "Deploy globally in seconds with optimized performance and zero configuration.",

      icon: Rocket,
    },

    {
      title: "Real-time Collaboration",

      description:
        "Collaborate seamlessly with your entire team through a fast, intuitive and shared workspace.",

      icon: Users,
    },

    {
      title: "Performance First",

      description:
        "Built with speed, accessibility and SEO best practices to maximize your reach across every device.",

      icon: Search,
    },
  ],
};