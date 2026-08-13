<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'

definePageMeta({
  layout: 'app',
  middleware: ['auth'],
})

const { $trpc } = useNuxtApp()

const { data, isLoading, isError } = useQuery({
  queryKey: ['demo', 'hello'],
  queryFn: () => $trpc.demo.hello.query(),
})

const {
  mutateAsync: triggerHealthCheck,
  isPending: isTriggering,
  data: triggerResult,
  error: triggerError,
} = useMutation({
  mutationFn: () => $trpc.demo.triggerHealthCheck.mutate(undefined),
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8 md:px-6">
    <div class="space-y-3 text-center">
      <v-chip
        variant="tonal"
        color="success"
        size="small"
        label
        :ripple="false"
        class="font-medium"
      >
        Server data loaded
      </v-chip>
      <h1 class="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        Example
      </h1>
      <p class="text-lg text-muted-foreground">
        Demo Page B — tRPC queries and Trigger.dev background jobs.
      </p>
    </div>

    <v-card class="mt-8 rounded-2xl" variant="outlined">
      <v-card-title class="font-display text-lg font-bold">
        Server-Provided Data
      </v-card-title>
      <v-card-subtitle>Returned by the demo.hello tRPC procedure</v-card-subtitle>

      <v-card-text>
        <div v-if="isLoading" class="text-sm text-muted-foreground">
          Loading…
        </div>

        <div v-else-if="isError" class="text-sm text-error">
          Failed to load demo data.
        </div>

        <div v-else class="flex flex-col gap-2 rounded-xl bg-muted p-4 font-mono text-sm">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-muted-foreground">message:</span>
            <span class="text-foreground">"{{ data?.message }}"</span>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-muted-foreground">timestamp:</span>
            <span class="text-muted-foreground">{{ data?.timestamp }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="mt-6 rounded-2xl" variant="outlined">
      <v-card-title class="font-display text-lg font-bold">
        Trigger.dev
      </v-card-title>
      <v-card-subtitle>Queue the health-check background task</v-card-subtitle>

      <v-card-text class="space-y-3">
        <p class="text-sm text-muted-foreground">
          Requires <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">TRIGGER_SECRET_KEY</code>
          and <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">pnpm dev</code>
          (runs Nuxt + Trigger worker). Check the Trigger dashboard for run output.
        </p>

        <div v-if="triggerResult" class="rounded-xl bg-muted p-4 font-mono text-sm">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-muted-foreground">runId:</span>
            <span class="text-foreground">{{ triggerResult.runId }}</span>
          </div>
        </div>

        <p v-if="triggerError" class="text-sm text-error">
          {{ triggerError.message }}
        </p>
      </v-card-text>

      <v-card-actions class="flex-col gap-2 px-4 pb-4">
        <v-btn
          variant="outlined"
          size="large"
          rounded="xl"
          block
          :loading="isTriggering"
          @click="triggerHealthCheck()"
        >
          Queue health-check task
        </v-btn>

        <v-btn
          to="/dashboard"
          variant="flat"
          size="large"
          rounded="xl"
          block
          class="auth-cta-btn"
        >
          Back to Dashboard
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
