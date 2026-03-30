import React from "react";
import {
  FolderOpenIcon,
  FolderClosedIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react";

type FolderProps = React.HTMLAttributes<HTMLButtonElement> & {
  enabled: boolean;
};
export const Folder = ({
  enabled,
  children,
  className,
  onClick,
  style,
  ...props
}: FolderProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{ cursor: "pointer", ...style }}
      {...props}
    >
      {content(enabled)}
      {children}
    </button>
  );
};

function content(enabled: boolean) {
  if (enabled)
    return (
      <span className="flex gap-1">
        <ChevronDownIcon size={16} />
        <FolderOpenIcon color="orange" size={16} />
      </span>
    );
  else
    return (
      <span className="flex gap-1">
        <ChevronRightIcon size={16} />
        <FolderClosedIcon color="orange" size={16} />
      </span>
    );
}
