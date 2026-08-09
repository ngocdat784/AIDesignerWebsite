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
      {/* Main Footer */}
      <div
        className="
          w-full
          px-8
          py-16
          lg:px-10
          lg:py-20
        "
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Main Content */}
        <div
          className="
            grid
            items-start
            lg:grid-cols-12
          "
        >
          {/* Brand + Social */}
          <div
            className="
              min-w-0
              lg:col-span-4
            "
          >
            <FooterBrand />

            <div
              style={{
                marginTop: "24px",
              }}
            >
              <FooterSocial />
            </div>
          </div>

          {/* Product / Resources / Company / Legal */}
          <div
            className="
              min-w-0
              grid-cols-2
              lg:col-span-5
            "
            style={{
              marginLeft: "40px",
              display: "grid",
              columnGap: "56px",
              rowGap: "48px",
            }}
          >
            {footerData.sections.map((section) => (
              <FooterLinks
                key={section.title}
                section={section}
              />
            ))}
          </div>

          {/* Newsletter */}
          <div
            className="
              min-w-0
              lg:col-span-3
            "
            style={{
              marginLeft: "40px",
            }}
          >
            <FooterNewsletter />
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            border-t
            pt-6
          "
          style={{
            marginTop: "64px",
          }}
        >
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}