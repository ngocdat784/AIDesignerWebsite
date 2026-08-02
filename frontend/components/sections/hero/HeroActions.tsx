import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroActions() {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <Button size="lg" className="rounded-xl px-8">
        Start Building
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <Button variant="outline" size="lg" className="rounded-xl px-8">
        Explore Templates
      </Button>
    </div>
  );
}