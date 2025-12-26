"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import styles from "../styles/HelpBar.module.css";

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
        <DropdownMenu>
          <DropdownMenuTrigger className={styles.hiddenButton}>
            File
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={() => navigateTo("/")}>
              <span>Home</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigateTo("/about")}>
              <span>About</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigateTo("/gallery")}>
              <span>Gallery</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => window.close()}
              className="text-red-400 hover:text-red-300"
            >
              <span>Exit</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Terminal Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className={styles.hiddenButton}>
            Terminal
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={toggleTerminal}>
              <span>Toggle Terminal</span>
              <span className="ml-auto text-xs opacity-60">Ctrl+`</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>New Terminal</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Clear Terminal</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className={styles.hiddenButton}>
            Help
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <Dialog open={commandsDialogOpen} onOpenChange={setCommandsDialogOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <span>Show Commands</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </Dialog>
            
            <Dialog open={shortcutsDialogOpen} onOpenChange={setShortcutsDialogOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <span>Keyboard Shortcuts</span>
                  <span className="ml-auto text-xs opacity-60">Ctrl+K Ctrl+S</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </Dialog>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>About</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className={styles.main}>
          <p style={{ padding: "10rem" }}>
            <span>
              <FontAwesomeIcon icon={faSearch} />
              {host}
            </span>
          </p>
        </div>

        {/* Commands Dialog */}
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Commands</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4 border border-[var(--clr-border)] rounded-md p-4">
              <div className="font-semibold text-[var(--clr-primary)] border-b border-[var(--clr-border)] pb-2">
                Command
              </div>
              <div className="font-semibold text-[var(--clr-primary)] border-b border-[var(--clr-border)] pb-2">
                Description
              </div>
              
              <div className="py-2">index</div>
              <div className="py-2">Navigate to the home page</div>
              
              <div className="py-2">about</div>
              <div className="py-2">Navigate to the about page</div>
              
              <div className="py-2">gallery</div>
              <div className="py-2">Navigate to the gallery page</div>
              
              <div className="py-2">clear</div>
              <div className="py-2">Clear the terminal</div>
            </div>
          </div>
        </DialogContent>

        {/* Keyboard Shortcuts Dialog */}
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search shortcuts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--clr-background)] border border-[var(--clr-border)] rounded-md text-[var(--clr-text)] placeholder-[var(--clr-text)] placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--clr-primary)] focus:border-transparent"
                autoFocus
              />
            </div>
            
            <div className="border border-[var(--clr-border)] rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-[var(--clr-accent)] bg-opacity-20">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[var(--clr-primary)]">
                      Command
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-[var(--clr-primary)]">
                      Key Binding
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-[var(--clr-primary)]">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShortcuts.map((shortcut, index) => (
                    <tr 
                      key={index} 
                      className="border-t border-[var(--clr-border)] hover:bg-[var(--clr-accent)] hover:bg-opacity-10"
                    >
                      <td className="px-4 py-3 text-[var(--clr-text)]">
                        {shortcut.command}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {shortcut.keyBinding.map((key, keyIndex) => (
                            <React.Fragment key={keyIndex}>
                              {keyIndex > 0 && (
                                <span className="text-[var(--clr-text)] opacity-60">+</span>
                              )}
                              <kbd className="px-2 py-1 text-xs font-semibold bg-[var(--clr-accent)] bg-opacity-30 border border-[var(--clr-border)] rounded">
                                {key}
                              </kbd>
                            </React.Fragment>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[var(--clr-text)] opacity-75">
                        {shortcut.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredShortcuts.length === 0 && (
                <div className="px-4 py-8 text-center text-[var(--clr-text)] opacity-50">
                  No shortcuts found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </div>
    </div>
  );
};

export default HelpBar;
