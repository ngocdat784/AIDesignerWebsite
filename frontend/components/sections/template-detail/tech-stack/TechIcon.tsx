import {
  Code2,
  Database,
  Globe,
  Server,
  Layers3,
} from "lucide-react";

interface Props {
  name: string;
}

export default function TechIcon({
  name,
}: Props) {
  switch (name.toLowerCase()) {
    case "react":
      return <Code2 className="h-4 w-4" />;

    case "next.js":
      return <Globe className="h-4 w-4" />;

    case "typescript":
      return <Code2 className="h-4 w-4" />;

    case "tailwind css":
      return <Layers3 className="h-4 w-4" />;

    case "prisma":
      return <Database className="h-4 w-4" />;

    case "node.js":
      return <Server className="h-4 w-4" />;

    default:
      return <Code2 className="h-4 w-4" />;
  }
}