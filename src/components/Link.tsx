import styles from "../styles/Link.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type LinkProps = {
  text: string;
  href: string;
  target?: string;
} & React.HtmlHTMLAttributes<HTMLAnchorElement>;

export const Link = ({ href: link, text, target }: LinkProps) => {
  return (
    <a href={link} target={target}>
      {text} {<FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />}
    </a>
  );
};
