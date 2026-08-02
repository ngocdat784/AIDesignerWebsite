import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  reviewCount?: number;
}

export default function Rating({
  value,
  reviewCount,
}: RatingProps) {
  return (
    <div className="flex items-center gap-2">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

      <span>{value}</span>

      {reviewCount && (
        <span className="text-muted-foreground">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}