import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(1);

  return (
    <div style={styles.page}>
      <h1 style={styles.logo}>Zellr</h1>

      <p style={styles.text}>
        React app deployed successfully.
      </p>

      <div style={styles.box}>
        <span style={styles.label}>Deployments</span>
        <strong style={styles.number}>{count}</strong>

        <button
          style={styles.button}
          onClick={() => setCount((c) => c + 1)}
        >
          New deploy
        </button>
      </div>

      <p style={styles.footer}>
        Powered by Zellr
      </p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "system-ui, sans-serif",
    gap: "16px",
  },

  logo: {
    fontSize: "2.5rem",
    fontWeight: 600,
    margin: 0,
  },

  text: {
    opacity: 0.8,
    margin: 0,
  },

  box: {
    border: "1px solid #fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    minWidth: "220px",
  },

  label: {
    fontSize: "0.9rem",
    opacity: 0.7,
  },

  number: {
    display: "block",
    fontSize: "2rem",
    margin: "8px 0",
  },

  button: {
    background: "#fff",
    color: "#000",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },

  footer: {
    fontSize: "0.8rem",
    opacity: 0.5,
  },
};
