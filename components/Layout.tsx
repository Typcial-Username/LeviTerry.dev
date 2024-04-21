import HelpBar from "./HelpBar";
// import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";

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
  let explorer: HTMLDivElement | undefined;
  let selected: HTMLDivElement | undefined;

  useEffect(() => {
    explorer = document.getElementById("#explorer") as HTMLDivElement;

    if (explorer) {
      selected = explorer.getElementsByClassName(
        ".selected"
      )[0] as HTMLDivElement;
    }

    console.log({ explorer, selected });
  }, []);

  return (
    <>
      <HelpBar />
      <ExplorerNoSSR />
      <SidebarNoSSR />

      <HeaderNoSSR
        file={
          typeof window !== "undefined"
            ? pathName(window.location.pathname)
            : "unknown.html"
        }
        extension={selected?.innerText.split(".")[1] || "html"}
      />

      <main className="container">
        {children}

        <br />

        {/* <div className="container"> */}
        <div className="typing">
          <div className="blinker"></div>
          {" " + days[date.getDay()]}!
        </div>
        <a
          href="https://github.com/Typcial-Username/LeviTerry.dev"
          target="_blank"
          rel="noreferrer"
        >
          View Source
        </a>
        {/* </div> */}
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
