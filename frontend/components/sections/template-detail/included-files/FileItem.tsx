import FileIcon from "./FileIcon";

interface Props {
  name: string;
  type: "folder" | "file";
}

export default function FileItem({
  name,
  type,
}: Props) {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      rounded-xl
      border
      bg-card
      px-4
      py-3
      transition-colors
      hover:bg-muted
      "
    >
      <FileIcon type={type} />

      <span>{name}</span>
    </div>
  );
}