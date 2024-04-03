import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { useCallback, useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const handleKeypress = useCallback((event: KeyboardEvent) => {
    console.log("Key Pressed: ", event.key);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeypress);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
    };
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
