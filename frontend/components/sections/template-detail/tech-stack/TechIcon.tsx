import {
  Code2,
  Database,
  Globe,
  Server,
  Layers3,
  Braces,
  Terminal,
  Cpu,
  Cloud,
  Boxes,
} from "lucide-react";

interface Props {
  name: string;
}

export default function TechIcon({
  name,
}: Props) {
  const normalizedName = name
    .trim()
    .toLowerCase();

  const iconClass = `
    h-4
    w-4
    transition-all
    duration-300
  `;

  switch (normalizedName) {
    // Frontend
    case "react":
      return (
        <Code2
          className={`${iconClass} text-cyan-500`}
        />
      );

    case "next.js":
    case "nextjs":
      return (
        <Globe
          className={`${iconClass} text-slate-900`}
        />
      );

    case "typescript":
      return (
        <Braces
          className={`${iconClass} text-blue-600`}
        />
      );

    case "javascript":
    case "js":
      return (
        <Braces
          className={`${iconClass} text-yellow-500`}
        />
      );

    case "tailwind css":
    case "tailwind":
      return (
        <Layers3
          className={`${iconClass} text-cyan-500`}
        />
      );

    case "vue":
    case "vue.js":
      return (
        <Layers3
          className={`${iconClass} text-emerald-500`}
        />
      );

    case "angular":
      return (
        <Layers3
          className={`${iconClass} text-red-500`}
        />
      );

    // Backend
    case "node.js":
    case "nodejs":
      return (
        <Server
          className={`${iconClass} text-green-600`}
        />
      );

    case "express":
    case "express.js":
      return (
        <Server
          className={`${iconClass} text-slate-700`}
        />
      );

    case "python":
      return (
        <Terminal
          className={`${iconClass} text-blue-500`}
        />
      );

    case "php":
      return (
        <Code2
          className={`${iconClass} text-indigo-500`}
        />
      );

    case "laravel":
      return (
        <Server
          className={`${iconClass} text-red-500`}
        />
      );

    // Database
    case "prisma":
      return (
        <Database
          className={`${iconClass} text-teal-600`}
        />
      );

    case "mysql":
      return (
        <Database
          className={`${iconClass} text-blue-600`}
        />
      );

    case "postgresql":
    case "postgres":
      return (
        <Database
          className={`${iconClass} text-blue-700`}
        />
      );

    case "mongodb":
      return (
        <Database
          className={`${iconClass} text-green-600`}
        />
      );

    case "redis":
      return (
        <Database
          className={`${iconClass} text-red-500`}
        />
      );

    // Cloud / Infrastructure
    case "aws":
      return (
        <Cloud
          className={`${iconClass} text-orange-500`}
        />
      );

    case "docker":
      return (
        <Boxes
          className={`${iconClass} text-blue-500`}
        />
      );

    case "kubernetes":
      return (
        <Boxes
          className={`${iconClass} text-blue-600`}
        />
      );

    // Generic
    default:
      return (
        <Code2
          className={`${iconClass} text-slate-500`}
        />
      );
  }
}