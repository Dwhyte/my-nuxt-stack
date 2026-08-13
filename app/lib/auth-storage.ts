import type { AuthUser } from '~/types/trpc'

export type { AuthUser }

export function saveAuthUser(_user: AuthUser): void {
  // Session is cookie-based via Better Auth; user profile comes from tRPC `user.me`.
}

export function getAuthUser(): AuthUser | null {
  return null
}

export function saveAuthToken(_token: string, _expiresInSeconds: number): void {}

export function saveAuthResponse(_payload: {
  token: string
  expiresIn: number
  user: AuthUser
}): void {}

export function getAuthToken(): string | null {
  return null
}

export function isTokenExpired(): boolean {
  return false
}

export async function isAuthenticated(): Promise<boolean> {
  if (import.meta.server) {
    return false
  }

  const { isAuthenticatedSession } = await import('~/lib/auth-client')
  return isAuthenticatedSession()
}

export function clearAuthData(): void {}

export function consumeRedirectAfterLogin(): string | null {
  if (typeof sessionStorage === 'undefined') {
    return null
  }

  const redirect = sessionStorage.getItem('redirect_after_login')
  sessionStorage.removeItem('redirect_after_login')

  return redirect
}
