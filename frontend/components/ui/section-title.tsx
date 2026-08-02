import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-14 text-center", className)}>
      <h2 className="text-4xl font-bold tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}