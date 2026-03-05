"use client";

import styles from "../../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname().split("/").at(-1);

  const faHTMLIcon = faHtml5 as IconProp;

  return (
    <div className={styles.header}>
      <div className={styles.file}>
        <FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-html-icon)" />{" "}
        {pathname}.{pathname == "about" ? "json" : "html"}
      </div>
    </div>
  );
}
