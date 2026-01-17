import { useState } from "react"
import "./App.css"

export default function App() {
  const [deployments, setDeployments] = useState(128)

  return (
    <div className="app">
    
      <header className="header">
        <h1 className="logo">Zellr</h1>
        <p className="tagline">
          Deploy React apps globally in seconds 
        </p>
      </header>

   
      <main className="card">
        <h2>React Deployment Test</h2>
        <p className="description">
          This app is deployed using <strong>Zellr</strong>, a fast and
          developer-friendly deployment platform for modern React applications.
        </p>

        <div className="stats">
          <span>Total Deployments</span>
          <strong>{deployments}</strong>
        </div>

        <button
          className="deploy-btn"
          onClick={() => setDeployments((d) => d + 1)}
        >
          Trigger New Deployment
        </button>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          Built with ❤️ using React • Powered by <strong>Zellr</strong>
        </p>
      </footer>
    </div>
  )
}
