"use client";
import React from "react";
import styles from "../styles/HelpBar.module.css";

const HelpBar = () => {
  return (
    <div className={styles.header}>
      {/* File Menu */}
      <select
        name="file"
        id="file"
        className={styles.item}
        onChange={onFileMenuChange}
      >
        <option value="File" disabled selected hidden>
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
      >
        <option value="terminal" selected hidden>
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
      >
        <option value="help" selected hidden>
          Help
        </option>
        <option value="show_commands">Show Commands</option>
        <option value="show_keyboard_shortcuts">Show Keyboard Shortcuts</option>
      </select>

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
        <div className={`${styles.grid}`} style={{ border: "1px solid white" }}>
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
        <div className={`${styles.grid}`} style={{ border: "1px solid white" }}>
          <p className={styles.modalHeader}>Command</p>
          <p className={styles.modalHeader}>Description</p>
          <span>
            <button className={styles.modalButton}>index</button> <p> + </p>{" "}
            <button className={styles.modalButton}>E</button>{" "}
          </span>
          <p className={styles.modalItem}>Navigates to the index page.</p>
          <button className={styles.modalButton}>about</button>
          <p className={styles.modalItem}>Navigates to the about page.</p>
          <button className={styles.modalButton}>gallery</button>
          <p className={styles.modalItem}>Navigates to the gallery page.</p>
        </div>
      </dialog>
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
  ) as HTMLElement;

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
