import React from "react";
import styles from "../styles/Explorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { Link } from "./Link";

interface ExplorerProps {
  enabled: boolean;
  showing: string;
}

export const Explorer = ({ enabled, showing }: ExplorerProps) => {
  const faHTMLIcon = faHtml5 as IconProp;

  switch (showing) {
    case "files":
      return (
        <div
          className={styles.explorer}
          style={{ display: `${enabled ? "block" : "none"}` }}
        >
          <p className={styles.header}>Explorer</p>
          <p className={styles.content}>localhost</p>

          <div className={styles.item}>
            <FontAwesomeIcon
              icon={faHTMLIcon}
              color="var(--clr-icon)"
              size="lg"
            />{" "}
            <a href="/">index.html</a>
          </div>

          <div className={styles.item}>
            <FontAwesomeIcon
              icon={faHTMLIcon}
              color="var(--clr-icon)"
              size="lg"
            />{" "}
            <a href="about">about.html</a>
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
          <p className={styles.content}>localhost</p>

          <div className="item">
            <FontAwesomeIcon icon={faDownload} color="var(--clr-icon)" />{" "}
            <a href="#">Resume</a>
          </div>
        </div>
      );

    default:
      return <div className="explorer"></div>;
  }
};
