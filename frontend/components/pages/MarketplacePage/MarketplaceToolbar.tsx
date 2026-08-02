import { Input } from "@/components/ui/input";

export default function MarketplaceToolbar() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Input
        placeholder="Search templates..."
      />

      <Input
        placeholder="Sort"
      />
    </div>
  );
}