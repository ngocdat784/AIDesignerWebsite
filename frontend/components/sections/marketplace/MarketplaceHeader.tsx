import AppButton from "@/components/common/AppButton";

export default function MarketplaceHeader() {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-3xl font-bold">
          Marketplace
        </h2>

        <p className="mt-2 text-muted-foreground">
          Browse the latest AI-ready website templates.
        </p>
      </div>

      <AppButton variant="outline">
        View All
      </AppButton>
    </div>
  );
}