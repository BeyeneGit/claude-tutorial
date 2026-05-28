import { useState } from "react"
import { Link } from "react-router-dom"

export function HomePage() {
  const [user, setUser] = useState<{ id: string; username: string; email: string } | null>(null)

  const handleLogin = () => {
    // Simulate login
    setUser({ id: "1", username: "demo", email: "demo@example.com" })
  }

  return (
    <section className="home-section">
      <div className="hero">
        <img src="../../src/assets/hero.png" className="base" width="170" height="179" alt="" />
        <img src="../../src/assets/react.svg" className="framework" alt="React logo" />
        <img src="../../src/assets/vite.svg" className="vite" alt="Vite logo" />
      </div>
      <div>
        <h1>Get started</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
        </p>
        <div className="home-actions">
          {!user ? (
            <>
              <button type="button" className="counter" onClick={handleLogin}>
                Sign In
              </button>
              <Link to="/login" className="learn-more">
                Learn more
              </Link>
            </>
          ) : (
            <button type="button" className="counter" onClick={() => setUser(null)}>
              Sign Out
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <div className="about-page">
      <h1>About This Application</h1>
      <p>
        This is a React tutorial application built with Vite. It demonstrates
        modern React development practices including component composition,
        styling with CSS custom properties, and responsive design.
      </p>
    </div>
  )
}
