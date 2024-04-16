'use client';
import React from "react";
import styles from "../styles/Terminal.module.css";
import { Commands } from "../public/secret/commands";
import dynamic from "next/dynamic";
import { useEffect } from "react";

export const Terminal = () => {
  const [host, setHost] = React.useState("localhost");
  // const [bottom, setBottom] = React.useState(0);

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
      style={{
        borderTop: "1px solid whitesmoke",
        backgroundColor: "var(--clr-bg)",
        marginLeft: '17.5rem'
      }}
    >
      <div className={styles.resizer}></div>
      <span className={styles.topBar}>
        <p className={styles.header}>Terminal</p>

        <button id="close-btn" className={styles.close} onClick={closeMenu}>
          &times;
        </button>
      </span>

      {/* <div className={styles.text}> */}
      <form onSubmit={onSubmit} className={styles.text}>
        {/* <span> */}
          {/* <label htmlFor="terminal">
            visitor@{host}
            {">"}
          </label> */}
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
        {/* </span> */}
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
  // console.log({ key: event.key })
  if (event.key === "Enter") {
    let foundCommand = false;

    const target = event.target as HTMLTextAreaElement;
    
    const lines = target.value.split("\n");
    
    console.log({ lines })

    let content = removePunctuation(lines[lines.length - 1].toLowerCase());
    let splitContent = content.split(">")

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
          const path = command.content.split(" ")[1];

          if (path.startsWith("http")) {
            window.open(path, "_blank");
            return
          }

          window.location.href = path;
          return;
        }

        terminalWrite(target, "\n" + command.content, 15);
        return
      }
    });

    if (!foundCommand) {
      console.log("Command not found." + content)
      terminalWrite(target, "\nCommand not found.", 0);
    }


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

function terminalWrite(element: HTMLTextAreaElement, text: string, speed: number) {
  // const terminal = document.querySelector(
  //   "#terminal"
  // ) as HTMLTextAreaElement;

  // console.log({ text })

  element.disabled = true;

  let interval: NodeJS.Timeout = setTimeout(() => {}, 0);
  // slowly add the text to the terminal

  if (text.length <= 0) {
    clearTimeout(interval);
    element.disabled = false;
    element.value += "\nvisitor@leviterry.dev > ";
  } else {
    interval = setTimeout(() => {
      let char = text.substring(0, 1);

      // console.log({ char });

      // if (char == "\n") {
      //   element.value += "<br>";
      // } else if (char == " ") {
      //   console.log("Adding space...");
      //   element.value += "&nbsp;";
      // }

      element.value += char;

      terminalWrite(element, text.substring(1, text.length), speed);
    }, speed);
  }
}

function removePunctuation(text: string): string {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
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