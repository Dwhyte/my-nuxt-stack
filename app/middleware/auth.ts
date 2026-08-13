import { isSafePostAuthRedirect } from '~/features/onboarding/resolveLandingRoute'
import { isAuthenticatedSession } from '~/lib/auth-client'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return
  }

  if (await isAuthenticatedSession()) {
    return
  }

  if (isSafePostAuthRedirect(to.fullPath)) {
    sessionStorage.setItem('redirect_after_login', to.fullPath)
  }

  return navigateTo('/login')
})
