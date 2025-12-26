"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import styles from "../../styles/HelpBar.module.css";

interface KeyboardShortcut {
  command: string;
  keyBinding: string[];
  description?: string;
}

const HelpBar = () => {
  const [host, setHost] = useState<string>("localhost");
  const [commandsDialogOpen, setCommandsDialogOpen] = useState(false);
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const keyboardShortcuts: KeyboardShortcut[] = [
    {
      command: "Toggle Explorer",
      keyBinding: ["Ctrl", "B"],
      description: "Show/hide the file explorer sidebar",
    },
    {
      command: "Toggle Terminal",
      keyBinding: ["Ctrl", "`"],
      description: "Open/close the integrated terminal",
    },
    {
      command: "Show Commands",
      keyBinding: ["Ctrl", "Shift", "P"],
      description: "Open the command palette",
    },
    {
      command: "Quick Open",
      keyBinding: ["Ctrl", "P"],
      description: "Quickly open files",
    },
  ];

  const filteredShortcuts = keyboardShortcuts.filter((shortcut) =>
    shortcut.command.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const toggleTerminal = () => {
    const terminal = document.querySelector("[data-name=terminal]") as HTMLElement;
    if (terminal) {
      terminal.classList.toggle("hide");
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/headshot.jpg"
          alt="Levi Terry"
          fill
          sizes="100%"
          className={styles.headshot}
          priority
        />
      </div>

      <div className={styles.mainContent}>
        {/* File Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className={styles.hiddenButton}>
            File
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              align="start" 
              className={styles.dropdownContent}
              sideOffset={5}
            >
              <DropdownMenu.Item 
                className={styles.dropdownItem}
                onClick={() => navigateTo("/")}
              >
                Home
              </DropdownMenu.Item>
              <DropdownMenu.Item 
                className={styles.dropdownItem}
                onClick={() => navigateTo("/about")}
              >
                About
              </DropdownMenu.Item>
              <DropdownMenu.Item 
                className={styles.dropdownItem}
                onClick={() => navigateTo("/gallery")}
              >
                Gallery
              </DropdownMenu.Item>
              <DropdownMenu.Separator className={styles.dropdownSeparator} />
              <DropdownMenu.Item 
                className={styles.dropdownItem}
                onClick={() => window.close()}
                style={{ color: 'var(--clr-danger, #ff6b6b)' }}
              >
                Exit
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* Terminal Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className={styles.hiddenButton}>
            Terminal
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              align="start" 
              className={styles.dropdownContent}
              sideOffset={5}
            >
              <DropdownMenu.Item 
                className={styles.dropdownItem}
                onClick={toggleTerminal}
              >
                Toggle Terminal
                <span className={styles.shortcut}>Ctrl+`</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className={styles.dropdownSeparator} />
              <DropdownMenu.Item className={styles.dropdownItem}>
                New Terminal
              </DropdownMenu.Item>
              <DropdownMenu.Item className={styles.dropdownItem}>
                Clear Terminal
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* Help Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className={styles.hiddenButton}>
            Help
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              align="start" 
              className={styles.dropdownContent}
              sideOffset={5}
            >
              <DropdownMenu.Item 
                className={styles.dropdownItem}
                onClick={() => setCommandsDialogOpen(true)}
              >
                Show Commands
              </DropdownMenu.Item>
              <DropdownMenu.Item 
                className={styles.dropdownItem}
                onClick={() => setShortcutsDialogOpen(true)}
              >
                Keyboard Shortcuts
                <span className={styles.shortcut}>Ctrl+K Ctrl+S</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className={styles.dropdownSeparator} />
              <DropdownMenu.Item className={styles.dropdownItem}>
                About
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <div className={styles.main}>
          <p style={{ padding: "0 10rem" }}>
            <span>
              <FontAwesomeIcon icon={faSearch} />
              {" "}{host}
            </span>
          </p>
        </div>
      </div>

      {/* Commands Dialog */}
      <Dialog.Root open={commandsDialogOpen} onOpenChange={setCommandsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialogOverlay} />
          <Dialog.Content className={styles.dialogContent}>
            <Dialog.Title className={styles.dialogTitle}>Commands</Dialog.Title>
            <Dialog.Close className={styles.dialogClose}>
              <X size={16} />
            </Dialog.Close>
            
            <div className={styles.commandsGrid}>
              <div className={styles.commandsHeader}>Command</div>
              <div className={styles.commandsHeader}>Description</div>
              
              <div className={styles.commandsItem}>index</div>
              <div className={styles.commandsItem}>Navigate to the home page</div>
              
              <div className={styles.commandsItem}>about</div>
              <div className={styles.commandsItem}>Navigate to the about page</div>
              
              <div className={styles.commandsItem}>gallery</div>
              <div className={styles.commandsItem}>Navigate to the gallery page</div>
              
              <div className={styles.commandsItem}>clear</div>
              <div className={styles.commandsItem}>Clear the terminal</div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Keyboard Shortcuts Dialog */}
      <Dialog.Root open={shortcutsDialogOpen} onOpenChange={setShortcutsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialogOverlay} />
          <Dialog.Content className={`${styles.dialogContent} ${styles.shortcutsDialog}`}>
            <Dialog.Title className={styles.dialogTitle}>Keyboard Shortcuts</Dialog.Title>
            <Dialog.Close className={styles.dialogClose}>
              <X size={16} />
            </Dialog.Close>
            
            <div className={styles.shortcutsContainer}>
              <input
                type="text"
                placeholder="Search shortcuts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                autoFocus
              />
              
              <div className={styles.shortcutsTable}>
                <div className={styles.shortcutsTableHeader}>
                  <div>Command</div>
                  <div>Key Binding</div>
                  <div>Description</div>
                </div>
                
                {filteredShortcuts.map((shortcut, index) => (
                  <div key={index} className={styles.shortcutsTableRow}>
                    <div>{shortcut.command}</div>
                    <div className={styles.keyBindings}>
                      {shortcut.keyBinding.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          {keyIndex > 0 && <span>+</span>}
                          <kbd className={styles.keyBadge}>{key}</kbd>
                        </React.Fragment>
                      ))}
                    </div>
                    <div>{shortcut.description}</div>
                  </div>
                ))}
                
                {filteredShortcuts.length === 0 && (
                  <div className={styles.noResults}>
                    No shortcuts found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default HelpBar;
