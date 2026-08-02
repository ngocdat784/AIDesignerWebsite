import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AppAvatarProps {
  src: string;
  name: string;
}

export default function AppAvatar({
  src,
  name,
}: AppAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
}