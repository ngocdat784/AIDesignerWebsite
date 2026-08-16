import MarketplacePage from "@/components/pages/MarketplacePage";
import { Suspense } from "react";
export default function Page() {
  return (
    <Suspense fallback={null}>
      <MarketplacePage />
    </Suspense>
  );
}