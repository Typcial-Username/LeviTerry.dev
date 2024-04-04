'use client';
import HelpBar from "./HelpBar";
import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";
import dynamic from "next/dynamic";
import { useContext } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const HeaderNoSSR = dynamic(() => import("./Header"), { ssr: false });
const ExplorerNoSSR = dynamic(() => import("./Explorer"), { ssr: false });

export default function Layout({ children }: LayoutProps) {
  // console.log(localStorage?.getItem("explorer-location"));
  return (
    <>
      <HelpBar />
      <ExplorerNoSSR
        enabled={true}
        showing={
          typeof localStorage !== "undefined"
            ? `${localStorage.getItem("explorer-location")}`
            : "files"
        }
      />
      <Sidebar />

      {/*localStorage.getItem("explorer-location") as string*/}

      <HeaderNoSSR
        file={
          typeof window !== "undefined"
            ? pathName(window.location.pathname) + ".html"
            : "unknown.html"
        }
      />
      <main className="container">{children}</main>
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
