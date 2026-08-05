"use client";

import { cn } from "@/lib/utils";

import FooterBottom from "./FooterBottom";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";
import FooterSocial from "./FooterSocial";
import { footerData } from "./footer.data";

interface FooterProps {
  className?: string;
}

export default function Footer({
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t bg-background",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div
          className="
            grid
            gap-12
            lg:grid-cols-12
          "
        >
          {/* Brand */}

          <div className="space-y-6 lg:col-span-4">
            <FooterBrand />

            <FooterSocial />
          </div>

          {/* Links */}

          <div
  className="
    grid
    gap-10
    sm:grid-cols-2
    lg:col-span-5
  "
>
  {footerData.sections.map((section) => (
    <FooterLinks
      key={section.title}
      section={section}
    />
  ))}
</div>

          {/* Newsletter */}

          <div className="lg:col-span-3">
            <FooterNewsletter />
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-14">
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}