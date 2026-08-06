import type { LucideIcon } from "lucide-react";

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;

  badge?: string;

  href?: string;

  highlight?: boolean;
}

export interface FeaturesHeader {
  badge?: string;

  title: string;

  highlight?: string;

  description: string;
}

export interface FeaturesData {
  header: FeaturesHeader;

  features: FeatureItem[];
}