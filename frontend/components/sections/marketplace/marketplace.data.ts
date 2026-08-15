import { MarketplaceData } from "./types";

export const marketplaceData: Omit<
  MarketplaceData,
  "templates"
> = {
  header: {
    badge: "Marketplace",
    title: "Featured Templates",
    highlight: "crafted by professionals",
    description:
      "Discover premium AI-ready website templates created by talented designers around the world.",
    action: {
      text: "View All",
      href: "/marketplace",
    },
  },

  tabs: [
    {
      id: "all",
      label: "All",
    },
    {
      id: "featured",
      label: "Featured",
    },
    {
      id: "new",
      label: "New",
    },
    {
      id: "popular",
      label: "Popular",
    },
  ],

  categories: [
    {
      id: "landing",
      label: "Landing Page",
    },
    {
      id: "portfolio",
      label: "Portfolio",
    },
    {
      id: "ecommerce",
      label: "E-Commerce",
    },
    {
      id: "dashboard",
      label: "Dashboard",
    },
    {
      id: "agency",
      label: "Agency",
    },
    {
      id: "blog",
      label: "Blog",
    },
  ],

  filters: [
    {
      title: "Category",
      options: [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Landing",
          value: "landing",
        },
        {
          label: "Portfolio",
          value: "portfolio",
        },
        {
          label: "E-Commerce",
          value: "ecommerce",
        },
        {
          label: "Dashboard",
          value: "dashboard",
        },
      ],
    },

    {
      title: "Price",
      options: [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Free",
          value: "free",
        },
        {
          label: "Paid",
          value: "paid",
        },
      ],
    },

    {
      title: "Sort",
      options: [
        {
          label: "Newest",
          value: "newest",
        },
        {
          label: "Popular",
          value: "popular",
        },
        {
          label: "Highest Rated",
          value: "rating",
        },
        {
          label: "Price: Low → High",
          value: "price-asc",
        },
        {
          label: "Price: High → Low",
          value: "price-desc",
        },
      ],
    },
  ],
};