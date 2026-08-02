import AppButton from "@/components/common/AppButton";

export default function MarketplacePagination() {
  return (
    <div className="flex justify-center gap-3">
      <AppButton variant="outline">
        Previous
      </AppButton>

      <AppButton>
        Next
      </AppButton>
    </div>
  );
}