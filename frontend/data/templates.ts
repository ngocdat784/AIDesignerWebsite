import { Template } from "@/types/template/template";

export const templates: Template[] = [
  {
    id: "1",

    slug: "modern-saas",

    title: "Modern SaaS",

    description:
      "Professional SaaS Landing Page built with Next.js and Tailwind CSS. Suitable for startups, AI products and software companies.",

    thumbnail:
      "/templates/modern-saas/thumb.jpg",

    coverImage:
      "/templates/modern-saas/cover.jpg",

    gallery: [
      "/templates/modern-saas/1.jpg",
      "/templates/modern-saas/2.jpg",
      "/templates/modern-saas/3.jpg",
      "/templates/modern-saas/4.jpg",
    ],

    category: "Landing Page",

    tags: [
      "AI",
      "SaaS",
      "Startup",
      "Next.js",
      "React",
      "Tailwind CSS",
    ],
    relatedTemplateIds: [
  "2",
  "3",
],

status: "published",

    price: 39,

    discountPrice: 29,

    rating: 4.9,

    reviewCount: 218,

    downloads: 1542,

    favorites: 536,

    views: 18452,

    author: {
      id: "u1",
      name: "AI Studio",
      avatar: "/avatars/default.png",
    },

    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
    ],

    includedFiles: [
      {
        name: "Source Code",
        type: "folder",
      },
      {
        name: "Components",
        type: "folder",
      },
      {
        name: "Assets",
        type: "folder",
      },
      {
        name: "Figma Design",
        type: "folder",
      },
      {
        name: "Documentation.pdf",
        type: "file",
      },
      {
        name: "License.txt",
        type: "file",
      },
    ],

    features: [
      "Responsive Design",
      "Dark Mode",
      "SEO Optimized",
      "Authentication Pages",
      "Dashboard UI",
      "Reusable Components",
    ],

    installationSteps: [
      "Download the template.",
      "Run npm install.",
      "Configure environment variables.",
      "Run npm run dev.",
    ],

    requirements: [
      "Node.js 20+",
      "Next.js 15",
      "React 19",
      "Tailwind CSS 4",
    ],

    changelog: [
      {
        version: "2.4.1",
        date: "2026-07-20",
        changes: [
          "Improved dashboard UI",
          "Added AI Builder page",
          "Performance optimization",
        ],
      },
      {
        version: "2.4.0",
        date: "2026-06-12",
        changes: [
          "New pricing section",
          "Updated Hero",
        ],
      },
    ],

    demoUrl:
      "https://modern-saas.vercel.app",

    license: "Commercial",

    version: "2.4.1",

    isFeatured: true,

    isPremium: true,

    createdAt: "2026-01-01",

    updatedAt: "2026-07-20",
  },

  {
    id: "2",

    slug: "creative-portfolio",

    title: "Creative Portfolio",

    description:
      "Modern portfolio template for designers, developers and freelancers.",

    thumbnail:
      "/templates/creative-portfolio/thumb.jpg",

    coverImage:
      "/templates/creative-portfolio/cover.jpg",

    gallery: [
      "/templates/creative-portfolio/1.jpg",
      "/templates/creative-portfolio/2.jpg",
      "/templates/creative-portfolio/3.jpg",
    ],

    category: "Portfolio",

    tags: [
      "Portfolio",
      "Creative",
      "React",
      "Tailwind CSS",
    ],
    relatedTemplateIds: [
  "1",
],

status: "published",

    price: 29,

    rating: 4.8,

    reviewCount: 162,

    downloads: 987,

    favorites: 342,

    views: 11356,

    author: {
      id: "u2",
      name: "Creative Labs",
      avatar: "/avatars/default.png",
    },

    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],

    includedFiles: [
      {
        name: "Source Code",
        type: "folder",
      },
      {
        name: "Assets",
        type: "folder",
      },
      {
        name: "Documentation.pdf",
        type: "file",
      },
    ],

    features: [
      "Portfolio Showcase",
      "Animated Sections",
      "Responsive Design",
      "Dark Mode",
    ],

    installationSteps: [
      "Download template.",
      "Install dependencies.",
      "Start development server.",
    ],

    requirements: [
      "Node.js 20+",
      "React 19",
      "Tailwind CSS 4",
    ],

    changelog: [
      {
        version: "1.8.0",
        date: "2026-07-10",
        changes: [
          "Added animation presets",
          "Improved gallery",
        ],
      },
    ],

    demoUrl:
      "https://creative-portfolio.vercel.app",

    license: "Personal",

    version: "1.8.0",

    isFeatured: true,

    isPremium: false,

    createdAt: "2026-02-10",

    updatedAt: "2026-07-10",
  },

  {
    id: "3",

    slug: "ecommerce-pro",

    title: "E-Commerce Pro",

    description:
      "Complete e-commerce UI kit with product pages, cart and checkout.",

    thumbnail:
      "/templates/ecommerce-pro/thumb.jpg",

    coverImage:
      "/templates/ecommerce-pro/cover.jpg",

    gallery: [
      "/templates/ecommerce-pro/1.jpg",
      "/templates/ecommerce-pro/2.jpg",
      "/templates/ecommerce-pro/3.jpg",
      "/templates/ecommerce-pro/4.jpg",
    ],

    category: "E-Commerce",

    tags: [
      "Shop",
      "E-Commerce",
      "Next.js",
      "Prisma",
    ],
    relatedTemplateIds: [
  "1",
],

status: "published",

    price: 59,

    discountPrice: 49,

    rating: 5,

    reviewCount: 401,

    downloads: 2860,

    favorites: 1150,

    views: 35892,

    author: {
      id: "u3",
      name: "Commerce Studio",
      avatar: "/avatars/default.png",
    },

    techStack: [
      "Next.js",
      "React",
      "Prisma",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
    ],

    includedFiles: [
      {
        name: "Source Code",
        type: "folder",
      },
      {
        name: "Database Schema",
        type: "folder",
      },
      {
        name: "API Collection",
        type: "folder",
      },
      {
        name: "Documentation.pdf",
        type: "file",
      },
      {
        name: "License.txt",
        type: "file",
      },
    ],

    features: [
      "Shopping Cart",
      "Checkout",
      "Authentication",
      "Admin Dashboard",
      "Responsive UI",
      "SEO Optimized",
    ],

    installationSteps: [
      "Install dependencies.",
      "Configure database.",
      "Run Prisma migration.",
      "Start application.",
    ],

    requirements: [
      "Node.js 20+",
      "PostgreSQL",
      "Prisma",
      "Next.js 15",
    ],

    changelog: [
      {
        version: "3.2.0",
        date: "2026-07-18",
        changes: [
          "Added Stripe checkout",
          "Improved cart performance",
          "New dashboard widgets",
        ],
      },
    ],

    demoUrl:
      "https://ecommerce-pro.vercel.app",

    license: "Commercial",

    version: "3.2.0",

    isFeatured: true,

    isPremium: true,

    createdAt: "2026-03-05",

    updatedAt: "2026-07-18",
  },
];