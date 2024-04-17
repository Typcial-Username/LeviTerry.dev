import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // All the key presses made within the timeout
  let allKeyPresses: MutableRefObject<string[]> = useRef<string[]>([]);
  // How long to wait before processing the key presses
  const keyPressTimeout: number = 250;
  // Whether or not to allow new key presses
  let allowingNewKeyPresses: MutableRefObject<boolean> = useRef(true);

  const handleKeypress = useCallback((event: KeyboardEvent) => {
    if (!allowingNewKeyPresses) return;

    allKeyPresses.current.push(event.key);

    setTimeout(() => {
      allowingNewKeyPresses.current = false;

      handleKeyPressTimeout(allKeyPresses.current);

      allKeyPresses.current = [];
      allowingNewKeyPresses.current = true;
    }, keyPressTimeout);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeypress);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
    };
  }, [handleKeypress]);

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

function handleKeyPressTimeout(allKeyPresses: string[]) {
  console.log("All Key Presses: ", allKeyPresses);

  const keyPresses = allKeyPresses.join("+");

  console.log("Combined Key Presses: ", keyPresses);

  if (keyPresses === "Control+b") {
    toggleExplorer();
  } else if (keyPresses === "Control+`") {
    toggleTerminal();
  } else {
    console.log("No command found for: ", keyPresses);
  }
}

function toggleExplorer() {
  const explorer = document.getElementById("explorer") as HTMLDivElement;

  const root = document.querySelector(":root") as HTMLElement;

  if (
    explorer &&
    (!explorer.style.display || explorer.style.display === "block")
  ) {
    console.log("Hiding Explorer");
    explorer.style.display = "none";
    root.style.setProperty("--main-m-left", "2.5rem");
  } else if (explorer && explorer.style.display === "none") {
    console.log("Showing Explorer");
    explorer.style.display = "block";
    root.style.setProperty("--main-m-left", "17.5rem");
  }
}

function toggleTerminal() {
  const terminal = document.querySelector(
    "[data-name=terminal]"
  ) as HTMLDivElement;

  console.log({ terminal, display: terminal.style.display });

  if (
    terminal &&
    (!terminal.style.display || terminal.style.display === "block")
  ) {
    terminal.style.display = "none";
  } else if (terminal && terminal.style.display === "none") {
    terminal.style.display = "block";
  }
}

export default MyApp;
