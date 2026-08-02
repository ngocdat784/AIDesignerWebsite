import Container from "@/components/ui/container";
import MarketplaceSidebar from "./MarketplaceSidebar";
import MarketplaceToolbar from "./MarketplaceToolbar";
import MarketplaceGrid from "./MarketplaceGrid";
import MarketplacePagination from "./MarketplacePagination";

export default function MarketplacePage() {
  return (
    <Container className="py-12">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <MarketplaceSidebar />

        <div className="space-y-8">
          <MarketplaceToolbar />

          <MarketplaceGrid />

          <MarketplacePagination />
        </div>
      </div>
    </Container>
  );
}