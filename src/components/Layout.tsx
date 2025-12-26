'use client'

import HelpBar from "./HelpBar";
import { Terminal } from "./Terminal";
import dynamic from "next/dynamic";
import { useContext, useEffect, useRef, useState } from "react";
// import styles from "../styles/";

const HeaderNoSSR = dynamic(() => import("./Header"), { ssr: false });
const ExplorerNoSSR = dynamic(() => import("./Explorer"), { ssr: false });
const SidebarNoSSR = dynamic(() => import("./Sidebar"), { ssr: false });

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const explorerRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLDivElement | null>(null);
  const [selectedExtension, setSelectedExtension] = useState("html");
  const [selectedFileName, setSelectedFileName] = useState(() => {
    // Initialize with URL path as fallback
    if (typeof window !== "undefined") {
      return pathName(window.location.pathname);
    }
    return "index";
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
    const explorer = document.getElementById("explorer") as HTMLDivElement;
    if (!explorer) {
      console.error("Explorer element not found");
      return;
    }

    explorerRef.current = explorer;

    if (explorerRef.current) {
      selectedRef.current = explorerRef.current.querySelector(`styles.selected`) as HTMLDivElement | null;
    }

     const findSelected = () => {
        const selected = explorer.querySelector(`styles.selected`) as HTMLDivElement | null;
        if (selected?.innerText) {
          const fullFileName = selected.innerText.trim();
          
          if (fullFileName.includes(".")) {
            // It's a file with extension
            const ext = fullFileName.split(".").pop();
            const nameWithoutExt = fullFileName.split(".").slice(0, -1).join(".");
            
            if (ext) setSelectedExtension(ext);
            setSelectedFileName(nameWithoutExt);
          } else {
            // It's a folder or file without extension
            setSelectedFileName(fullFileName);
            setSelectedExtension("html"); // Default extension
          }
        } else {
          // Fallback to URL path if no file is selected
          if (typeof window !== "undefined") {
            const urlFileName = pathName(window.location.pathname);
            setSelectedFileName(urlFileName);
            setSelectedExtension("html");
          }
        }
      };

    findSelected();

    const observer = new MutationObserver(findSelected);

    observer.observe(explorer, { childList: true, subtree: true, attributes: true });

    return () => {
      observer.disconnect()
    };
    }, 100); // Increased timeout to ensure explorer is fully loaded

    return () => clearTimeout(timeout);
  }, [selectedFileName, selectedExtension]);

  // Separate effect to handle URL changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleLocationChange = () => {
        const urlFileName = pathName(window.location.pathname);
        // Only update if no file is currently selected in explorer
        const explorer = document.getElementById("explorer");
        const selected = explorer?.querySelector(`.styles.selected`);
        
        if (!selected || !selected.textContent?.trim()) {
          setSelectedFileName(urlFileName);
          setSelectedExtension("html");
        }
      };

      // Handle initial load and navigation
      handleLocationChange();
      
      // Listen for browser navigation events
      window.addEventListener('popstate', handleLocationChange);
      
      return () => {
        window.removeEventListener('popstate', handleLocationChange);
      };
    }
  }, []);

  return (
    <>
      <ExplorerNoSSR />
      <SidebarNoSSR />
      <HelpBar />

      <HeaderNoSSR
        file={selectedFileName}
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
