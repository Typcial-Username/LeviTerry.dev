"use client";
import React, { useEffect } from "react";
import styles from "../styles/Explorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDownload,
  faAngleDown,
  faAngleRight,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
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
  const faGithubIcon = faGithub as IconProp;
  const faLinkedinIcon = faLinkedin as IconProp;

  // switch (showing) {
  //   case "files":
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

      <div className={styles.item}>
        <FontAwesomeIcon icon={faAngleDown} />{" "}
        <FontAwesomeIcon icon={faFolder} color="orange" /> Pages
      </div>

      {/* Home Page */}
      <div
        className={`${styles.item} ${
          router.pathname == "/" ? styles.selected : null
        } ${styles.subMenu}`}
      >
        <Link href="/">
          {/* <a> */}
          <span>
            <FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-icon)" />
            <p style={{ display: "inline" }}> index.html</p>
          </span>
          {/* </a> */}
        </Link>
      </div>

      {/* About Page */}

      <div
        className={`${styles.item} ${
          router.pathname == "/about" ? styles.selected : null
        } ${styles.subMenu}`}
      >
        <Link href="/about">
          {/* <a> */}
          <span>
            <FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-icon)" />
            <p style={{ display: "inline" }}> about.html</p>
          </span>
          {/* </a> */}
        </Link>
      </div>

      {/* Gallery Page */}

      <div
        className={`${styles.item} ${
          router.pathname == "/gallery" ? styles.selected : null
        } ${styles.subMenu}`}
      >
        <Link href="/gallery">
          {/* <a> */}
          <span>
            <FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-icon)" />
            <p style={{ display: "inline" }}> gallery.html</p>
          </span>
          {/* </a> */}
        </Link>
      </div>

      <div className={styles.item}>
        <FontAwesomeIcon icon={faAngleDown} />{" "}
        <FontAwesomeIcon icon={faFolder} color="orange" /> Documents
      </div>

      <div className={`${styles.item} ${styles.subMenu}`}>
        <FontAwesomeIcon icon={faDownload} color="var(--clr-icon)" />{" "}
        <a href="/docs/Levi_Terry_Resume.pdf" download>
          Resume
        </a>
      </div>

      <div className={styles.item}>
        <FontAwesomeIcon icon={faAngleDown} />{" "}
        <FontAwesomeIcon icon={faFolder} color="orange" /> Socials
      </div>

      <div className={`${styles.item} ${styles.subMenu}`}>
        <a
          href="https://github.com/Typcial-Username"
          // className={styles.button}
          aria-label="Visit my GitHub profile"
          title="GitHub"
          target="_empty"
        >
          <FontAwesomeIcon icon={faGithubIcon} /> GitHub
        </a>
      </div>

      <div className={`${styles.item} ${styles.subMenu}`}>
        <a
          href="https://linkedin.com/in/levi-terry-dev/"
          // className={styles.button}
          aria-label="Visit my GitHub profile"
          title="Linkedin"
          target="_empty"
        >
          <FontAwesomeIcon icon={faLinkedinIcon} color="#0a66c2" /> LinkedIn
        </a>
      </div>
    </div>
  );

  // case "docs":
  //   return (
  //     <div
  //       className={styles.explorer}
  //       style={{ display: `${enabled ? "block" : "none"}` }}
  //     >
  //       <p className={styles.header}>Explorer</p>
  //       <p className={styles.content}>
  //         <p className={styles.content}>
  //           {" "}
  //           <FontAwesomeIcon icon={faAngleDown} /> {host}{" "}
  //         </p>
  //       </p>

  //     </div>
  //   );

  // case "socials":
  //   return (
  //     <div
  //       className={styles.explorer}
  //       style={{ display: `${enabled ? "block" : "none"}` }}
  //     >
  //       <p className={styles.header}>Explorer</p>
  //       <p className={styles.content}>
  //         <p className={styles.content}>
  //           {" "}
  //           <FontAwesomeIcon icon={faAngleDown} /> {host}{" "}
  //         </p>
  //       </p>

  // </div>
  // );

  //   default:
  //     return (
  //       <div className={styles.explorer}>
  //         <p>Something went wrong...</p>
  //       </div>
  //     );
  // }
};

export default Explorer;
