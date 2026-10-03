<script setup lang="ts">
import AppLoadingSpinner from '~/components/AppLoadingSpinner.vue'
import { navigateAfterAuth } from '~/composables/usePostAuthNavigation'

definePageMeta({
  layout: 'default',
})

const callbackError = ref<string | null>(null)
const isPending = ref(true)

onMounted(async () => {
  try {
    await navigateAfterAuth()
  } catch (oauthFailure) {
    callbackError.value = oauthFailure instanceof Error
      ? oauthFailure.message
      : 'Unable to complete Google sign-in.'
  } finally {
    isPending.value = false
  }
})
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
    <AppLoadingSpinner v-if="isPending" />
    <template v-else-if="callbackError">
      <h1 class="font-display text-2xl font-extrabold text-foreground">
        Google sign-in failed
      </h1>
      <p class="mt-3 max-w-md text-sm text-muted-foreground">
        {{ callbackError }}
      </p>
      <UButton
        class="mt-6"
        color="primary"
        to="/login"
      >
        Back to sign in
      </UButton>
    </template>
  </div>
</template>
