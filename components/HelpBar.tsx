"use client";
import React, { useEffect } from "react";
import styles from "../styles/HelpBar.module.css";
import Image from "next/image";

const HelpBar = () => {
  const [host, setHost] = React.useState<string>("localhost");

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  return (
    <div className={styles.header}>
      <div
        style={{
          width: "25px",
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Image
          src={"/images/headshot.jpg"}
          alt="Levi Terry"
          width={25}
          height={25}
          className="logo"
        />
      </div>

      <div className={styles.mainContent}>
        {/* File Menu */}
        <select
          name="file"
          id="file"
          className={styles.item}
          onChange={onFileMenuChange}
          defaultValue={"file"}
        >
          <option value="file" hidden>
            File
          </option>
          <option value="index.html">index</option>
          <option value="about.html">about</option>
          <option value="gallery.html">gallery</option>
          <option value="exit">Exit</option>
        </select>

        {/* Terminal Menu */}
        <select
          name="terminal"
          id="terminal_help"
          className={styles.item}
          onChange={onTerminalMenuChange}
          defaultValue={"terminal"}
        >
          <option value="terminal" hidden>
            Terminal
          </option>
          <option value="open">Open</option>
          <option value="close">Close</option>
        </select>

        {/* Help Menu */}
        <select
          name="help"
          id="help"
          className={styles.item}
          onChange={onHelpMenuChange}
          defaultValue={"help"}
        >
          <option value="help" hidden>
            Help
          </option>
          <option value="show_commands">Show Commands</option>
          <option value="show_keyboard_shortcuts">
            Show Keyboard Shortcuts
          </option>
        </select>

        <div className={styles.main}>
          <p style={{ padding: "10rem" }}>{host}</p>
        </div>

        {/* Commands Modal */}
        <dialog id="commands-modal" className={styles.commandsModal}>
          {/* Close Button */}
          <button onClick={closeCommandsModal} className={styles.closeModal}>
            &times;
          </button>

          {/* Modal Header */}
          <h1
            style={{ color: "var(--clr-primary)", textDecoration: "underline" }}
          >
            Commands
          </h1>
          {/* Modal Content */}
          <div
            className={`${styles.grid}`}
            style={{ border: "1px solid white" }}
          >
            <p className={styles.modalHeader}>Command</p>
            <p className={styles.modalHeader}>Description</p>
            <p className={styles.modalItem}>index</p>
            <p className={styles.modalItem}>Navigates to the index page.</p>
            <p className={styles.modalItem}>about</p>
            <p className={styles.modalItem}>Navigates to the about page.</p>
            <p className={styles.modalItem}>gallery</p>
            <p className={styles.modalItem}>Navigates to the gallery page.</p>
          </div>
        </dialog>

        {/* Keyboard Shortcut Modal */}
        <dialog id="keyboard-shortcut-modal" className={styles.commandsModal}>
          {/* Close Button */}
          <button
            onClick={closeKeyboardShortcutModal}
            className={styles.closeModal}
          >
            &times;
          </button>

          {/* Modal Header */}
          <h1
            style={{ color: "var(--clr-primary)", textDecoration: "underline" }}
          >
            Keyboard Shortcuts
          </h1>

          {/* Modal Content */}
          {/* <div className={`${styles.grid}`} style={{ border: "1px solid white" }}>
            <p className={styles.modalHeader}>Command</p>
            <p className={styles.modalHeader}>Description</p>
            <span className={styles.group}>
              <button className={styles.modalButton}>Control</button>
              <p>&nbsp;+&nbsp;</p>{" "}
              <button className={styles.modalButton}>B</button>{" "}
            </span>
            <p className={styles.modalItem}>Toggles the Explorer.</p>
            <span className={styles.group}>
              <button className={styles.modalButton}>Control</button>
              <p>&nbsp;+&nbsp;</p>{" "}
              <button className={styles.modalButton}>`</button>{" "}
            </span>
            <p className={styles.modalItem}>Navigates to the about page.</p>
            <button className={styles.modalButton}>gallery</button>
            <p className={styles.modalItem}>Navigates to the gallery page.</p>
          </div> */}

          <input
            type="text"
            placeholder="Search..."
            className={styles.search}
            autoFocus
            name="search"
          />

          <table
            className={`${styles.modalTable}`}
            style={{ border: "1px solid var(--clr-secondary)" }}
          >
            <thead>
              <tr>
                <th>Command</th>
                <th>Key Binding</th>
                {/* <th>Description</th> */}
              </tr>
            </thead>

            <tbody>
              {/* Explorer Toggle */}
              <tr>
                <td>
                  <p>Toggle Explorer</p>
                </td>
                <td className={styles.group}>
                  <button className={styles.modalButton}>Control</button>{" "}
                  <p>+</p> <button className={styles.modalButton}>B</button>
                </td>

                {/* <td>Toggles the Explorer.</td> */}
              </tr>
              {/* Terminal Toggle */}
              <tr>
                <td>Toggle Terminal</td>
                <td className={styles.group}>
                  <button className={styles.modalButton}>Control</button>{" "}
                  <p>+</p> <button className={styles.modalButton}>`</button>
                </td>
              </tr>
              <tr>
                <td>Toggles Terminal</td>
                <td className={styles.group}>
                  <button className={styles.modalButton}>Control</button>{" "}
                  <p>+</p> <button className={styles.modalButton}>`</button>
                </td>
              </tr>
            </tbody>
          </table>
        </dialog>
      </div>
    </div>
  );
};

function onFileMenuChange(event: React.ChangeEvent<HTMLSelectElement>) {
  event.preventDefault();

  switch (event.target.value) {
    case "index.html":
      window.location.href = "/";
      event.target.value = "index.html";
      break;
    case "about.html":
      window.location.href = "/about";
      event.target.value = "about.html";
      break;
    case "gallery.html":
      window.location.href = "/gallery";
      event.target.value = "gallery.html";
      break;
    case "exit":
      // window.exit();
      break;
  }
}

function onTerminalMenuChange(event: React.ChangeEvent<HTMLSelectElement>) {
  event.preventDefault();

  const terminal = document.querySelector(
    "[data-name=terminal]"
  ) as HTMLSelectElement;

  switch (event.target.value) {
    case "open":
      // open terminal
      terminal.classList.remove("hide");

      break;
    case "close":
      // close terminal
      terminal.classList.add("hide");
      break;
  }

  event.target.value = "terminal";
}

function onHelpMenuChange(event: React.ChangeEvent<HTMLSelectElement>) {
  event.preventDefault();

  switch (event.target.value) {
    case "show_commands":
      // open terminal
      openCommandsModal();
    case "show_keyboard_shortcuts":
      // close modal
      openKeyboardShortcutModal();
      break;
  }
  closeOtherModals(event.target.value);
  event.target.value = "help";
}

function openCommandsModal() {
  closeOtherModals("keyboard-shortcut-modal");
  const modal = document.getElementById("commands-modal") as HTMLDialogElement;
  modal?.showModal();
}

function closeCommandsModal() {
  const modal = document.getElementById("commands-modal") as HTMLDialogElement;

  modal?.close();
}

function openKeyboardShortcutModal() {
  closeOtherModals("commands-modal");
  const modal = document.getElementById(
    "keyboard-shortcut-modal"
  ) as HTMLDialogElement;
  modal?.showModal();
}

function closeKeyboardShortcutModal() {
  const modal = document.getElementById(
    "keyboard-shortcut-modal"
  ) as HTMLDialogElement;
  modal?.close();
}

function closeOtherModals(modalId: string) {
  switch (modalId) {
    case "commands-modal":
      closeKeyboardShortcutModal();
      break;
    case "keyboard-shortcut-modal":
      closeCommandsModal();
      break;
  }
}

export default HelpBar;
