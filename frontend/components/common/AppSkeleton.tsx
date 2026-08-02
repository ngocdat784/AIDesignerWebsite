import { Skeleton } from "@/components/ui/skeleton";

export default function AppSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-60 rounded-2xl" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}