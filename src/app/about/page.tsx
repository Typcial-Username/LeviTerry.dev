"use client";

import { NextPage } from "next";
import styles from "../../styles/About.module.css";
import { useEffect } from "react";

import YAML from "yaml";

import * as AboutData from "../../../public/about.yaml";
import Link from "next/link";
import { YamlNode } from "../../components/YamlLoader";

const About: NextPage = () => {
  useEffect(() => {
    calculateLineNums();
  }, []);

  return (
    <>
      <aside className={styles.line_numbers}>
        <ol></ol>
      </aside>

      {renderYamlFile(AboutData)}

      {/* <div className={styles.code}>
        <p style={{ color: "var(--clr-json-bracket)" }}>{"{"}</p>

        {Object.keys(AboutData).map((key) => {
          return (
            <span key={key}>
              <p
                className={styles.json}
                style={{ color: "var(--clr-json-key)" }}
              >
                &nbsp;&nbsp;&quot;{key}&quot;
              </p>
              <p className={styles.json} key={key + ":"}>
                :&nbsp;
              </p>
              {renderYamlFile(getValue(AboutData, key))}
              {key !==
                Object.keys(AboutData)[Object.keys(AboutData).length - 1] && (
                <p className={styles.json}>,</p>
              )}
            </span>
          );
        })}

        <p style={{ color: "var(--clr-json-bracket)" }}>{"}"}</p>
      </div> */}
    </>
  );
};

function calculateLineNums() {
  const lineNumbers = document.querySelector(
    `.${styles.line_numbers} ol`
  ) as HTMLOListElement;
  const code = document.querySelector(`.${styles.code}`) as HTMLDivElement;

  if (lineNumbers && code && !lineNumbers.children.length) {
    const contentHeight = code.offsetHeight;
    const lineHeight = getLineHeight(code);
    const lines = Math.ceil(contentHeight / Math.ceil(lineHeight));

    if (Number.isInteger(lines)) {
      for (let i = 0; i <= lines + 1; i++) {
        const li = document.createElement("li") as HTMLLIElement;
        li.textContent = `${i + 1}`;
        lineNumbers.appendChild(li);
      }
    }
  }
}

function getLineHeight(element: HTMLElement): number {
  const style = window.getComputedStyle(element, null);
  let lineHeight = style.getPropertyValue("line-height");

  let line_height: number;

  if (lineHeight === "normal") {
    // Normal line heights can't be computed, so we use a standard value
    const fontSize = style.getPropertyValue("font-size");
    line_height = parseFloat(fontSize) * 1.2;
  } else {
    line_height = parseFloat(lineHeight);
  }

  return line_height;
}

function isPrimitive(val: any) {
  return (
    typeof val === "string" ||
    typeof val === "number" ||
    typeof val === "boolean" ||
    val === null
  );
}

function renderPrimitive(value: any) {
  if (typeof value === "string") {
    if (value.startsWith("http")) {
      return (
        <>
          <Link href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </Link>
        </>
      );
    }
    return value;
  }

  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return value;

  if (value === null) return "null";

  return String(value);
}

function setJsonStyle(element: string | number | boolean | object | null) {
  if (Array.isArray(element)) {
    return { color: `var(--clr-json-array)` };
  }
  return { color: `var(--clr-json-${typeof element})` };
}

export function renderYamlFile(input: string | object) {
  let parsed;

  try {
    parsed = typeof input === "string" ? YAML.parse(input) : input;
  } catch {
    return <div style={{ color: "red" }}># Invalid YAML</div>;
  }

  return <div className={styles.editor}>{formatYaml(parsed, 0)}</div>;
}

function formatYaml(data: any, indent: number): JSX.Element {
  const spacing = "  ".repeat(indent);

  if (Array.isArray(data)) {
    return (
      <>
        {data.map((item, i) => (
          <div key={i}>
            <span className={styles.line}>
              {spacing}
              <span style={{ color: "var(--clr-yaml-dash)" }}>- </span>
            </span>

            {isPrimitive(item) ?
              <span style={setJsonStyle(item)}>{renderPrimitive(item)}</span>
            : <div>{formatYaml(item, indent + 1)}</div>}
          </div>
        ))}
      </>
    );
  }

  if (typeof data === "object" && data !== null) {
    return (
      <>
        {Object.entries(data).map(([key, value]) => {
          const isComplex = typeof value === "object" && value !== null;

          return (
            <YamlNode
              key={key}
              label={
                <span className={styles.line}>
                  {spacing}
                  <span style={{ color: "var(--clr-json-key)" }}>{key}</span>
                  {!isComplex && (
                    <>
                      <span>: </span>
                      <span style={setJsonStyle(value)}>
                        {renderPrimitive(value)}
                      </span>
                    </>
                  )}
                </span>
              }
            >
              {isComplex ? formatYaml(value, indent + 1) : null}
            </YamlNode>
          );
        })}
      </>
    );
  }

  return <span style={setJsonStyle(data)}>{renderPrimitive(data)}</span>;
}

export default About;
