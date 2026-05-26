import { useState, useCallback } from "react"
import "./Login.css"

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginProps {
  /** Callback when login is successful */
  onSubmit: (credentials: LoginCredentials) => Promise<void>
  /** Error message to display (optional) */
  error?: string | null
  /** Whether form is being submitted */
  isLoading?: boolean
  /** Link to sign-up page */
  signUpLink?: string
  /** Link to forgot password page */
  forgotPasswordLink?: string
}

export interface LoginFieldError {
  message: string
}

/**
 * Login form component
 */
export function Login({
  onSubmit,
  error: globalError,
  isLoading = false,
  signUpLink = "/signup",
  forgotPasswordLink = "/forgot-password",
}: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [localError, setLocalError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  /**
   * Validate the form before submission
   */
  const validate = useCallback((): LoginFieldError[] => {
    const errors: LoginFieldError[] = []

    // Username validation
    if (!username.trim()) {
      errors.push({ message: "Username is required" })
    } else if (username.trim().length < 3) {
      errors.push({ message: "Username must be at least 3 characters" })
    }

    // Password validation
    if (!password) {
      errors.push({ message: "Password is required" })
    } else if (password.length < 6) {
      errors.push({ message: "Password must be at least 6 characters" })
    }

    return errors
  }, [username, password])

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate fields
    const validationErrors = validate()
    if (validationErrors.length > 0) {
      setFieldErrors(
        validationErrors.reduce((acc, err) => ({ ...acc, [err.message.toLowerCase()]: err.message }), {})
      )
      setLocalError(null)
      return
    }

    // Clear field errors on submit
    setFieldErrors({})

    try {
      await onSubmit({ username: username.trim(), password })
      // Clear state after successful login
      setUsername("")
      setPassword("")
      setLocalError(null)
    } catch (err) {
      // Handle API errors
      if (err instanceof Error) {
        // Try to extract field-specific errors from response
        if (typeof err === "object" && "error" in err) {
          const responseError = err as { error: { username?: string; password?: string; message?: string } }
          setFieldErrors((prev) => ({
            ...prev,
            username: responseError.error.username || "",
            password: responseError.error.password || "",
          }))
        }
        setLocalError(err.message || "Login failed. Please try again.")
      } else {
        setLocalError("An unexpected error occurred")
      }
    }
  }

  /**
   * Reset field errors when input changes
   */
  const handleUsernameChange = (value: string) => {
    setUsername(value)
    // Clear username-related errors
    setFieldErrors((prev) => {
      const { username: _, ...rest } = prev
      return rest
    })
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    // Clear password-related errors
    setFieldErrors((prev) => {
      const { password: _, ...rest } = prev
      return rest
    })
  }

  /**
   * Handle click outside password input to clear password
   */
  const handlePasswordClickOutside = () => {
    setPassword("")
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your account</p>

        {globalError && (
          <div className="global-error" role="alert">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className={`form-input ${fieldErrors["username is required"] || fieldErrors["username must be at least 3 characters"] ? "error" : ""}`}
              placeholder="Enter your username"
              disabled={isLoading}
            />
            {fieldErrors["username is required"] && fieldErrors["username must be at least 3 characters"] && (
              <span className="field-error">
                {fieldErrors["username is required"]}
                {fieldErrors["username must be at least 3 characters"] && " "}{fieldErrors["username must be at least 3 characters"]}
              </span>
            )}
          </div>

          <div className="form-group">
            <div className="password-input-wrapper">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className={`form-input ${fieldErrors["password is required"] || fieldErrors["password must be at least 6 characters"] ? "error" : ""}`}
                placeholder="Enter your password"
                onClick={handlePasswordClickOutside}
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={(e) => {
                  e.preventDefault()
                  const input = e.currentTarget.parentElement?.querySelector("input") as HTMLInputElement
                  if (input) {
                    input.type = input.type === "password" ? "text" : "password"
                  }
                }}
                disabled={isLoading}
                aria-label={password ? "Hide password" : "Show password"}
              >
                {password ? "👁️" : "🔒"}
              </button>
            </div>
            {fieldErrors["password is required"] && fieldErrors["password must be at least 6 characters"] && (
              <span className="field-error">
                {fieldErrors["password is required"]}
                {fieldErrors["password must be at least 6 characters"] && " "}{fieldErrors["password must be at least 6 characters"]}
              </span>
            )}
          </div>

          {localError && (
            <div className="form-error" role="alert">
              {localError}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner">⏳</span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="login-links">
          <p>
            Don't have an account?{" "}
            <a href={signUpLink} className="login-link">
              Sign up
            </a>
          </p>
          <p>
            <a href={forgotPasswordLink} className="login-link">
              Forgot password?
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
