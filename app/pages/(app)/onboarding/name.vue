<script setup lang="ts">
import AppActionButton from '~/components/AppActionButton.vue'
import { useCompleteName, useMe } from '~/features/auth/mutations'

definePageMeta({
  layout: 'onboarding',
  middleware: ['auth'],
})

const { data: user } = useMe()
const { mutateAsync: completeName, isPending } = useCompleteName()

const name = ref('')
const nameError = ref<string | null>(null)

watch(
  user,
  (currentUser) => {
    if (currentUser?.name && !name.value) {
      name.value = currentUser.name
    }
  },
  { immediate: true },
)

async function onContinue(): Promise<void> {
  nameError.value = null

  const trimmed = name.value.trim()

  if (trimmed === '') {
    nameError.value = 'Enter your name.'
    return
  }

  await completeName(trimmed)
  await navigateTo('/dashboard', { replace: true })
}
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center px-6">
    <div class="w-full max-w-[400px]">
      <h1 class="font-display text-2xl font-extrabold text-[var(--auth-ink)]">
        Welcome!
      </h1>
      <h2 class="mt-1 font-display text-[1.75rem] font-extrabold leading-tight text-[var(--auth-ink)]">
        What's your name?
      </h2>

      <div class="mt-8">
        <v-text-field
          v-model="name"
          placeholder="Sam Lee"
          autocomplete="name"
          autofocus
          variant="solo-filled"
          flat
          rounded="xl"
          hide-details="auto"
          class="auth-field"
          :error-messages="nameError ? [nameError] : []"
          @keyup.enter="onContinue"
        />
      </div>

      <AppActionButton
        class="mt-4"
        :loading="isPending"
        @click="onContinue"
      >
        Continue
      </AppActionButton>
    </div>
  </div>
</template>
