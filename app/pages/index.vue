<script setup lang="ts">
import AppLoadingSpinner from '~/components/AppLoadingSpinner.vue'
import { isAuthenticatedSession } from '~/lib/auth-client'
import { fetchCurrentUser } from '~/features/auth/fetchCurrentUser'
import {
  resolveLandingRoute,
  toLandingRouteUserFromAuth,
} from '~/features/onboarding/resolveLandingRoute'

definePageMeta({
  layout: 'default',
})

onMounted(async () => {
  if (await isAuthenticatedSession()) {
    const user = await fetchCurrentUser()
    if (user) {
      await navigateTo(resolveLandingRoute(toLandingRouteUserFromAuth(user)), { replace: true })
      return
    }
  }

  await navigateTo('/login', { replace: true })
})
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center">
    <AppLoadingSpinner />
  </div>
</template>
