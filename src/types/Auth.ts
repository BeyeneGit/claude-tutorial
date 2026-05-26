/**
 * TypeScript interfaces for authentication-related data
 */

/**
 * Credentials submitted during login
 */
export interface LoginCredentials {
  username: string
  password: string
}

/**
 * Successful login response
 */
export interface LoginResponse {
  token: string
  user: {
    id: string
    username: string
    email: string
  }
  expiresAt: string
}

/**
 * Error response from failed login
 */
export interface LoginError {
  username?: string
  password?: string
  generic?: string
}

/**
 * Combined error response
 */
export interface LoginErrorResponse extends LoginError {
  success: false
  error: LoginError
}

/**
 * Successful authentication response
 */
export interface LoginSuccessResponse extends LoginResponse {
  success: true
}

/**
 * Auth response union type
 */
export type AuthResponse = LoginSuccessResponse | LoginErrorResponse
