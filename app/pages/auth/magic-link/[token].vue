<script setup lang="ts">
import AppLoadingSpinner from '~/components/AppLoadingSpinner.vue'
import { navigateAfterAuth } from '~/composables/usePostAuthNavigation'
import { useVerifyMagicLink } from '~/features/auth/mutations'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const token = computed(() => String(route.params.token ?? ''))

const { verify, isPending, error } = useVerifyMagicLink()
const verifyError = ref<string | null>(null)

onMounted(async () => {
  if (!token.value) {
    verifyError.value = 'Invalid sign-in link.'
    return
  }

  try {
    await verify(token.value)
    await navigateAfterAuth()
  } catch (verifyFailure) {
    verifyError.value = verifyFailure instanceof Error
      ? verifyFailure.message
      : 'Unable to verify sign-in link.'
  }
})
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
    <AppLoadingSpinner v-if="isPending" />
    <template v-else-if="verifyError || error">
      <h1 class="font-display text-2xl font-extrabold text-foreground">
        Sign-in link expired
      </h1>
      <p class="mt-3 max-w-md text-sm text-muted-foreground">
        {{ verifyError ?? error?.message ?? 'Request a new magic link to continue.' }}
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
