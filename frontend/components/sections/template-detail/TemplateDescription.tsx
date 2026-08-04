import type { TemplateDetailProps } from "./types";

import Overview from "./description/Overview";
import Features from "./description/Features";
import Installation from "./description/Installation";
import Requirements from "./description/Requirements";
import Changelog from "./description/Changelog";

export default function TemplateDescription({
  template,
}: TemplateDetailProps) {
  return (
    <div className="space-y-8">
      <Overview template={template} />

      <Features />

      <Installation />

      <Requirements />

      <Changelog />
    </div>
  );
}