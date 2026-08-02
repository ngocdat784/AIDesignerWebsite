interface TagProps {
  label: string;
}

export default function Tag({
  label,
}: TagProps) {
  return (
    <span className="rounded-full bg-secondary px-3 py-1 text-xs">
      {label}
    </span>
  );
}