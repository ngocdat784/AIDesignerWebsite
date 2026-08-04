interface Props {
  label: string;
  value: string;
  bold?: boolean;
}

export default function CartSummaryRow({
  label,
  value,
  bold = false,
}: Props) {
  return (
    <div
      className={`flex items-center justify-between ${
        bold ? "text-lg font-semibold" : ""
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}