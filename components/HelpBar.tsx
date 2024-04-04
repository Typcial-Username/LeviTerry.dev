"use client";
import styles from "../styles/HelpBar.module.css";

const HelpBar = () => {
  return (
    <div className={styles.header}>
        <select name="file" id="file" className={styles.item} onChange={onFileMenuChange}>
            <option value="File" disabled selected hidden>File</option>
            <option value="index.html">index</option>
            <option value="about.html">about</option>
            <option value="gallery.html">gallery</option>
            <option value="exit">Exit</option>
        </select>

        <select name="terminal" id="terminal" className={styles.item} onChange={onTerminalMenuChange}>
            <option value="terminal" disabled selected hidden>Terminal</option>
            <option value="open">Open</option>
            <option value="close">Close</option>
        </select>

        <select name="help" id="help" className={styles.item} onChange={onHelpMenuChange}>
            <option value="help" disabled selected hidden>Help</option>
            <option value="show_commands">Show Commands</option>
            <option value="show_keyboard_shortcuts">Show Keyboard Shortcuts</option>
        </select>

        <dialog id="commands-modal" className={styles.commandsModal}>
            <button onClick={closeCommandsModal} className={styles.closeModal}>&times;</button>

            <h1 style={{color: 'var(--clr-primary)', textDecoration: 'underline'}}>Commands</h1>

            <div className={`${styles.grid}`} style={{border: '1px solid white'}}>
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

        <dialog id="keyboard-shortcut-modal" className={styles.commandsModal}>
            <button onClick={closeKeyboardShortcutModal} className={styles.closeModal}>&times;</button>

            <h1 style={{color: 'var(--clr-primary)', textDecoration: 'underline'}}>Keyboard Shortcuts</h1>

            <div className={`${styles.grid}`} style={{border: '1px solid white'}}>
                <p className={styles.modalHeader}>Command</p>
                <p className={styles.modalHeader}>Description</p>
                <span><button className={styles.modalButton}>index</button> <p> + </p> <button className={styles.modalButton}>E</button> </span>
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

function onFileMenuChange(event: any) {
    console.log(typeof event)
    event.preventDefault();
    switch (event.target.value) {
        case 'index.html':
            window.location.href = '/';
            event.target.value = 'index.html';
            break;
        case 'about.html':
            window.location.href = '/about';
            event.target.value = 'about.html';
            break;
        case 'gallery.html':
            window.location.href = '/gallery';
            event.target.value = 'gallery.html';
            break;
        case 'exit':
            // window.exit();
            break;
    }
}

function onTerminalMenuChange(event: any) {
    console.log(typeof event, {event})
    event.preventDefault();

    const terminal = document.getElementsByName('terminal')[1];

    switch (event.target.value) {
        case 'open':
            // open terminal
            terminal.classList.remove('Terminal_hide__2rHN_')
            break;
        case 'close':
            // close terminal
            terminal.classList.add('Terminal_hide__2rHN_')
            break;
    }
}

function onHelpMenuChange(event: any) {
    console.log(typeof event, {event})
    event.preventDefault();
    switch (event.target.value) {
        case 'show_commands':
            // open terminal
            openCommandsModal();
        case 'show_keyboard_shortcuts':
            openKeyboardShortcutModal();
            break;
    }
}

function openCommandsModal() {
    closeOtherModals('keyboard-shortcut-modal');
    const modal = document.getElementById('commands-modal') as HTMLDialogElement;
    modal?.showModal();
}

function closeCommandsModal() {
    const modal = document.getElementById('commands-modal') as HTMLDialogElement;
    modal?.close();
}

function openKeyboardShortcutModal() {
    closeOtherModals('commands-modal');
    const modal = document.getElementById('keyboard-shortcut-modal') as HTMLDialogElement;
    modal?.showModal();
}

function closeKeyboardShortcutModal() {
    const modal = document.getElementById('keyboard-shortcut-modal') as HTMLDialogElement;
    modal?.close();
}

function closeOtherModals(modalId: string) {
    switch (modalId) {
        case 'commands-modal':
            closeKeyboardShortcutModal();
            break;
        case 'keyboard-shortcut-modal':
            closeCommandsModal();
            break;
    }
}

export default HelpBar;
