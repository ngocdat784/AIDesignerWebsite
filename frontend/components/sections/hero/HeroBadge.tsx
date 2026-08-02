import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-secondary px-4 py-2 text-sm font-medium">
      <Sparkles className="h-4 w-4" />
      AI Powered Website Builder
    </div>
  );
}