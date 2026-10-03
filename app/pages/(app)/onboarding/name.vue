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
  <div class="flex min-h-svh items-center justify-center p-4 md:p-8">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="flex flex-col gap-1">
          <h1 class="text-highlighted text-2xl font-bold tracking-tight">
            Welcome!
          </h1>
          <p class="text-muted text-sm">
            What's your name?
          </p>
        </div>
      </template>

      <UFormField label="Name" :error="nameError ?? undefined">
        <UInput
          v-model="name"
          placeholder="Sam Lee"
          autocomplete="name"
          autofocus
          @keyup.enter="onContinue"
        />
      </UFormField>

      <template #footer>
        <AppActionButton
          :loading="isPending"
          @click="onContinue"
        >
          Continue
        </AppActionButton>
      </template>
    </UCard>
  </div>
</template>
