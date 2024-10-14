import HelpBar from "./HelpBar";
// import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";
import dynamic from "next/dynamic";
import { useContext, useEffect, useRef } from "react";
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

  useEffect(() => {
    explorerRef.current = document.getElementById(
      "#explorer"
    ) as HTMLDivElement;

    if (explorerRef.current) {
      selectedRef.current = explorerRef.current.getElementsByClassName(
        styles.selected
      )[0] as HTMLDivElement;
    }

    console.log({
      explorer: explorerRef.current,
      selected: selectedRef.current,
    });
  }, []);

  return (
    <>
      <ExplorerNoSSR />
      <SidebarNoSSR />
      <HelpBar />

      <HeaderNoSSR
        file={
          typeof window !== "undefined"
            ? pathName(window.location.pathname)
            : "unknown.html"
        }
        extension={selectedRef.current?.innerText.split(".")[1] || "html"}
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
