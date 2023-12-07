"use client";

import Header from "./Header";
import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";
import { Explorer } from "./Explorer";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Sidebar />
      <Explorer enabled={true} showing={"files"} />

      {/*localStorage.getItem("explorer-location") as string*/}
      <Header
        file={
          typeof window === undefined
            ? `${window.location.pathname.split("")[1]}.html`
            : "404.html"
        }
      />
      <main>{children}</main>
      <Terminal />
    </>
  );
}
