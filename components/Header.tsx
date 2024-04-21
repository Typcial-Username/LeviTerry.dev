import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";


interface HeaderProps {
  file?: string;
  extension: string;
}

const Header = ({ file, extension }: HeaderProps) => {
  const faHTMLIcon = faHtml5 as IconProp;

  return (
    <div className={styles.header}>
      <div className={styles.file}>
        <FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-html-icon)" />{" "}
        {file}.{extension}
      </div>
    </div>
  );
};

export default Header;
