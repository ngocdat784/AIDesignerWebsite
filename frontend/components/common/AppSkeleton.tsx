import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AppSkeletonProps {
  className?: string;
}

function AppSkeleton({
  className,
}: AppSkeletonProps) {
  return (
    <Skeleton
      className={cn(
        "animate-pulse rounded-2xl",
        className
      )}
    />
  );
}

/* ---------- Card ---------- */

function Card() {
  return (
    <div className="space-y-4">
      <AppSkeleton className="h-60 w-full rounded-3xl" />

      <div className="space-y-3">
        <AppSkeleton className="h-6 w-3/4" />

        <AppSkeleton className="h-4 w-full" />

        <AppSkeleton className="h-4 w-2/3" />
      </div>

      <div className="flex items-center justify-between">
        <AppSkeleton className="h-5 w-24" />

        <AppSkeleton className="h-8 w-20 rounded-xl" />
      </div>
    </div>
  );
}

/* ---------- Avatar ---------- */

function Avatar() {
  return (
    <AppSkeleton className="h-12 w-12 rounded-full" />
  );
}

/* ---------- Button ---------- */

function Button() {
  return (
    <AppSkeleton className="h-11 w-36 rounded-xl" />
  );
}

/* ---------- Text ---------- */

interface TextProps {
  lines?: number;
}

function Text({
  lines = 3,
}: TextProps) {
  return (
    <div className="space-y-2">
      {Array.from({
        length: lines,
      }).map((_, index) => (
        <AppSkeleton
          key={index}
          className={cn(
            "h-4",
            index === lines - 1
              ? "w-2/3"
              : "w-full"
          )}
        />
      ))}
    </div>
  );
}

/* ---------- Circle ---------- */

function Circle() {
  return (
    <AppSkeleton className="h-16 w-16 rounded-full" />
  );
}

/* ---------- Export ---------- */

AppSkeleton.Card = Card;

AppSkeleton.Avatar = Avatar;

AppSkeleton.Button = Button;

AppSkeleton.Text = Text;

AppSkeleton.Circle = Circle;

export default AppSkeleton;