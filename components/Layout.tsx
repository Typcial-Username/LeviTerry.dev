'use client'

import HelpBar from "./HelpBar";
// import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";
import dynamic from "next/dynamic";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Explorer.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const HeaderNoSSR = dynamic(() => import("./Header"), { ssr: false });
const ExplorerNoSSR = dynamic(() => import("./Explorer"), { ssr: false });
const SidebarNoSSR = dynamic(() => import("./Sidebar"), { ssr: false });

const date = new Date(Date.now());
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Layout({ children }: LayoutProps) {
  const explorerRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLDivElement | null>(null);
  const [selectedExtension, setSelectedExtension] = useState("html");

  useEffect(() => {
    const timeout = setTimeout(() => {
    const explorer = document.getElementById("explorer") as HTMLDivElement;
    if (!explorer) {
      console.error("Explorer element not found");
      return;
    }

    explorerRef.current = explorer;

    if (explorerRef.current) {
      selectedRef.current = explorerRef.current.querySelector(`.${styles.selected}`) as HTMLDivElement | null;
    }

     const findSelected = () => {
        const selected = explorer.querySelector(`.${styles.selected}`) as HTMLDivElement | null;
        if (selected?.innerText.includes(".")) {
          const ext = selected.innerText.split(".").pop();
          if (ext) setSelectedExtension(ext);
        }
      };

    findSelected();

    const observer = new MutationObserver(findSelected);

    observer.observe(explorer, { childList: true, subtree: true, attributes: true });

    console.log({
      explorer: explorerRef.current,
      selected: selectedRef.current,
    });
  

    return () => {
      observer.disconnect()
    };
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <ExplorerNoSSR />
      <SidebarNoSSR />
      <HelpBar />

      <HeaderNoSSR
        file={
          typeof window !== "undefined" ?
            pathName(window.location.pathname)
          : "unknown.html"
        }
        extension={selectedExtension}
      />

      <main className="container">
        {children}
        <br />
      </main>

      <Terminal />
    </>
  );
}

function pathName(path: string): string {
  let newPath = path.split("/")[1];

  if (newPath.toLowerCase() == "") {
    newPath = "index";
  }

  return newPath;
}
