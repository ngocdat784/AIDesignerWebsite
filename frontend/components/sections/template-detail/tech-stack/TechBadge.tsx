import { Badge } from "@/components/ui/badge";

import TechIcon from "./TechIcon";

interface Props {
  tech: string;
}

export default function TechBadge({
  tech,
}: Props) {
  return (
    <Badge
      variant="secondary"
      className="gap-2 px-3 py-2"
    >
      <TechIcon name={tech} />

      {tech}
    </Badge>
  );
}