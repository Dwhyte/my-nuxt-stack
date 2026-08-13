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
  <div class="mx-auto w-full max-w-[400px] px-6 py-10 font-sans md:px-0 md:py-16">
    <h1 class="font-display text-[2rem] font-extrabold leading-[2.625rem] tracking-tight text-[var(--auth-ink)]">
      {{ title }}
    </h1>

    <div class="mt-8">
      <AuthMagicLinkForm :mode="mode" />
    </div>

    <p class="mt-8 text-center text-[15px] font-normal text-[var(--auth-muted)]">
      New here? Enter your email — we'll create your account when you sign in.
    </p>
  </div>
</template>
