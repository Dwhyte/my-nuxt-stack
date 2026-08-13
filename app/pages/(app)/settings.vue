<script setup lang="ts">
import AppActionButton from '~/components/AppActionButton.vue'
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
  <div class="mx-auto max-w-lg px-4 py-8 md:px-6">
    <h1 class="font-display text-3xl font-extrabold tracking-tight text-foreground">
      Settings
    </h1>
    <p class="mt-2 text-muted-foreground">
      Your account details
    </p>

    <v-card class="mt-8 rounded-2xl" variant="outlined">
      <v-card-text class="space-y-4 pt-6">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Name
          </p>
          <p class="mt-1 text-lg font-medium text-foreground">
            {{ user?.name ?? '—' }}
          </p>
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Email
          </p>
          <p class="mt-1 text-lg font-medium text-foreground">
            {{ user?.email ?? '—' }}
          </p>
        </div>
      </v-card-text>
    </v-card>

    <AppActionButton
      class="mt-6"
      :loading="isLoggingOut"
      @click="handleLogout"
    >
      Sign out
    </AppActionButton>
  </div>
</template>
