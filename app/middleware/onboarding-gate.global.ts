import { fetchCurrentUser } from '~/features/auth/fetchCurrentUser'
import {
  resolveLandingRoute,
  toLandingRouteUserFromAuth,
} from '~/features/onboarding/resolveLandingRoute'
import { isAuthenticatedSession } from '~/lib/auth-client'

function shouldSkipGate(path: string): boolean {
  if (path === '/' || path === '/login' || path === '/loading') {
    return true
  }

  if (path.startsWith('/auth/')) {
    return true
  }

  return false
}

function isOnboardingRoute(path: string): boolean {
  return path.startsWith('/onboarding')
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return
  }

  if (shouldSkipGate(to.path)) {
    return
  }

  if (!(await isAuthenticatedSession())) {
    if (isOnboardingRoute(to.path)) {
      return navigateTo('/login')
    }

    return
  }

  const currentUser = await fetchCurrentUser()
  if (!currentUser) {
    return
  }

  const landingUser = toLandingRouteUserFromAuth(currentUser)
  const correctRoute = resolveLandingRoute(landingUser)

  if (isOnboardingRoute(to.path)) {
    if (currentUser.onboardingCompleted) {
      return navigateTo('/dashboard')
    }

    if (to.path !== correctRoute) {
      return navigateTo(correctRoute)
    }

    return
  }

  if (!currentUser.onboardingCompleted) {
    return navigateTo(correctRoute)
  }
})
