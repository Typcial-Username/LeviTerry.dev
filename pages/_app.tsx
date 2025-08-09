import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "../components/Layout";
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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
  ); 
  {/* </ReCaptchaProvider> */}
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
  const explorer = document.getElementById("explorer") as HTMLDivElement;

  const root = document.querySelector(":root") as HTMLElement;

  if (
    explorer &&
    (!explorer.style.display || explorer.style.display === "block")
  ) {
    explorer.style.display = "none";
    root.style.setProperty("--main-m-left", "2.5rem");
  } else if (explorer && explorer.style.display === "none") {
    explorer.style.display = "block";
    root.style.setProperty("--main-m-left", "17.5rem");
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
