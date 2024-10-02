"use client";
import React, { useEffect } from "react";
import styles from "../styles/Explorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faGithub,
  faLinkedin,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDownload,
  faAngleDown,
  faFileCode,
  faAngleRight,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/router";
import { Folder } from "./Folder";

const Explorer = () => {
  const [headerOpen, setHeaderOpen] = React.useState(true);
  const [host, setHost] = React.useState("localhost");
  const router = useRouter();

  const [folderStates, setFolderStates] = React.useState({
    pages: true,
    docs: true,
    socials: true,
  });

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  const faHTMLIcon = faHtml5 as IconProp;
  const faGithubIcon = faGithub as IconProp;
  const faLinkedinIcon = faLinkedin as IconProp;
  const faStackOverflowIcon = faStackOverflow as IconProp;

  return (
    <div id="explorer" className={styles.explorer}>
      <p className={styles.header}>Explorer</p>
      <button
        className={`${styles.content} ${styles.item} ${styles.dropdown}`}
        onClick={() => setHeaderOpen(!headerOpen)}
      >
        <span>
          {headerOpen ? (
            <>
              <FontAwesomeIcon icon={faAngleDown} />{" "}
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faAngleRight} />{" "}
            </>
          )}
          {/* <FontAwesomeIcon icon={faAngleDown} />{" "} */}
          <p style={{ display: "inline-block" }}>{host}</p>
        </span>
      </button>

      <div
        style={
          headerOpen
            ? { display: "block", marginTop: "2.5%" }
            : { display: "none" }
        }
        className={`${styles.item} ${styles.dropdown}`}
      >
        <div>
          <Folder
            enabled={folderStates.pages}
            className={`${styles.item} ${styles.dropdown}`}
            onClick={() =>
              setFolderStates({ ...folderStates, pages: !folderStates.pages })
            }
          >
            Pages
          </Folder>

          {/* Home Page */}
          <div
            className={`${styles.item} ${
              router.pathname == "/" ? styles.selected : null
            } ${styles.subMenu}`}
            style={
              !folderStates.pages ? { display: "none" } : { display: "block" }
            }
          >
            <span>
              <FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-html-icon)" />{" "}
            </span>

            <Link href="/">
              <p style={{ display: "inline" }}>index.html</p>
            </Link>
          </div>

          {/* About Page */}
          <div
            className={`${styles.item} ${
              router.pathname == "/about" ? styles.selected : null
            } ${styles.subMenu}`}
            style={
              !folderStates.pages ? { display: "none" } : { display: "block" }
            }
          >
            <span>
              <FontAwesomeIcon icon={faFileCode} color="var(--clr-html-icon)" />{" "}
            </span>

            <Link href="/about">
              <p style={{ display: "inline" }}> about.json</p>
            </Link>
          </div>

          {/* Gallery Page */}
          <div
            className={`${styles.item} ${
              router.pathname == "/gallery" ? styles.selected : null
            } ${styles.subMenu}`}
            style={
              !folderStates.pages ? { display: "none" } : { display: "block" }
            }
          >
            <span>
              <FontAwesomeIcon icon={faHTMLIcon} color="var(--clr-html-icon)" />{" "}
            </span>
            <Link href="/gallery">
              <p style={{ display: "inline" }}> gallery.html</p>
            </Link>
          </div>
        </div>

        {/* <div>
          <Folder
            enabled={folderStates.docs}
            className={`${styles.item} ${styles.dropdown}`}
            onClick={() =>
              setFolderStates({ ...folderStates, docs: !folderStates.docs })
            }
          >
            Documents
          </Folder>

          <div
            className={`${styles.item} ${styles.subMenu}`}
            style={
              !folderStates.docs ? { display: "none" } : { display: "block" }
            }
          >
            <FontAwesomeIcon icon={faDownload} color="var(--clr-icon)" />{" "}
            <a href="/docs/Levi_Terry_Resume.pdf" download>
              Resume
            </a>
          </div>
        </div> */}

        <div>
          <Folder
            enabled={folderStates.socials}
            className={`${styles.item} ${styles.dropdown}`}
            onClick={() =>
              setFolderStates({
                ...folderStates,
                socials: !folderStates.socials,
              })
            }
          >
            Socials
          </Folder>
          {/* <button
            className={`${styles.item} ${styles.dropdown}`}
            id="socials-header"
            onClick={onSocialHeaderClick}
          >
            <FontAwesomeIcon icon={faAngleDown} />{" "}
            <FontAwesomeIcon icon={faFolder} color="orange" /> Socials
            <FontAwesomeIcon icon={faAngleRight} />{" "}
            <FontAwesomeIcon icon={faFolder} color="orange" /> Socials
          </button> */}

          <div
            className={`${styles.item} ${styles.subMenu}`}
            style={
              !folderStates.socials ? { display: "none" } : { display: "block" }
            }
          >
            <span>
              <FontAwesomeIcon icon={faGithubIcon} />{" "}
            </span>
            <a
              href="https://github.com/Typcial-Username"
              // className={styles.button}
              aria-label="Visit my GitHub profile"
              title="GitHub"
              target="_empty"
            >
              GitHub
            </a>
          </div>

          <div
            className={`${styles.item} ${styles.subMenu}`}
            style={
              !folderStates.socials ? { display: "none" } : { display: "block" }
            }
          >
            <span>
              <FontAwesomeIcon icon={faLinkedinIcon} color="#0a66c2" />{" "}
            </span>
            <a
              href="https://linkedin.com/in/levi-terry-dev/"
              // className={styles.button}
              aria-label="Visit my GitHub profile"
              title="Linkedin"
              target="_empty"
            >
              LinkedIn
            </a>
          </div>

          <div
            className={`${styles.item} ${styles.subMenu}`}
            style={
              !folderStates.socials ? { display: "none" } : { display: "block" }
            }
          >
            <span>
              <FontAwesomeIcon icon={faStackOverflowIcon} color="orange" />{" "}
            </span>
            <a
              href="https://stackoverflow.com/users/15316502/typical-username"
              // className={styles.button}
              aria-label="Visit my Stack Overflow profile"
              title="Stack Overflow"
              target="_empty"
            >
              Stack Overflow
            </a>
          </div>
        </div>

        {/* <div>
          <Folder enabled={true} className={`${styles.item} ${styles.dropdown}`} >DCIM</Folder>
        </div>

        <div className={`${styles.item} ${styles.subMenu}`}>
          <span>
            <FontAwesomeIcon icon={faImage} color="var(--clr-icon)" />{" "}
          </span>
          <a
            href="/gallery"
            // className={styles.button}
            aria-label="Visit my GitHub profile"
            title="Gallery"
          >Gallery</a>
        </div> */}
      </div>
    </div>
  );
};

export default Explorer;
