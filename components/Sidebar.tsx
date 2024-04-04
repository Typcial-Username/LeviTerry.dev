import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faBook,
  faCog,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { faComments, faMessage } from "@fortawesome/free-regular-svg-icons";

import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Tooltip } from "./Tooltip";
import { Dropdown } from "./Dropdown";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { TextInput } from "./TextInput";
import { Button } from "./Button";

export const Sidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [option, setOption] = useState("files");

  // const themes = [
  //   {
  //     label: "Light",
  //     value: "light",
  //   },
  //   {
  //     label: "Dark",
  //     value: "dark",
  //   },
  //   {
  //     label: "Blue",
  //     value: "blue",
  //   },
  // ];

  return (
    <aside id={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.main_bar}>
          <ul className={styles.options}>
            {/* Files */}
            <li className={styles.item}>
              {/* <Tooltip text={"Files"}> */}
              <div id="files" className={styles.button}>
                <a
                  onClick={() => {
                    selectMenu("files");
                    setOption("files");
                  }}
                  aria-label="Files"
                  title="Explorer"
                >
                  <FontAwesomeIcon icon={faFile} />
                </a>
                {/* </Tooltip> */}
              </div>
            </li>

            {/* Search */}
            {/*}
            <li className={styles.item}>
              {/* <Tooltip text={"Search"}> *}
              <a
                id="search"
                className={styles.button}
                onClick={() => {
                  selectMenu("search");
                  setOption("search");
                }}
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faSearch} />
              </a>
              {/* </Tooltip> *}
            </li>
            */}

            {/* Docs */}
            {/* <li className={styles.item}>
              <a
                id="docs"
                className={styles.button}
                onClick={() => {
                  selectMenu("docs");
                  setOption("docs");
                }}
                title="Documents"
              >
                <FontAwesomeIcon icon={faBook} />
              </a>
            </li> */}

            {/* Contact */}
            <li className={styles.item}>
              {/* <Tooltip text={"Documents"}> */}
              <a
                id="docs"
                className={styles.button}
                onClick={() => {
                  selectMenu("docs");
                  setOption("docs");
                  setContactOpen(!contactOpen);
                  console.log({ contactOpen })
                  contactOpen ? closeContact() : openContact();
                }}
                title="Contact"
              >
                <FontAwesomeIcon icon={faMessage} />
              </a>
              {/* </Tooltip> */}
            </li>
          </ul>
        </div>

        <div className={styles.settings}>
          {/* Socials */}
          <ul className={`${styles.options}`}>
            {/* <li>
              <a
                className={styles.button}
                title="Socials"
                onClick={() => {
                  selectMenu("socials");
                  setOption("socials");
                }}
              >
                <FontAwesomeIcon icon={faCircleUser} />
              </a>
            </li> */}

            <li>
              {/* <Tooltip text={"Settings"}> */}
              <a
                className={`${styles.button} `}
                type="button"
                onClick={() => {
                  setSettingsOpen(!settingsOpen);
                  
                  console.log({ contactOpen })
                  settingsOpen ? closeSettings() : openSettings();
                }}
                title="Settings"
              >
                <FontAwesomeIcon icon={faCog} />
              </a>
              {/* </Tooltip> */}
            </li>
          </ul>

        </div>
      </div>

      {/* Contact Modal */}
      <dialog
            id="contact"
            className={styles.contactMenu}
          >
            {/* Close Button */}
            <button onClick={closeContact} className={styles.modalButton}>&times;</button>
            {/* Modal Content */}
            <ul
              style={{
                margin: "auto",
                padding: "auto",
                alignContent: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <form
                className={styles.contact}
                id="contact"
                action="/api/contact"
                method="post"
            >
              <label htmlFor="name">
                Name: <br />
                <TextInput type="text" name="name" placeholder="Your name" />
              </label>{" "}

              <br />
              <br />

              <label htmlFor="email">
                Email: <br />
                <TextInput
                  type="email"
                  name="email"
                  placeholder="you@yourdomain.com"
                />
              </label>

              <br />
              <br />

              <label htmlFor="message">
                Message: <br />
                <textarea
                  className={styles.text}
                  name="message"
                  placeholder="Message"
                />
              </label>

              <br />
              <br />
              
              <button type="submit" name="submit">
                Submit
              </button>
              <Button name="submit" type="submit" text="Submit" />
            </form>
        </ul>
      </dialog>

      {/* Settings Modal*/}
      <dialog
          id="settings"
          className={styles.menu}
          >
            {/* Close Button */}
            <button onClick={closeSettings} className={styles.modalButton}>&times;</button>
            
            {/* Modal Content */}
            <ul
              style={{
                margin: "auto",
                padding: "auto",
                alignContent: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <form
                style={{ margin: "auto", padding: 0 }}
              >
                <label htmlFor="theme">Theme: </label>
                {/* <Dropdown options={themes} /> */}
                <select name="theme" id="theme" onChange={onThemeChange}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="blue">Blue</option>
                </select>
              </form>
            </ul>
          </dialog>
    </aside>
  );
};

const selectMenu = (btn: string) => {
  const button = document.getElementById(btn);
  button?.classList.add(`${styles.selected}`);

  const allButtons = ["files", "docs", "socials"];

  for (let i = 0; i < allButtons.length; i++) {
    if (allButtons[i] != btn) {
      document
        .getElementById(allButtons[i])
        ?.classList.remove(`${styles.selected}`);
    }
    btn !== "search" ? localStorage.setItem("explorer-location", btn) : null;
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
  const elm = document.getElementById("theme") as HTMLSelectElement;
  setTheme(elm?.value);
};

function titleCase(text: string) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

function openSettings() {
  console.log("Opening settings...");
  // Retrieve the settings dialog
  const settings = document.getElementById("settings") as HTMLDialogElement;

  console.log({settings});
  // Open the Modal 
  settings?.showModal()
}

function closeSettings() {
  // Retrieve the settings dialog
  const settings = document.getElementById("settings") as HTMLDialogElement;

  // Close the Modal
  settings?.close()
}

function openContact() {
  console.log("Opening settings...");
  // Retrieve the contact dialog
  const contactMenu = document.getElementById("contact") as HTMLDialogElement;

  console.log({contactMenu});

  contactMenu?.showModal()
}

function closeContact() {
  // Retrieve the contact dialog
  const contactMenu = document.getElementById("contact") as HTMLDialogElement;

  // Close the Modal
  contactMenu?.close()
}