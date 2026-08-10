import { MarketplaceData } from "./types";

export const marketplaceData: MarketplaceData = {
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
      count: 12,
    },
    {
      id: "featured",
      label: "Featured",
      count: 5,
    },
    {
      id: "new",
      label: "New",
      count: 3,
    },
    {
      id: "popular",
      label: "Popular",
      count: 7,
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
        { label: "All", value: "all" },
        { label: "Landing", value: "landing" },
        { label: "Portfolio", value: "portfolio" },
        { label: "E-Commerce", value: "ecommerce" },
        { label: "Dashboard", value: "dashboard" },
      ],
    },
    {
      title: "Price",
      options: [
        { label: "All", value: "all" },
        { label: "Free", value: "free" },
        { label: "Paid", value: "paid" },
      ],
    },
    {
      title: "Sort",
      options: [
        { label: "Newest", value: "newest" },
        { label: "Popular", value: "popular" },
        { label: "Highest Rated", value: "rating" },
        { label: "Price: Low → High", value: "price-asc" },
        { label: "Price: High → Low", value: "price-desc" },
      ],
    },
  ],

  templates: [
  {
    id: "1",
    slug: "modern-saas",
    title: "Modern SaaS",
    description:
      "Professional SaaS landing page built with Next.js and Tailwind CSS.",
    thumbnail: "/images/templates/template-1.webp",
    category: "landing",
    tags: ["AI", "SaaS", "Startup"],
    authorId: "user-1",
    author: {
      name: "John Carter",
      avatar: "/images/avatars/avatar-1.webp",
      verified: true,
    },
    badge: {
      text: "Featured",
    },
    rating: 4.9,
    reviews: 218,
    downloads: 1542,
    price: 29,
    originalPrice: 39,
    featured: true,
  },

  {
    id: "2",
    slug: "creative-portfolio",
    title: "Creative Portfolio",
    description:
      "Minimal portfolio template for designers and developers.",
    thumbnail: "/images/templates/template-2.webp",
    category: "portfolio",
    tags: ["Portfolio"],
    authorId: "user-2",
    author: {
      name: "Sophia",
      avatar: "/images/avatars/avatar-2.webp",
    },
    rating: 4.8,
    reviews: 162,
    downloads: 987,
    price: 29,
  },

  {
    id: "3",
    slug: "ecommerce-pro",
    title: "E-Commerce Pro",
    description:
      "Complete online store with product pages and checkout.",
    thumbnail: "/images/templates/template-3.webp",
    category: "ecommerce",
    tags: ["Shop"],
    authorId: "user-3",
    author: {
      name: "Michael",
      avatar: "/images/avatars/avatar-3.webp",
      verified: true,
    },
    badge: {
      text: "Best Seller",
    },
    rating: 5,
    reviews: 401,
    downloads: 2860,
    price: 49,
    originalPrice: 59,
    featured: true,
  },

  {
    id: "4",
    slug: "startup-dashboard",
    title: "Startup Dashboard",
    description:
      "Modern analytics dashboard with beautiful charts.",
    thumbnail: "/images/templates/template-4.webp",
    category: "dashboard",
    tags: ["Dashboard"],
    authorId: "user-4",
    author: {
      name: "Emma",
      avatar: "/images/avatars/avatar-4.webp",
    },
    rating: 4.7,
    reviews: 133,
    downloads: 924,
    price: 39,
    newest: true,
  },

  {
    id: "5",
    slug: "agency-studio",
    title: "Agency Studio",
    description:
      "Clean agency website with service showcase.",
    thumbnail: "/images/templates/template-5.webp",
    category: "agency",
    tags: ["Agency"],
    authorId: "user-5",
    author: {
      name: "Olivia",
      avatar: "/images/avatars/avatar-5.webp",
    },
    rating: 4.9,
    reviews: 188,
    downloads: 1760,
    price: 35,
    featured: true,
  },

  {
    id: "6",
    slug: "ai-blog",
    title: "AI Blog",
    description:
      "Modern blogging template optimized for SEO.",
    thumbnail: "/images/templates/template-6.webp",
    category: "blog",
    tags: ["Blog"],
    authorId: "user-6",
    author: {
      name: "Lucas",
      avatar: "/images/avatars/avatar-6.webp",
    },
    rating: 4.6,
    reviews: 97,
    downloads: 640,
    price: 19,
    newest: true,
  },

  {
    id: "7",
    slug: "crypto-landing",
    title: "Crypto Landing",
    description:
      "Landing page for blockchain and crypto startups.",
    thumbnail: "/images/templates/template-7.webp",
    category: "landing",
    tags: ["Crypto"],
    authorId: "user-7",
    author: {
      name: "Daniel",
      avatar: "/images/avatars/avatar-7.webp",
    },
    rating: 4.8,
    reviews: 124,
    downloads: 1132,
    price: 39,
  },

  {
    id: "8",
    slug: "personal-resume",
    title: "Personal Resume",
    description:
      "Elegant personal CV and resume website.",
    thumbnail: "/images/templates/template-8.webp",
    category: "portfolio",
    tags: ["Resume"],
    authorId: "user-8",
    author: {
      name: "Anna",
      avatar: "/images/avatars/avatar-8.webp",
    },
    rating: 4.9,
    reviews: 276,
    downloads: 2310,
    price: 24,
  },

  {
    id: "9",
    slug: "restaurant-ui",
    title: "Restaurant UI",
    description:
      "Beautiful restaurant booking website.",
    thumbnail: "/images/templates/template-9.webp",
    category: "landing",
    tags: ["Food"],
    authorId: "user-9",
    author: {
      name: "James",
      avatar: "/images/avatars/avatar-9.webp",
    },
    rating: 4.7,
    reviews: 149,
    downloads: 1088,
    price: 34,
  },

  {
    id: "10",
    slug: "fitness-club",
    title: "Fitness Club",
    description:
      "Gym & fitness landing page with booking features.",
    thumbnail: "/images/templates/template-10.webp",
    category: "landing",
    tags: ["Fitness"],
    authorId: "user-10",
    author: {
      name: "Sophia",
      avatar: "/images/avatars/avatar-10.webp",
    },
    rating: 4.8,
    reviews: 189,
    downloads: 1623,
    price: 27,
  },

  {
    id: "11",
    slug: "travel-agency",
    title: "Travel Agency",
    description:
      "Travel booking and destination showcase.",
    thumbnail: "/images/templates/template-11.webp",
    category: "agency",
    tags: ["Travel"],
    authorId: "user-11",
    author: {
      name: "Henry",
      avatar: "/images/avatars/avatar-11.webp",
    },
    rating: 4.7,
    reviews: 142,
    downloads: 1004,
    price: 31,
  },

  {
    id: "12",
    slug: "medical-clinic",
    title: "Medical Clinic",
    description:
      "Professional healthcare and clinic website.",
    thumbnail: "/images/templates/template-12.webp",
    category: "landing",
    tags: ["Medical"],
    authorId: "user-12",
    author: {
      name: "Emily",
      avatar: "/images/avatars/avatar-12.webp",
    },
    rating: 4.9,
    reviews: 214,
    downloads: 1845,
    price: 36,
    featured: true,
  },
]
};