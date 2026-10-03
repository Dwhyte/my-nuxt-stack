<script setup lang="ts">
import AppLoadingSpinner from '~/components/AppLoadingSpinner.vue'
import {
  finalizeAuthSession,
  resolvePostAuthDestinationForUser,
  useMe,
} from '~/features/auth/mutations'
import { consumeRedirectAfterLogin } from '~/lib/auth-storage'

definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

const route = useRoute()
const { data: user, isLoading, refetch } = useMe()

onMounted(async () => {
  await finalizeAuthSession()
  await refetch()
})

watch(
  user,
  async (currentUser) => {
    if (!currentUser || isLoading.value) {
      return
    }

    const storedRedirect = consumeRedirectAfterLogin()
    const queryRedirect =
      typeof route.query.redirect === 'string' ? route.query.redirect : null

    const destination = resolvePostAuthDestinationForUser(
      currentUser,
      storedRedirect,
      queryRedirect,
    )
    await navigateTo(destination, { replace: true })
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center">
    <AppLoadingSpinner />
  </div>
</template>
