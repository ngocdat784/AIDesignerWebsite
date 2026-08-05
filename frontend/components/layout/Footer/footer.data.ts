import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

import type { FooterData } from "./types";

export const footerData: FooterData = {
  brand: {
  name: "AI Designer",

  subtitle: "Premium Marketplace",

  description:
    "Build AI-powered websites faster with premium templates, drag & drop editing and powerful design tools.",

  badge: "Powered by AI",
},

  sections: [
    {
      title: "Product",
      links: [
        {
          title: "Marketplace",
          href: "/marketplace",
        },
        {
          title: "Templates",
          href: "/templates",
        },
        {
          title: "AI Builder",
          href: "/builder",
        },
        {
          title: "Pricing",
          href: "/pricing",
        },
      ],
    },

    {
      title: "Resources",
      links: [
        {
          title: "Documentation",
          href: "/docs",
        },
        {
          title: "Blog",
          href: "/blog",
        },
        {
          title: "Help Center",
          href: "/help",
        },
        {
          title: "Roadmap",
          href: "/roadmap",
        },
      ],
    },

    {
      title: "Company",
      links: [
        {
          title: "About Us",
          href: "/about",
        },
        {
          title: "Careers",
          href: "/careers",
        },
        {
          title: "Contact",
          href: "/contact",
        },
        {
          title: "Partners",
          href: "/partners",
        },
      ],
    },

    {
      title: "Legal",
      links: [
        {
          title: "Privacy Policy",
          href: "/privacy",
        },
        {
          title: "Terms of Service",
          href: "/terms",
        },
        {
          title: "Cookie Policy",
          href: "/cookies",
        },
        {
          title: "License",
          href: "/license",
        },
      ],
    },
  ],

  socials: [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebook,
  },
  {
    name: "X",
    href: "https://x.com",
    icon: FaXTwitter,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: FaGithub,
  },
],

  newsletter: {
    title: "Stay Updated",
    description:
      "Receive the latest templates, AI features and exclusive offers every week.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },

  bottom: {
    copyright: "© 2026 AI Designer. All rights reserved.",

    links: [
      {
        title: "Privacy",
        href: "/privacy",
      },
      {
        title: "Terms",
        href: "/terms",
      },
      {
        title: "Cookies",
        href: "/cookies",
      },
    ],
  },

  paymentMethods: [
    {
      name: "Visa",
      image: "/images/payments/visa.svg",
    },
    {
      name: "MasterCard",
      image: "/images/payments/mastercard.svg",
    },
    {
      name: "PayPal",
      image: "/images/payments/paypal.svg",
    },
    {
      name: "Stripe",
      image: "/images/payments/stripe.svg",
    },
  ],

  appDownloads: [
    {
      name: "App Store",
      image: "/images/store/app-store.svg",
      href: "#",
    },
    {
      name: "Google Play",
      image: "/images/store/google-play.svg",
      href: "#",
    },
  ],
};