import { NextPage } from "next";
import styles from "../styles/About.module.css";
import { useEffect } from "react";

import { AboutData } from "../../public/About.json";
import Head from "next/head";
import Link from "next/link";

const About: NextPage = () => {
  useEffect(() => {
    calculateLineNums();
  }, []);

  return (
    <>
      <Head>
        <title>Levi Terry&apos;s Developer Portfolio | About</title>
      </Head>

      <aside className={styles.line_numbers}>
        <ol></ol>
      </aside>

      <div className={styles.code}>
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
              {formatJson(getValue(AboutData, key))}
              {key !== Object.keys(AboutData)[Object.keys(AboutData).length - 1] && (
                <p className={styles.json}>,</p>
              )}
            </span>
          );
        })}

        <p style={{ color: "var(--clr-json-bracket)" }}>{"}"}</p>
      </div>
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

function setJsonStyle(element: string | number | boolean | object | null) {
  if (Array.isArray(element)) {
    return { color: `var(--clr-json-array)` };
  }
  return { color: `var(--clr-json-${typeof element})` };
}

function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

function getValue(obj: object, key: string) {
  if (hasKey(obj, key)) {
    return obj[key];
  }

  return null;
}

function formatJson(
  json: object | string | number | boolean | null,
  indentLevel: number = 0,
  isLastItem: boolean = false
) {
  let curIdx = 0;

  // console.log("Formatting JSON: ", json, idx);

  // Check if the json is an array
  if (Array.isArray(json)) {
    const arr = json as any[];

    let wrap = arr.some((val) => typeof val === 'string' && val.length > 50);

    // for (let i = 0; i < arr.length; i++) {
    //   if (arr[i].length > 50) {
    //     wrap = true;
    //     break;
    //   }
    // }

    return (
      <span className={styles.json}>
        <p className={styles.json} style={{ color: "var(--clr-json-array)" }}>
          [
        </p>
        {/* If the array doesn't have to wrap */}
        {!wrap &&
          arr.map((val, index) => (
            <span key={index}>
              <p className={styles.json} style={setJsonStyle(val)}>
                &quot;{typeof val === 'string' && val.startsWith('http') ? <Link href={val}>{val}</Link> : val}&quot;
              </p>
              {index < arr.length - 1 && (
                <p className={styles.json}>,&nbsp;</p>
              )}
            </span>
          ))}

        {/* If the array has to wrap */}
        {wrap &&
          arr.map((val, index) => (
            <span key={index}>
              <br />
              <p className={styles.json}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              <p className={styles.json} style={setJsonStyle(val)}>
                &quot;{typeof val === 'string' && val.startsWith('http') ? <Link href={val}>{val}</Link> : val}&quot;
              </p>
              {index < arr.length - 1 && <p className={styles.json}>,</p>}
            </span>
          ))}

        {/* Add ] if the array didn't wrap */}
        {!wrap && (
          <p
            className={styles.json}
            style={{ color: "var(--clr-json-array)" }}
          >
            ]
          </p>
        )}

        {/* Add ] if the array did wrap */}
        {wrap && (
          <>
            <br />
            <p className={styles.json}>&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p
              className={styles.json}
              style={{ color: "var(--clr-json-array)" }}
            >
              ]
            </p>
          </>
        )}
        {curIdx !== indentLevel - 1 && <p className={styles.json}>,</p>}
      </span>
    );
  } else if (typeof json === "object") {
    const obj = json as { [key: string]: any };
    const keys = Object.keys(obj);

    return (
      <span className={styles.json}>
        <p className={styles.json} style={{ color: "var(--clr-json-bracket)" }}>
          {"{"}
        </p>

        {keys.map((key, index) => {
          // curIdx = index;
          return (
            <span key={key}>
              <br />
              <p className={styles.json}>&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p
                className={styles.json}
                style={{ color: "var(--clr-json-key)" }}
              >
                &quot;{key}&quot;
              </p>

              <p className={styles.json}>:&nbsp;</p>
              {hasKey(obj, key) && typeof obj[key] === "object" && (
                <div className={styles.json}>
                  {formatJson(obj[key], index + 1)}
                </div>
              )}

              {hasKey(obj, key) && typeof obj[key] !== "object" && (
                <p className={styles.json} style={setJsonStyle(obj[key])}>
                  {typeof obj[key] === 'string' && obj[key].startsWith('http') ? 
                    <span>&quot;<Link href={obj[key]} target="_blank">{obj[key]}</Link>&quot;</span> : 
                    JSON.stringify(obj[key])
                  }
                </p>
              )}
              
              {index !== Object.keys(obj).length - 1 && (
                <p className={styles.json}>,</p>
              )}
            </span>
          );
        })}

        <br />
        <p className={styles.json}>&nbsp;&nbsp;</p>
        <p className={styles.json} style={{ color: "var(--clr-json-bracket)" }}>
          {"}"}
        </p>
      </span>
    )
  }
  // } else if (typeof json === "string") {
  //   return (
  //     <>
  //       <p className={styles.json} style={{ color: "var(--clr-json-string)" }}>
  //       &quot;{json}&quot;
  //       </p>
  //       {curIdx !== indentLevel - 1 && <p className={styles.json}>,</p>}
  //     </>
  //   );
  // } else if (typeof json === "boolean") {
  //   return json ? "true" : "false";
  // } else if (typeof json === "number") {
  //   return (
  //     <>
  //       <p className={styles.json} style={{ color: "var(--clr-json-number)" }}>
  //         {json}
  //       </p>
  //       {curIdx !== indentLevel - 1 && <p className={styles.json}>,</p>}
  //     </>
  //   );
  // } else {
  //   console.log("Unknown type: ", json);
  //   return json;
  // }
  else {
    const formattedValue = formatPrimitiveValue(json);
    if (formattedValue) {
      return (
        <>
          {formattedValue}
          {curIdx !== indentLevel - 1 && <p className={styles.json}>,</p>}
        </>
      );
    }
    return null;
  }
}

function formatPrimitiveValue(value: any) {
  if (typeof value === "string") {
    if (value.startsWith("http")) {
      return (
        <Link href={value} target="_blank">&quot;{value}&quot;</Link>
      )
    }

    return (
      <p className={styles.json} style={{ color: "var(--clr-json-string)" }}> 
        &quot;{value}&quot;
      </p>
    );
  } else if (typeof value === "boolean") {
    return (
      <p className={styles.json} style={{ color: "var(--clr-json-boolean)" }}>
        {value ? "true" : "false"}
      </p>
    );
  } else if (typeof value === "number") {
    return (
      <p className={styles.json} style={{ color: "var(--clr-json-number)" }}>
        {value}
      </p>
    );
  } else {
    console.log("Unknown type: ", value);
    return value;
  }
}

export default About;
