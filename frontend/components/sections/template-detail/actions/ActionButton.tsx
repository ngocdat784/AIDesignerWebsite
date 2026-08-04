import { ReactNode } from "react";

import AppButton from "@/components/common/AppButton";

interface Props {
  icon: ReactNode;
  children: ReactNode;
  onClick?(): void;
}

export default function ActionButton({
  icon,
  children,
  onClick,
}: Props) {
  return (
    <AppButton
      variant="outline"
      className="flex-1"
      onClick={onClick}
    >
      {icon}

      <span className="ml-2">
        {children}
      </span>
    </AppButton>
  );
}