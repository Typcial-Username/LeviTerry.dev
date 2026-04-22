import { useState } from "react";

import styles from "../styles/YamlNode.css";

export function YamlNode({
  label,
  children,
  defaultOpen = true,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <div
        className={styles.line}
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        <span style={{ color: "var(--clr-muted)" }}>{open ? "▼" : "▶"}</span>{" "}
        {label}
      </div>

      {open && <div>{children}</div>}
    </div>
  );
}
