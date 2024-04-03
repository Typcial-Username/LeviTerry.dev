import styles from "../styles/Terminal.module.css";

export const Terminal = () => {
  return (
    <div
      className="container"
      id={styles.terminal}
      style={{
        borderTop: "1px solid whitesmoke",
        backgroundColor: "var(--clr-bg)",
      }}
    >
      <p style={{ textDecoration: "underline" }}>TERMINAL</p>

      <div>
        {"visitor@leviterry.dev>"}
        <form onSubmit={onSubmit}>
          <textarea
            name="terminal"
            defaultValue={"visitor@leviterry.dev> "}
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
