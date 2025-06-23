"use client";
import React, { useRef } from "react";
import styles from "../styles/Terminal.module.css";
import { Commands } from "../public/secret/commands";
import dynamic from "next/dynamic";
import { useEffect } from "react";

export const Terminal = () => {
  const [host, setHost] = React.useState("localhost");
  const terminalValue = useRef<string>("");

  // React.FormEvent<HTMLInputElement>
  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log(event.target);
  };

  useEffect(() => {
    setHost(window.location.host);
    const terminal = document.querySelector(
      "[data-name=terminal]"
    ) as HTMLTextAreaElement;

    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, []);

  return (
    <div
      // className="container"
      data-name="terminal"
      id={styles.terminal}
      className="show"
      style={{
        // borderTop: "1px solid whitesmoke",
        backgroundColor: "var(--clr-bg)",
        marginLeft: "var(--main-m-left)",
      }}
    >
      <div className={styles.resizer}></div>
      <span className={styles.topBar}>
        <p className={styles.header}>Terminal</p>

        <button id="close-btn" className={styles.close} onClick={closeMenu}>
          &times;
        </button>
      </span>

      <form onSubmit={onSubmit} className={styles.text}>
        <textarea
          name="terminal"
          id="terminal"
          data-name="terminal"
          onKeyDown={onKeyPress}
          defaultValue={`visitor@${host}>`}
          autoComplete={"off"}
          spellCheck={false}
          className={styles.text}
        />
      </form>
    </div>
  );
  
  function closeMenu() {
    // const btn = document.getElementById('close-btn')\
    const terminal = document.getElementById(styles.terminal);
  
    terminal?.classList.add("hide");
  }
  
  function onKeyPress(event: React.KeyboardEvent) {
    // console.log({ key: event.key })
    if (event.key === "Enter") {
      let foundCommand = false;
  
      const target = event.target as HTMLTextAreaElement;
  
      const lines = target.value.split("\n");
  
      let content = removePunctuation(lines[lines.length - 1].toLowerCase());
      let splitContent = content.split(">");
  
      if (splitContent.length > 1) {
        content = splitContent[1].trim();
      } else {
        content = content.trim();
      }
  
      Commands.forEach((command) => {
        if (
          command.name.toLowerCase() === content ||
          command.synonyms.includes(content)
        ) {
          foundCommand = true;
          if (command.content.includes("redirect")) {
            const path = command.content.split("redirect ")[1];
  
            if (path.startsWith("http")) {
              target.value += `\nRedirecting to ${path}\n${target.defaultValue}`;
              window.open(path, "_blank");
              return;
            }
  
            target.value += `\nRedirecting to ${path}\nname@${host} `;
            // target.value += `\nname@${hostname}>`;
  
            window.location.href = path;
  
            return;
          }
  
          terminalWrite(target, "\n" + command.content, 15);
          return;
        }
      });
  
      if (!foundCommand) {
        console.log("Command not found." + content);
        terminalWrite(target, "\nCommand not found.", 0);
      }
  }
  
  function terminalWrite(
    element: HTMLTextAreaElement,
    text: string,
    speed: number
  ) {
    element.disabled = true;
    let interval: NodeJS.Timeout = setTimeout(() => {}, 0);
    // slowly add the text to the terminal
  
    if (text.length <= 0) {
      clearTimeout(interval);
      element.disabled = false;
      element.value += `\nvisitor@${host} > `;
    } else {
      interval = setTimeout(() => {
        let char = text.substring(0, 1);
  
        element.value += char;
  
        terminalWrite(element, text.substring(1, text.length), speed);
      }, speed);
    }
  }
  
  function removePunctuation(text: string): string {
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  }
};
}

// function makeResizableDiv() {
//   const resizer = document?.querySelector(".resizer") as HTMLDivElement;
//   resizer.addEventListener("mousedown", () => {
//     resizer.addEventListener("mousemove", resize);
//     window.addEventListener("mousemove", resize);
//     window.addEventListener("mouseup", stopResize);
//   })

//   function resize(event: MouseEvent) {
//     const terminal = document?.querySelector(".terminal") as HTMLDivElement;
//     const terminalText = document?.querySelector(".text") as HTMLTextAreaElement;

//     const originalY = terminal.getBoundingClientRect().top;
//     const originalMouseY = event.clientY;

//     terminal.style.height = originalY + (event.clientY - originalMouseY) + "px";
//   }

//   function stopResize() {
//     window.removeEventListener("mousemove", resize);
//   }
// }

// makeResizableDiv()
