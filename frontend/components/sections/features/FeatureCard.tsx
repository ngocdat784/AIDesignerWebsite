import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <Card className="group h-full rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-8">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-7 w-7" />
        </div>

        <h3 className="mb-3 text-xl font-semibold">
          {title}
        </h3>

        <p className="text-muted-foreground leading-7">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}