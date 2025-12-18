import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

type FolderProps = React.HTMLAttributes<HTMLButtonElement> & {
  enabled: boolean;
  // children: React.ReactNode;
  // className?: string;
  // onClick?: () => void;
};
export const Folder = ({
  enabled,
  children,
  className,
  onClick,
  ...props
}: FolderProps) => {
  return (
    <button className={className} onClick={onClick} {...props} style={{ cursor: 'pointer' }}>
      {content(enabled)}
      {children}
    </button>
  );
};

function content(enabled: boolean) {
  if (enabled)
    return (
      <span>
        <FontAwesomeIcon icon={faAngleDown} />{" "}
        <FontAwesomeIcon icon={faFolder} color="orange" />{" "}
      </span>
    );
  else
    return (
      <span>
        <FontAwesomeIcon icon={faAngleRight} />{" "}
        <FontAwesomeIcon icon={faFolder} color="orange" />{" "}
      </span>
    );
}
