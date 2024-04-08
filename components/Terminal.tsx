import React from "react";
import styles from "../styles/Terminal.module.css";
import { Commands } from "../public/secret/commands";
import dynamic from "next/dynamic";
import { useEffect } from "react";

export const Terminal = () => {
  const [host, setHost] = React.useState("localhost");
  const [bottom, setBottom] = React.useState(0);

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
      className="container"
      data-name="terminal"
      id={styles.terminal}
      style={{
        borderTop: "1px solid whitesmoke",
        backgroundColor: "var(--clr-bg)",
      }}
    >
      <span className={styles.topBar}>
        <p className={styles.header}>Terminal</p>

        <button id="close-btn" className={styles.close} onClick={closeMenu}>
          &times;
        </button>
      </span>

      {/* <div className={styles.text}> */}
      <form onSubmit={onSubmit} className={styles.text}>
        <span>
          <label htmlFor="terminal">
            visitor@{host}
            {">"}
          </label>
          <textarea
            name="terminal"
            onKeyDown={onKeyPress}
            // defaultValue={"visitor@leviterry.dev> "}
            className={styles.text}
          />
        </span>
      </form>
      {/* </div> */}
    </div>
  );
};

// React.FormEvent<HTMLInputElement>
const onSubmit = (event: any) => {
  event.preventDefault();
  console.log(event.target);
};

function closeMenu() {
  // const btn = document.getElementById('close-btn')\
  console.log(styles.terminal);
  const terminal = document.getElementById(styles.terminal);
  console.log(terminal);

  console.log("Adding hide class to terminal...");
  terminal?.classList.add("hide");
}

function onKeyPress(event: React.KeyboardEvent) {
  if (event.key === "Enter") {
    const target = event.target as HTMLTextAreaElement;
    const content = removePunctuation(target.value.toLowerCase());

    Commands.forEach((command) => {
      if (
        command.name.toLowerCase() === content ||
        command.synonyms.includes(content)
      ) {
        if (command.content.includes("redirect")) {
          const path = command.content.split(" ")[1];
          window.location.href = path;
        }

        terminalWrite(command.content, 50);
      }

      terminalWrite("Command not found.", 50);
    });

    // switch (content) {
    //   case "about":
    //     window.location.href = "/about";
    //     break;
    //   case "index":
    //     window.location.href = "/";
    //     break;
    //   case "gallery":
    //     window.location.href = "/gallery";
    //     break;
    //   case "exit":
    //     window.close();
    //     break;
    //   case "help":
    //     terminalWrite(
    //       `|-------------Help Menu-------------|
    //        |       Avaliable Commands          |
    //        |       ------------------          |
    //        | help: Show this menu              |
    //        | about: Open the about page        |
    //        | index | main: Go to the home page |
    //        | gallery: Go to the gallery page   |
    //       |------------------------------------|
    //   `,
    //       50
    //     );
    //   default:
    //     console.log("Command not found.");
    //     break;
    // }
  }
}

function terminalWrite(text: string, speed: number) {
  const terminal = document.querySelector(
    "[data-name=terminal]"
  ) as HTMLTextAreaElement;

  terminal.disabled = true;

  let interval: NodeJS.Timeout = setTimeout(() => {}, 0);
  // slowly add the text to the terminal

  if (text.length <= 0) {
    clearTimeout(interval);
    terminal.disabled = false;
    terminal.value += "\nvisitor@leviterry.dev > ";
  } else {
    interval = setTimeout(() => {
      let char = text.substring(0, 1);

      console.log({ char });

      if (char == "\n") {
        terminal.value += "<br>";
      } else if (char == " ") {
        console.log("Adding space...");
        terminal.value += "&nbsp;";
      }

      terminal.value = terminal.value + char;

      terminalWrite(text.substring(1, text.length), speed);
    }, speed);
  }
}

function removePunctuation(text: string): string {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}
