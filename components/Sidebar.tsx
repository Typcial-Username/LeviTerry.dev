"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faCog } from "@fortawesome/free-solid-svg-icons";
import { faComments, faMessage } from "@fortawesome/free-regular-svg-icons";

import styles from "../styles/Sidebar.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Tooltip } from "./Tooltip";
import { Dropdown } from "./Dropdown";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { TextInput } from "./TextInput";
import { Button } from "./Button";

const Sidebar = () => {
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
                <button
                  className={styles.button}
                  onClick={() => {
                    selectMenu("files");
                    setOption("files");
                  }}
                  aria-label="Files"
                  title="Explorer"
                >
                  <FontAwesomeIcon icon={faFile} />
                </button>
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
              <button
                id="open-contact-modal"
                className={styles.button}
                onClick={() => {
                  openContact();
                }}
                title="Contact"
              >
                <FontAwesomeIcon icon={faMessage} />
              </button>
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
              <button
                className={`${styles.button} `}
                onClick={() => {
                  openSettings();
                }}
                title="Settings"
              >
                <FontAwesomeIcon icon={faCog} />
              </button>
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

        <h1 className={styles.modalHeader}>Contact Me</h1>

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
            <span>
              {/* Name Input */}
              <label htmlFor="contact-name">Name: </label>
              <TextInput
                id="contact-name"
                type="text"
                name="name"
                placeholder="Your name"
              />
            </span>

            <br />
            {/* Email Input */}
            <span>
              <label htmlFor="contact-email">Email: </label>
              <TextInput
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@yourdomain.com"
              />
            </span>

            <br />

            {/* Message Input */}
            <span>
              <label htmlFor="contact-message">Message: </label>
              <textarea
                id="contact-message"
                className={styles.text}
                name="message"
                placeholder="Message"
              />
            </span>

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
      <dialog
        id="settings"
        className={styles.menu}
        suppressHydrationWarning={true}
      >
        {/* Close Button */}
        <button
          id="close-settings"
          onClick={closeSettings}
          className={styles.modalButton}
        >
          &times;
        </button>

        <h1 className={styles.modalHeader}>Settings</h1>

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
  }
};

// Ensure the 'window' object is defined
// When the window loads, set the theme
window.onload = (event: Event) => {
  // Get the default theme
  const defaultTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  let selectedTheme: string = "dark";

  const localTheme = localStorage.getItem("theme");

  if (!localTheme) {
    console.log("localstorage theme is null, using default theme");
    selectedTheme = defaultTheme ? "dark" : "light";
  } else {
    selectedTheme = localTheme;
  }

  // Set the theme
  setTheme(selectedTheme);

  const themeChanger = document.getElementById("theme") as HTMLSelectElement;

  themeChanger.value = selectedTheme;
};

// }

const setTheme = (theme: string) => {
  // Change the theme of the document
  document.documentElement.className = theme;

  console.log({
    theme,
    document,
    documentClassName: document.documentElement.className,
  });

  // Save the theme to localStorage
  localStorage.setItem("theme", theme);
};

const onThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
  // Get the selected theme from the select element
  const elm = document.getElementById("theme") as HTMLSelectElement;
  // Set the theme
  setTheme(elm?.value);

  // e.target.value = elm.value;
};

// function titleCase(text: string) {
//   return text[0].toUpperCase() + text.slice(1).toLowerCase();
// }

function openSettings() {
  // Retrieve the settings dialog
  const settings = document.getElementById("settings") as HTMLDialogElement;

  // Open the Modal
  settings?.showModal();
}

function closeSettings() {
  // Retrieve the settings dialog
  const settings = document.getElementById("settings") as HTMLDialogElement;

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

export default Sidebar;
