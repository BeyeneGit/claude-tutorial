import { useState } from "react"
import { Link } from "react-router-dom"
import { Login } from "../components/Login"
import "./LoginPage.css"

/**
 * LoginPage Component
 * A complete login page with form validation, error handling, and responsive design
 */
export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  const handleLoginSubmit = async (credentials: { username: string; password: string }) => {
    setIsLoading(true)
    setGlobalError(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (credentials.username === "demo" && credentials.password === "demo") {
      // Successful login
      window.location.href = "/"
    } else {
      // Failed login
      setGlobalError("Invalid username or password. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="login-page">
      <header className="page-header">
        <div className="header-content">
          <h1>App Title</h1>
          <nav className="page-nav">
            <Link to="/">Home</Link>
            <a href="/about" className="login-link">
              About
            </a>
          </nav>
        </div>
      </header>

      <main className="page-content">
        <div className="login-container-full">
          <Login
            onSubmit={handleLoginSubmit}
            error={globalError}
            isLoading={isLoading}
            signUpLink="/signup"
            forgotPasswordLink="/forgot-password"
          />
        </div>
      </main>

      <footer className="page-footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <nav className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
