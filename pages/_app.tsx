import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { useCallback, useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // All the key presses made within the timeout
  let allKeyPresses: string[] = [];
  // How long to wait before processing the key presses
  const keyPressTimeout: number = 1000;
  // Whether or not to allow new key presses
  let allowingNewKeyPresses: boolean = true;

  const handleKeypress = useCallback((event: KeyboardEvent) => {
    if (!allowingNewKeyPresses) return;

    console.log("Key Pressed: ", event.key);
    allKeyPresses.push(event.key);

    console.log("Before Timeout");

    setTimeout(() => {
      allowingNewKeyPresses = false;
      console.log("Key Presses: ", allKeyPresses);

      handleKeyPressTimeout(allKeyPresses);

      console.log("Resetting Key Presses");
      allKeyPresses = [];
      allowingNewKeyPresses = true;
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
  // const

  if (explorer) {
    explorer.style.display = "none";
  }
}

function toggleTerminal() {
  const terminal = document.getElementById("terminal") as HTMLDivElement;

  if (terminal) {
    terminal.style.display = "none";
  }
}

export default MyApp;
