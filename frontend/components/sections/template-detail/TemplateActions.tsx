import type { Template } from "@/types/template/template";

import WishlistButton from "./actions/WishlistButton";
import ShareButton from "./actions/ShareButton";
import CopyLinkButton from "./actions/CopyLinkButton";
import CompareButton from "./actions/CompareButton";
import SaveLaterButton from "./actions/SaveLaterButton";
import ReportButton from "./actions/ReportButton";

interface TemplateActionsProps {
  template: Template;
}

export default function TemplateActions({
  template,
}: TemplateActionsProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">
        Actions
      </h2>

      <div className="grid gap-3 md:grid-cols-3">
        <WishlistButton />

        <ShareButton />

        <CopyLinkButton />

        <CompareButton />

        <SaveLaterButton />

        <ReportButton />
      </div>
    </section>
  );
}