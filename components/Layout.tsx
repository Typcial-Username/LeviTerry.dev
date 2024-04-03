// import Header from "./Header";
import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";
// import { Explorer } from "./Explorer";
import dynamic from "next/dynamic";
import { useContext } from "react";
// import dynamic from 'next/dynamic'

type LayoutProps = {
  children: React.ReactNode;
};

const HeaderNoSSR = dynamic(() => import("./Header"), { ssr: false });
const ExplorerNoSSR = dynamic(() => import("./Explorer"), { ssr: false });

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Sidebar />
      <ExplorerNoSSR
        enabled={true}
        showing={
          typeof localStorage !== "undefined"
            ? `${localStorage.getItem("explorer-location")}`
            : "files"
        }
      />

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
