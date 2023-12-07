import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faBook,
  faCog,
  faCircleUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faHtml5 } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Tooltip } from "./Tooltip";
import { Dropdown } from "./Dropdown";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const Sidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [option, setOption] = useState("files");

  const faGithubIcon = faGithub as IconProp;

  const themes = [
    {
      label: "Light",
      value: "light",
    },
    {
      label: "Dark",
      value: "dark",
    },
    {
      label: "Blue",
      value: "blue",
    },
  ];

  return (
    <aside id={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.main_bar}>
          <ul className={styles.options}>
            <li className={styles.item}>
              {/* <Tooltip text={"Files"}> */}
              <a
                id="files"
                className={styles.button}
                onClick={() => {
                  selectMenu("files");
                  setOption("files");
                }}
                aria-label="Files"
              >
                <FontAwesomeIcon icon={faFile} />
              </a>
              {/* </Tooltip> */}
            </li>

            <li className={styles.item}>
              {/* <Tooltip text={"Documents"}> */}
              <a
                id="docs"
                className={styles.button}
                onClick={() => {
                  selectMenu("docs");
                  setOption("docs");
                }}
              >
                <FontAwesomeIcon icon={faBook} />
              </a>
              {/* </Tooltip> */}
            </li>

            <li>
              <a
                href="https://github.com/Typcial-Username"
                className={styles.button}
              >
                <FontAwesomeIcon icon={faGithubIcon} />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul className={`${styles.options}`}>
            {/*
            <li>
              {/* <Tooltip text="Socials"> }
              <a className={styles.button}>
                <FontAwesomeIcon icon={faCircleUser} />
              </a>
              {/* </Tooltip> }
            </li>
            */}
            <li>
              {/* <Tooltip text={"Settings"}> */}
              <a
                className={styles.button}
                type="button"
                onClick={() => setSettingsOpen(!settingsOpen)}
              >
                <FontAwesomeIcon icon={faCog} />
              </a>
              {/* </Tooltip> */}
            </li>
          </ul>
        </div>
      </div>

      {/*
      <div
        className={`${styles.content} ${
          settingsOpen ? `${styles.open}` : `${styles.closed}`
        }`}
      >
        <ul
          style={{
            margin: "auto",
            padding: "auto",
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <form style={{ margin: "auto", padding: 0 }}>
            <label htmlFor="theme">Theme: </label>
            {/* <Dropdown options={themes} /> 
            <select name="theme" id="theme" onChange={onThemeChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="blue">Blue</option>
            </select>
          </form>
          {/* <li><a href="">{<FontAwesomeIcon icon={faHtml5} size="lg"/>}</a></li> 
        </ul>
      </div>
         */}
    </aside>
  );
};

const selectMenu = (btn: string) => {
  const button = document.getElementById(btn);
  button?.classList.add(`${styles.selected}`);

  const allButtons = ["files", "docs"];
  for (let i = 0; i < allButtons.length; i++) {
    if (allButtons[i] != btn) {
      document
        .getElementById(allButtons[i])
        ?.classList.remove(`${styles.selected}`);

      localStorage.setItem("explorer-location", btn);
    }
  }
};

if (typeof window !== "undefined") {
  window.onload = (event: Event) => {
    const defaultTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(localStorage.getItem("theme") || defaultTheme ? "dark" : "light");
  };
}

const setTheme = (theme: string) => {
  document.documentElement.className = theme;
  localStorage.setItem("theme", theme);
};

const onThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
  // const root = document.querySelector(':root')
  const elm = document.getElementById("theme");
  // @ts-ignore
  setTheme(elm?.value);
};

function titleCase(text: string) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}
