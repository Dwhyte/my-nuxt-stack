<script setup lang="ts">
import AuthMagicLinkForm from '~/components/auth/AuthMagicLinkForm.vue'

const props = withDefaults(
  defineProps<{
    mode?: 'login' | 'signup'
  }>(),
  {
    mode: 'login',
  },
)

const title = computed(() => (props.mode === 'signup' ? 'Sign up' : 'Sign in'))
</script>

<template>
  <UCard class="w-full max-w-md">
    <template #header>
      <h1 class="text-highlighted text-2xl font-bold tracking-tight">
        {{ title }}
      </h1>
    </template>

    <AuthMagicLinkForm :mode="mode" />

    <p class="text-muted mt-6 text-center text-sm">
      New here? Enter your email — we'll create your account when you sign in.
    </p>
  </UCard>
</template>
