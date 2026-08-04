import {
  FileText,
  Folder,
} from "lucide-react";

interface Props {
  type: "folder" | "file";
}

export default function FileIcon({
  type,
}: Props) {
  if (type === "folder") {
    return (
      <Folder className="h-5 w-5 text-amber-500" />
    );
  }

  return (
    <FileText className="h-5 w-5 text-sky-500" />
  );
}