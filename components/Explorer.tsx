"use client";
import React, { useEffect } from "react";
import styles from "../styles/Explorer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faGithub,
  faLinkedin,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDownload,
  faAngleDown,
  faFileCode,
  faAngleRight,
  faImage,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/router";
import { Folder } from "./Folder";

// Dynamic file structure configuration
interface FileItem {
  name: string;
  path?: string;
  icon: IconProp;
  iconColor?: string;
  type: 'file' | 'folder' | 'link';
  children?: FileItem[];
  url?: string;
  target?: string;
}

const fileStructure: FileItem[] = [
  {
    name: "Pages",
    type: "folder",
    icon: faAngleDown,
    children: [
      {
        name: "index.html",
        path: "/",
        type: "file",
        icon: faHtml5,
        iconColor: "var(--clr-html-icon)"
      },
      {
        name: "about.json",
        path: "/about",
        type: "file",
        icon: faFileCode,
        iconColor: "var(--clr-html-icon)"
      },
      {
        name: "gallery.html",
        path: "/gallery",
        type: "file",
        icon: faHtml5,
        iconColor: "var(--clr-html-icon)"
      },
      {
        name: "UAT",
        type: "folder",
        icon: faAngleDown,
        children: [
          {
            name: "sip.html",
            path: "/uat/sip",
            type: "file",
            icon: faHtml5,
            iconColor: "var(--clr-html-icon)"
          }
        ]
      }
    ]
  },
    {
    name: "Tools",
    type: "folder",
    icon: faAngleDown,
    children: [
      {
        name: "Sound Modulator",
        path: "/tools/sound-modulator",
        type: "file",
        icon: faWaveSquare,
        iconColor: "var(--clr-icon)"
      }
    ]
  },
  {
    name: "Socials",
    type: "folder",
    icon: faAngleDown,
    children: [
      {
        name: "GitHub",
        type: "link",
        icon: faGithub,
        url: "https://github.com/Typcial-Username",
        target: "_blank"
      },
      {
        name: "LinkedIn",
        type: "link",
        icon: faLinkedin,
        iconColor: "#0a66c2",
        url: "https://linkedin.com/in/levi-terry-dev/",
        target: "_blank"
      },
      {
        name: "Stack Overflow",
        type: "link",
        icon: faStackOverflow,
        iconColor: "orange",
        url: "https://stackoverflow.com/users/15316502/typical-username",
        target: "_blank"
      }
    ]
  }
];

const Explorer = () => {
  const [headerOpen, setHeaderOpen] = React.useState(true);
  const [host, setHost] = React.useState("localhost");
  const [folderStates, setFolderStates] = React.useState<{[key: string]: boolean}>({});
  const router = useRouter();

  useEffect(() => {
    setHost(window.location.host);
    
    // Initialize folder states - all folders closed by default, but Pages open
    const initializeFolderStates = (items: FileItem[], path: string = '') => {
      const states: {[key: string]: boolean} = {};
      items.forEach((item, index) => {
        if (item.type === 'folder') {
          const folderPath = path ? `${path}.${index}` : `${index}`;
            // Open "Pages" folder and its subdirectories by default
            states[folderPath] = item.name === 'Pages' || path.startsWith('0');
          if (item.children) {
            Object.assign(states, initializeFolderStates(item.children, folderPath));
          }
        }
      });
      return states;
    };
    
    setFolderStates(initializeFolderStates(fileStructure));
  }, []);

  const toggleFolder = (path: string) => {
    setFolderStates(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderFileItem = (item: FileItem, index: number, depth: number = 0, parentPath: string = '') => {
    const currentPath = parentPath ? `${parentPath}.${index}` : `${index}`;
    const isOpen = folderStates[currentPath];
    const isSelected = item.path && router.pathname === item.path;

    // Get depth class for consistent indentation
    const getDepthClass = (itemDepth: number, isFolder: boolean) => {
      if (isFolder) {
        // Root folders stay at depth 0, nested folders get proper indentation
        if (itemDepth === 0) return styles.depth0;
        return itemDepth === 1 ? styles.depth1 : itemDepth === 2 ? styles.depth2 : styles.depth3;
      } else {
        // Files: depth 0 files use depth1, depth 1 files use depth2, etc.
        return itemDepth === 0 ? styles.depth1 : itemDepth === 1 ? styles.depth2 : styles.depth3;
      }
    };

    if (item.type === 'folder') {
      return (
        <div key={currentPath}>
          <Folder
            enabled={isOpen}
            className={`${styles.item} ${styles.dropdown} ${getDepthClass(depth, true)}`}
            onClick={() => toggleFolder(currentPath)}
          >
            {item.name}
          </Folder>
          
          {item.children && (
            <div style={{ display: isOpen ? 'block' : 'none' }}>
              {item.children.map((child, childIndex) => 
                renderFileItem(child, childIndex, depth + 1, currentPath)
              )}
            </div>
          )}
        </div>
      );
    }

    // Render files and links
    const itemContent = (
      <div
        className={`${styles.item} ${isSelected ? styles.selected : ''} ${styles.subMenu} ${getDepthClass(depth, false)}`}
        key={currentPath}
      >
        <span>
          <FontAwesomeIcon 
            icon={item.icon} 
            color={item.iconColor || "var(--clr-icon)"} 
          />{" "}
        </span>
        
        {item.type === 'file' && item.path ? (
          <Link href={item.path} style={{ display: 'inline' }}>
            {item.name}
          </Link>
        ) : item.type === 'link' && item.url ? (
          <Link
            href={item.url}
            target={item.target || "_blank"}
            aria-label={`Visit ${item.name}`}
            title={item.name}
          >
            {item.name}
          </Link>
        ) : (
          <p style={{ display: "inline" }}>{item.name}</p>
        )}
      </div>
    );

    return itemContent;
  };

  return (
    <div id="explorer" className={styles.explorer}>
      <p className={styles.header}>Explorer</p>
      <button
        className={`${styles.content} ${styles.item} ${styles.dropdown}`}
        onClick={() => setHeaderOpen(!headerOpen)}
      >
        <span>
          {headerOpen ? (
            <>
              <FontAwesomeIcon icon={faAngleDown} />{" "}
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faAngleRight} />{" "}
            </>
          )}
          <p style={{ display: "inline-block" }}>{host}</p>
        </span>
      </button>

      <div
        style={
          headerOpen
            ? { display: "block", marginTop: "2.5%" }
            : { display: "none" }
        }
        className={`${styles.item} ${styles.dropdown}`}
      >
        {fileStructure.map((item, index) => renderFileItem(item, index))}
      </div>
    </div>
  );
};

export default Explorer;
