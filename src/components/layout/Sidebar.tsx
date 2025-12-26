"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faCog } from "@fortawesome/free-solid-svg-icons";
import { faComments, faMessage } from "@fortawesome/free-regular-svg-icons";

import styles from "../../styles/Sidebar.module.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Tooltip } from "../ui/Tooltip";
import { Dropdown } from "../Dropdown";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { TextInput } from "../TextInput";
import { Button } from "../ui/Button";
import { useReCaptcha } from 'next-recaptcha-v3'

const Sidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [option, setOption] = useState("files");

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const { executeRecaptcha } = useReCaptcha(process.env.RECAPTCHA_SITE_KEY)
  
  const onContactFormSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log({key: process.env.RECAPTCHA_SITE_KEY})
    // const token = await executeRecaptcha('contact_form')

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        },
        // token
      })
    })
  }, [contactName, contactEmail, contactMessage, /*executeRecaptcha*/])

  useEffect(() => {
    // Get the default theme
    const defaultTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    let selectedTheme: string = "dark";

    const localTheme = localStorage.getItem("theme");

    if (!localTheme) {
      selectedTheme = defaultTheme ? "dark" : "light";
    } else {
      selectedTheme = localTheme;
    }

    // Set the theme
    setTheme(selectedTheme);

    const themeChanger = document.getElementById("theme") as HTMLSelectElement;

    themeChanger.value = selectedTheme;

    // Add click-outside-to-close functionality for dialogs
    const handleDialogClickOutside = (e: MouseEvent) => {
      const contactDialog = document.getElementById("contact") as HTMLDialogElement;
      const settingsDialog = document.getElementById("settings") as HTMLDialogElement;
      
      // Check if contact dialog is open and click is outside
      if (contactDialog?.open && e.target === contactDialog) {
        contactDialog.close();
      }
      
      // Check if settings dialog is open and click is outside  
      if (settingsDialog?.open && e.target === settingsDialog) {
        settingsDialog.close();
      }
    };

    // Add keyboard support (Escape key to close)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const contactDialog = document.getElementById("contact") as HTMLDialogElement;
        const settingsDialog = document.getElementById("settings") as HTMLDialogElement;
        
        if (contactDialog?.open) {
          contactDialog.close();
        }
        if (settingsDialog?.open) {
          settingsDialog.close();
        }
      }
    };

    // Add event listeners
    document.addEventListener('click', handleDialogClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('click', handleDialogClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [])

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
                    toggleExplorer();
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

        {/* Contact Form */}
        <form
          className={styles.contactForm}
          id="contact-form"
          onSubmit={onContactFormSubmit}
        >
          {/* Name Input */}
          <div className={styles.formGroup}>
            <label htmlFor="contact-name">Name</label>
            <TextInput
              id="contact-name"
              type="text"
              name="name"
              placeholder="Your name"
              onChange={(e) => setContactName((e.target as HTMLInputElement).value)}
            />
          </div>

          {/* Email Input */}
          <div className={styles.formGroup}>
            <label htmlFor="contact-email">Email</label>
            <TextInput
              id="contact-email"
              type="email"
              name="email"
              placeholder="you@yourdomain.com"
              onChange={(e) => setContactEmail((e.target as HTMLInputElement).value)}
            />
          </div>

          {/* Message Input */}
          <div className={styles.formGroup}>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              className={styles.textarea}
              name="message"
              placeholder="Your message here..."
              rows={5}
              onChange={(e) => setContactMessage((e.target as HTMLTextAreaElement).value)}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </dialog>

      {/* Settings Modal*/}
      <dialog
        id="settings"
        className={styles.settingsMenu}
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

        {/* Settings Form */}
        <form className={styles.settingsForm}>
          <div className={styles.formGroup}>
            <label htmlFor="theme">Theme</label>
            <select name="theme" id="theme" className={styles.select} onChange={onThemeChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="blue">Blue</option>
            </select>
          </div>
        </form>
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

function toggleExplorer() {
  const explorer = document.getElementById("explorer") as HTMLDivElement;

  const root = document.querySelector(":root") as HTMLElement;

  if (
    explorer &&
    (!explorer.style.display || explorer.style.display === "block")
  ) {
    explorer.style.display = "none";
    root.style.setProperty("--main-m-left", "2.5rem");
  } else if (explorer && explorer.style.display === "none") {
    explorer.style.display = "block";
    root.style.setProperty("--main-m-left", "17.5rem");
  }
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
