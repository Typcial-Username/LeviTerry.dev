import React, { useEffect } from "react";
import styles from "../styles/Explorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faDownload, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/router";

// import { Link } from "./Link";

interface ExplorerProps {
  enabled: boolean;
  showing: string;
}

const Explorer = ({ enabled, showing }: ExplorerProps) => {
  const [host, setHost] = React.useState("localhost");
  const router = useRouter();

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  const faHTMLIcon = faHtml5 as IconProp;

  switch (showing) {
    case "files":
      return (
        <div
          className={styles.explorer}
          style={{ display: `${enabled ? "block" : "none"}` }}
        >
          <p className={styles.header}>Explorer</p>
          <p className={styles.content}>
            {" "}
            <FontAwesomeIcon icon={faAngleDown} /> {host}{" "}
          </p>

          <div className={`${styles.item} ${styles.selected}`}>
            <Link href="/">
              <FontAwesomeIcon
                icon={faHTMLIcon}
                color="var(--clr-icon)"
                size="lg"
              />{" "}
              index.html
            </Link>
          </div>

          <div className={styles.item}>
            <Link href="/about">
              <FontAwesomeIcon
                icon={faHTMLIcon}
                color="var(--clr-icon)"
                size="lg"
              />{" "}
              about.html
            </Link>
          </div>

          <div className={styles.item}>
            <Link href="/gallery">
              <FontAwesomeIcon
                icon={faHTMLIcon}
                color="var(--clr-icon)"
                size="lg"
              />{" "}
              gallery.html
            </Link>
          </div>
        </div>
      );

    case "docs":
      return (
        <div
          className={styles.explorer}
          style={{ display: `${enabled ? "block" : "none"}` }}
        >
          <p className={styles.header}>Explorer</p>
          <p className={styles.content}>
            <p className={styles.content}>
              {" "}
              <FontAwesomeIcon icon={faAngleDown} /> {host}{" "}
            </p>
          </p>

          <div className={styles.item}>
            <FontAwesomeIcon icon={faDownload} color="var(--clr-icon)" />{" "}
            <a href="../docs/Levi_Terry_Resume.pdf" download>
              Resume
            </a>
          </div>
        </div>
      );

    default:
      return <div className="explorer"></div>;
  }
};

export default Explorer;
