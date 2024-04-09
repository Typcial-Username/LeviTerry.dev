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

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <HelpBar />
      <ExplorerNoSSR enabled={true} />
      <SidebarNoSSR />

      <HeaderNoSSR
        file={
          typeof window !== "undefined"
            ? pathName(window.location.pathname)
            : "unknown.html"
        }
        extension="html"
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
