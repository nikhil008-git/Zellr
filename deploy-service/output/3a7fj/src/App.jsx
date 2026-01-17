import { useState } from "react";

export default function App() {
  const [deployments, setDeployments] = useState(128);

  return (
    <div style={styles.app}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>Zellr</h1>
        <p style={styles.tagline}>
          Deploy React apps globally in seconds 
        </p>
      </div>

      {/* Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>Deployment Test</h2>

        <p style={styles.description}>
          This React app is running on <strong>Zellr</strong>.  
          If you can see this, hot builds, state updates, and production
          rendering are working perfectly.
        </p>

        <div style={styles.stats}>
          <span>Total Deployments</span>
          <strong style={styles.count}>{deployments}</strong>
        </div>

        <button
          style={styles.button}
          onClick={() => setDeployments((d) => d + 1)}
        >
          Trigger New Deployment
        </button>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        Built with ❤️ using React · Powered by Zellr
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #0f172a 0%, #020617 60%)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "20px",
  },

  header: {
    textAlign: "center",
    marginBottom: "32px",
  },

  logo: {
    fontSize: "3rem",
    fontWeight: 800,
    background: "linear-gradient(90deg, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  },

  tagline: {
    opacity: 0.85,
    marginTop: "8px",
  },

  card: {
    background: "rgba(255,255,255,0.06)",
    padding: "28px",
    borderRadius: "18px",
    maxWidth: "420px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)",
  },

  title: {
    marginBottom: "12px",
  },

  description: {
    fontSize: "0.95rem",
    opacity: 0.85,
    lineHeight: 1.6,
  },

  stats: {
    marginTop: "24px",
    marginBottom: "24px",
    fontSize: "1.1rem",
  },

  count: {
    display: "block",
    fontSize: "2.2rem",
    marginTop: "6px",
  },

  button: {
    background: "linear-gradient(90deg, #38bdf8, #6366f1)",
    border: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "transform 0.15s ease, opacity 0.15s ease",
  },

  footer: {
    marginTop: "28px",
    fontSize: "0.8rem",
    opacity: 0.6,
  },
};
