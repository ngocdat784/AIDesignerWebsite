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
  badge: "Powerful Features",

  title: "Everything You Need",

  highlight: "to Build Faster",

  description:
    "Powerful AI tools to design, customize and deploy modern websites with an intuitive workflow and modern experience.",
},

  features: [
    {
      title: "AI Website Generation",
      description:
        "Generate complete websites from natural language prompts in seconds.",
      icon: Bot,
    },

    {
      title: "Drag & Drop Editor",
      description:
        "Customize every section visually without touching code.",
      icon: MousePointerClick,
    },

    {
      title: "Template Marketplace",
      description:
        "Explore and purchase premium templates from creators.",
      icon: LayoutTemplate,
    },

    {
      title: "One-click Deployment",
      description:
        "Publish your website instantly with a single click.",
      icon: Rocket,
    },

    {
      title: "Team Collaboration",
      description:
        "Work together seamlessly with designers and developers.",
      icon: Users,
    },

    {
      title: "SEO Optimized",
      description:
        "Fast loading, responsive and search engine friendly.",
      icon: Search,
    },
  ],
};