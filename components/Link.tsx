import styles from "../styles/Link.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface LinkProps {
  text: string;
  href: string;
  target?: string;
}

export const Link = ({ href: link, text, target }: LinkProps) => {
  return (
    <a href={link} target={target}>
      {<FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />} {text}
    </a>
  );
};
