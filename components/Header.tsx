"use client";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// const sidebar = document.getElementById('sidebar')
// sidebar?.style.

interface HeaderProps {
  file?: string;
}

const Header = ({ file }: HeaderProps) => {
  const faHTMLIcon = faHtml5 as IconProp;

  return (
    <div className={styles.header}>
      <div className={styles.file}>
        <FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-icon)" /> {file}
      </div>
    </div>
  );
};

export default Header;
