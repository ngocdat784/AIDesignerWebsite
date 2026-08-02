import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-bold">
        AI
      </div>

      <div>
        <p className="text-lg font-bold">
          AI Designer
        </p>

        <p className="text-xs text-gray-500">
          Website Builder
        </p>
      </div>
    </Link>
  );
}