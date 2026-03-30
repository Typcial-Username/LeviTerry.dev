import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "./layout";
import Head from "next/head";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { ReCaptchaProvider } from "next-recaptcha-v3";

import { config } from "dotenv";
import path from "path";

// import { webcrypto } from 'node:crypto'
// globalThis.crypto = webcrypto as any;

// import 'altcha'

function MyApp({ Component, pageProps }: AppProps) {
  // console.log("RECAPTCHA_SITE_KEY: ", process.env.RECAPTCHA_SITE_KEY);

  // All the key presses made within the timeout
  let allKeyPresses: MutableRefObject<string[]> = useRef<string[]>([]);
  // How long to wait before processing the key presses
  const keyPressTimeout: number = 250;
  // Whether or not to allow new key presses
  let allowingNewKeyPresses: MutableRefObject<boolean> = useRef(true);

  const handleKeypress = useCallback((event: KeyboardEvent) => {
    if (!allowingNewKeyPresses.current) return;

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
    // <ReCaptchaProvider
    //   reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}
    //   onLoad={() => {
    //     console.log("ReCaptcha Loaded!");
    //   }}
    // >
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
  {
    /* </ReCaptchaProvider> */
  }
}

function handleKeyPressTimeout(allKeyPresses: string[]) {
  const keyPresses = allKeyPresses.join("+");

  if (keyPresses === "Control+b") {
    toggleExplorer();
  } else if (keyPresses === "Control+`") {
    toggleTerminal();
  } else {
    console.log("No command found for: ", keyPresses);
  }
}

function toggleExplorer() {
  const root = document.documentElement;
  const explorer = document.getElementById("explorer") as HTMLDivElement;

  if (!explorer) return;

  const isCollapsed = explorer.classList.contains("collapsed");

  if (isCollapsed) {
    // Expand
    explorer.classList.remove("collapsed");
    // root.style.setProperty("--explorer-width", "15rem");
  } else {
    // Collapse
    explorer.classList.add("collapsed");
    // root.style.setProperty("--explorer-width", "2.5rem"); // keep the column
  }
}

function toggleTerminal() {
  const terminal = document.querySelector(
    "[data-name=terminal]"
  ) as HTMLDivElement;

  if (terminal) {
    terminal.classList.toggle("hide");
  }
}

export default MyApp;
