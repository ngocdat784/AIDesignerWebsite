import {
  Download,
  Star,
  Calendar,
  BadgeInfo,
} from "lucide-react";

import type { TemplateDetailProps } from "./types";

import StatItem from "@/components/common/StatItem";

import { formatCompactNumber } from "@/lib/utils/number";

export default function TemplateStatistics({
  template,
}: TemplateDetailProps) {
  return (
    <section>
      <div className="grid gap-5 md:grid-cols-3">

        <StatItem
          icon={
            <Star className="fill-yellow-400 text-yellow-400" />
          }
          value={`${template.rating ?? 0} (${template.reviews ?? 0})`}
          label="Reviews"
        />

        <StatItem
          icon={<Download />}
          value={formatCompactNumber(
            template.downloads ?? 0,
          )}
          label="Downloads"
        />

        <StatItem
          icon={<Calendar />}
          value={
            template.updatedAt ??
            "Unknown"
          }
          label="Updated"
        />

        <StatItem
          icon={<BadgeInfo />}
          value={
            template.license ??
            "Standard"
          }
          label="License"
        />

      </div>
    </section>
  );
}