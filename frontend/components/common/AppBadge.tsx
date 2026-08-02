import { Badge } from "@/components/ui/badge";

interface AppBadgeProps {
  children: React.ReactNode;
}

export default function AppBadge({
  children,
}: AppBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="rounded-full px-4 py-2"
    >
      {children}
    </Badge>
  );
}