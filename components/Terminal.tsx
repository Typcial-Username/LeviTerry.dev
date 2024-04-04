import styles from "../styles/Terminal.module.css";

export const Terminal = () => {
  return (
    <div
      className="container"
      data-name="terminal"
      id={styles.terminal}
      style={{
        borderTop: "1px solid whitesmoke",
        backgroundColor: "var(--clr-bg)",
      }}
    >
      <span className={styles.topBar}>
        <p className={styles.header}>Terminal</p>

        <button id="close-btn" className={styles.close} onClick={closeMenu}>
          &times;
        </button>
      </span>

      {/* <div className={styles.text}> */}
      <form onSubmit={onSubmit} className={styles.text}>
        <span>
          <label htmlFor="terminal">visitor@leviterry.dev {">"}</label>
          <textarea
            name="terminal"
            // defaultValue={"visitor@leviterry.dev> "}
            className={styles.text}
          />
        </span>
      </form>
      {/* </div> */}
    </div>
  );
};

// React.FormEvent<HTMLInputElement>
const onSubmit = (event: any) => {
  event.preventDefault();
  console.log(event.target);
};

function closeMenu() {
  // const btn = document.getElementById('close-btn')\
  console.log(styles.terminal);
  const terminal = document.getElementById(styles.terminal);
  console.log(terminal);

  console.log("Adding hide class to terminal...");
  terminal?.classList.add("hide");
}
