import styles from "../styles/Terminal.module.css";

export const Terminal = () => {
  return (
    <div
      className="container"
      name="terminal"
      id={styles.terminal}
      style={{
        borderTop: "1px solid whitesmoke",
        backgroundColor: "var(--clr-bg)",
      }}
    >
      <span className={styles.topBar}>
        <p className={styles.header}>Terminal</p>

        <button id="close-btn" className={styles.close} onClick={closeMenu}>&times;</button>
      </span>

      <div className={styles.text}>
        {/* {"visitor@leviterry.dev>"} */}
        <form onSubmit={onSubmit}>
          <textarea
            name="terminal"
            defaultValue={"visitor@leviterry.dev> "}
            className={styles.text}
          ></textarea>
        </form>
      </div>
    </div>
  );
};

// React.FormEvent<HTMLInputElement>
const onSubmit = (event: any) => {
  event.preventDefault();
  console.log(event.target);
};

function closeMenu() {
  // const btn = document.getElementById('close-btn')
  const terminal = document.getElementById(styles.terminal)
  console.log(terminal)

  console.log("Adding hide class to terminal...")
  terminal?.classList.add(styles.hide)
}