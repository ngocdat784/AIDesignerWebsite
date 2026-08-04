import { ReactNode } from "react";

interface StatItemProps {
  icon: ReactNode;
  value: string | number;
  label: string;
}

export default function StatItem({
  icon,
  value,
  label,
}: StatItemProps) {
  return (
    <div className="rounded-2xl border bg-card p-5 transition-all hover:shadow-md">

      <div className="mb-3 flex items-center gap-2 text-primary">

        {icon}

      </div>

      <div className="text-2xl font-bold">

        {value}

      </div>

      <div className="mt-1 text-sm text-muted-foreground">

        {label}

      </div>

    </div>
  );
}