import {
  Download,
  Eye,
  Heart,
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
          icon={<Star className="fill-yellow-400 text-yellow-400" />}
          value={`${template.rating} (${template.reviewCount})`}
          label="Reviews"
        />

        <StatItem
          icon={<Download />}
          value={formatCompactNumber(template.downloads)}
          label="Downloads"
        />

        <StatItem
          icon={<Eye />}
          value={formatCompactNumber(template.views)}
          label="Views"
        />

        <StatItem
          icon={<Heart />}
          value={formatCompactNumber(template.favorites)}
          label="Favorites"
        />

        <StatItem
          icon={<Calendar />}
          value={template.updatedAt}
          label="Updated"
        />

        <StatItem
          icon={<BadgeInfo />}
          value={template.version}
          label="Version"
        />

      </div>

    </section>
  );
}