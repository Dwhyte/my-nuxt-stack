import { fetchCurrentUser } from '~/features/auth/fetchCurrentUser'
import { resolveLandingRoute, toLandingRouteUserFromAuth } from '~/features/onboarding/resolveLandingRoute'
import { isAuthenticatedSession } from '~/lib/auth-client'

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    return
  }

  if (!(await isAuthenticatedSession())) {
    return
  }

  const user = await fetchCurrentUser()

  if (!user) {
    return navigateTo('/loading')
  }

  return navigateTo(resolveLandingRoute(toLandingRouteUserFromAuth(user)))
})
