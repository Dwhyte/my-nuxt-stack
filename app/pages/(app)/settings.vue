<script setup lang="ts">
import { useLogout, useMe } from '~/features/auth/mutations'

definePageMeta({
  layout: 'app',
  middleware: ['auth'],
})

const { data: user } = useMe()
const { mutateAsync: logout, isPending: isLoggingOut } = useLogout()

async function handleLogout(): Promise<void> {
  await logout()
}
</script>

<template>
  <div class="flex min-h-svh items-center justify-center p-4 md:p-8">
    <UCard class="w-full max-w-lg">
      <template #header>
        <div class="flex flex-col gap-1">
          <h1 class="text-highlighted text-xl font-semibold">
            Settings
          </h1>
          <p class="text-muted text-sm">
            Your account details
          </p>
        </div>
      </template>

      <div class="space-y-4">
        <div>
          <p class="text-muted text-xs font-semibold uppercase tracking-wide">
            Name
          </p>
          <p class="text-highlighted mt-1 text-lg font-medium">
            {{ user?.name ?? '—' }}
          </p>
        </div>
        <div>
          <p class="text-muted text-xs font-semibold uppercase tracking-wide">
            Email
          </p>
          <p class="text-highlighted mt-1 text-lg font-medium">
            {{ user?.email ?? '—' }}
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex w-full flex-col gap-2">
          <UButton
            variant="outline"
            size="lg"
            block
            to="/dashboard"
          >
            Back to Demo Page A
          </UButton>
          <UButton
            size="lg"
            block
            color="error"
            variant="soft"
            :loading="isLoggingOut"
            @click="handleLogout"
          >
            Sign out
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
