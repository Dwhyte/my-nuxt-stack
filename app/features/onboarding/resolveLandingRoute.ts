export type LandingRouteUser = {
  onboardingCompleted: boolean
}

export function resolveLandingRoute(user: LandingRouteUser): string {
  if (!user.onboardingCompleted) {
    return '/onboarding/name'
  }

  return '/dashboard'
}

export function toLandingRouteUserFromAuth(user: {
  onboardingCompleted: boolean
}): LandingRouteUser {
  return {
    onboardingCompleted: user.onboardingCompleted,
  }
}

const UNSAFE_POST_AUTH_PREFIXES = [
  '/login',
  '/loading',
  '/auth/',
  '/onboarding',
]

export function isSafePostAuthRedirect(
  path: string | null | undefined,
): path is string {
  if (!path || !path.startsWith('/')) {
    return false
  }

  return !UNSAFE_POST_AUTH_PREFIXES.some((prefix) => path.startsWith(prefix))
}

export function resolvePostAuthDestination(
  user: LandingRouteUser,
  storedRedirect?: string | null,
  queryRedirect?: string | null,
): string {
  if (!user.onboardingCompleted) {
    return resolveLandingRoute(user)
  }

  if (isSafePostAuthRedirect(storedRedirect)) {
    return storedRedirect
  }

  if (isSafePostAuthRedirect(queryRedirect)) {
    return queryRedirect
  }

  return '/dashboard'
}
