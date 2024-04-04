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

          {/* Home Page */}
          <div className={`${styles.item} ${styles.selected}`}>
            <Link href="/">
              <a>
                <span><FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-icon)" /><p>{" "} index.html</p></span>
              </a>
            </Link>
          </div>
        
          {/* About Page */}

          <div className={styles.item}>
            <Link href="/about">
              <a>
                <span><FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-icon)" /><p>{" "} about.html</p></span>
              </a>
            </Link>
          </div>

          {/* Gallery Page */}

          <div className={styles.item}>
            <Link href="/gallery">
              <a>
                <span><FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-icon)" /><p>{" "} gallery.html</p></span>
              </a>
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
      return <div className={styles.explorer}><p>Something went wrong...</p></div>;
  }
};

export default Explorer;
