import {
  ShieldCheck,
  ShoppingCart,
  CreditCard,
  ExternalLink,
} from "lucide-react";

import AppButton from "@/components/common/AppButton";
import PriceTag from "@/components/common/PriceTag";

import type { TemplateDetailProps } from "./types";

export default function TemplatePriceCard({
  template,
}: TemplateDetailProps) {
  return (
    <aside className="rounded-3xl border bg-card p-6 shadow-sm">

      <div className="space-y-6">

        <PriceTag
          price={template.price}
          discountPrice={template.discountPrice}
        />

        <div className="space-y-3 text-sm text-muted-foreground">

          <div>Lifetime Updates</div>

          <div>Premium Support</div>

          <div>{template.license}</div>

        </div>

        <div className="space-y-3">

          <AppButton className="w-full">

            <CreditCard className="mr-2 h-4 w-4" />

            Buy Now

          </AppButton>

          <AppButton
            variant="outline"
            className="w-full"
          >

            <ShoppingCart className="mr-2 h-4 w-4" />

            Add to Cart

          </AppButton>

         <a
  href={template.demoUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  <AppButton
    variant="secondary"
    className="w-full"
  >
    <ExternalLink className="mr-2 h-4 w-4" />
    Live Demo
  </AppButton>
</a>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">

          <ShieldCheck className="h-4 w-4" />

          Secure payment. Instant download.

        </div>

      </div>

    </aside>
  );
}