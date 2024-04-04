import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faCog } from "@fortawesome/free-solid-svg-icons";
import { faComments, faMessage } from "@fortawesome/free-regular-svg-icons";

import styles from "../styles/Sidebar.module.css";
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
                  console.log({ contactOpen });
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
                  openSettings();
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
      <dialog id="contact" className={styles.contactMenu}>
        {/* Close Button */}
        <button
          id="close-contact"
          onClick={closeContact}
          className={styles.modalButton}
        >
          &times;
        </button>
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
          {/* Contact Form */}
          <form
            className={styles.contact}
            id="contact"
            action="/api/contact"
            method="post"
          >
            {/* Name Input */}
            <label htmlFor="name">
              Name:
              <TextInput type="text" name="name" placeholder="Your name" />
            </label>{" "}
            <br />
            <br />
            {/* Email Input */}
            <label htmlFor="email">
              Email:
              <TextInput
                type="email"
                name="email"
                placeholder="you@yourdomain.com"
              />
            </label>
            <br />
            <br />
            {/* Message Input */}
            <label htmlFor="message">
              Message:
              <textarea
                className={styles.text}
                name="message"
                placeholder="Message"
              />
            </label>
            <br />
            <br />
            {/* Submit Button */}
            <button type="submit" name="submit">
              Submit
            </button>
            <Button name="submit" type="submit" text="Submit" />
          </form>
        </ul>
      </dialog>

      {/* Settings Modal*/}
      <dialog id="settings" className={styles.menu}>
        {/* Close Button */}
        <button
          id="close-settings"
          onClick={closeSettings}
          className={styles.modalButton}
        >
          &times;
        </button>

        {/* Modal Content */}
        {/* <ul
          style={{
            margin: "auto",
            padding: "auto",
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
          }}
        > */}
        {/* Settings Form */}
        <form style={{ margin: "auto", padding: 0 }}>
          <label htmlFor="theme">Theme: </label>
          {/* <Dropdown options={themes} /> */}
          {/* Theme selector */}
          <select name="theme" id="theme" onChange={onThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
          </select>
        </form>
        {/* </ul> */}
      </dialog>
    </aside>
  );
};

const selectMenu = (btn: string) => {
  // Get the button
  const button = document.getElementById(btn) as HTMLButtonElement;
  // Add the selected class to the button
  button?.classList.add(`${styles.selected}`);
  // List of all the buttons in the element
  const allButtons = ["files", "docs", "socials"];

  // Loop through all the buttons
  for (let i = 0; i < allButtons.length; i++) {
    // If the button is not the selected button
    if (allButtons[i] != btn) {
      // Remove the selected class from the button
      document
        .getElementById(allButtons[i])
        ?.classList.remove(`${styles.selected}`);
    }

    btn !== "search" ? localStorage.setItem("explorer-location", btn) : null;
  }
};

// Ensure the 'wiundow' object is defined
if (typeof window !== "undefined") {
  // When the window loads, set the theme
  window.onload = (event: Event) => {
    // Get the default theme
    const defaultTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Set the theme
    setTheme(localStorage.getItem("theme") || defaultTheme ? "dark" : "light");
  };
}

const setTheme = (theme: string) => {
  // Change the theme of the document
  document.documentElement.className = theme;
  // Save the theme to localStorage
  localStorage.setItem("theme", theme);
};

const onThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
  // Get the selected theme from the select element
  const elm = document.getElementById("theme") as HTMLSelectElement;
  // Set the theme
  setTheme(elm?.value);
};

function titleCase(text: string) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

function openSettings() {
  // Retrieve the settings dialog
  const settings = document.getElementById("settings") as HTMLDialogElement;

  // Open the Modal
  settings?.showModal();
}

function closeSettings() {
  // Retrieve the settings dialog
  const settings = document.getElementById("settings") as HTMLDialogElement;

  console.log({ settings });

  // Close the Modal
  settings?.close();
}

function openContact() {
  // Retrieve the contact dialog
  const contactMenu = document.getElementById("contact") as HTMLDialogElement;

  contactMenu?.showModal();
}

function closeContact() {
  // Retrieve the contact dialog
  const contactMenu = document.getElementById("contact") as HTMLDialogElement;

  // Close the Modal
  contactMenu?.close();
}

// function openModal(id: string) {
//   // Retrieve all the modals
//   const modals = document.querySelectorAll(
//     "dialog"
//   ) as NodeListOf<HTMLDialogElement>;

//   console.log({ modals });

//   for (const modal in modals) {
//     console.log(modal, modals[modal]);
//     if (modals[modal].id === id) {
//       modals[modal]?.showModal();
//     } else {
//       modals[modal]?.close();
//     }
//   }
// }
