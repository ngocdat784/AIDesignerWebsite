const categories = [
  "All",
  "Landing Page",
  "Portfolio",
  "Dashboard",
  "Blog",
  "E-commerce",
  "Medical",
];

export default function MarketplaceSidebar() {
  return (
    <aside className="rounded-2xl border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Categories
      </h2>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            className="w-full rounded-xl px-4 py-3 text-left transition hover:bg-muted"
          >
            {category}
          </button>
        ))}
      </div>
    </aside>
  );
}