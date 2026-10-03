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
  <div class="flex min-h-svh items-center justify-center p-4 md:p-8">
    <div class="flex w-full max-w-2xl flex-col gap-8">
      <div class="flex flex-col gap-3 text-center">
        <UBadge color="primary" variant="subtle" size="lg" class="self-center">
          <UIcon name="i-lucide-circle-check" class="size-3.5" />
          Navigation successful
        </UBadge>
        <h1 class="text-highlighted text-4xl font-bold tracking-tight">
          Demo Page B
        </h1>
        <p class="text-muted text-lg">
          You navigated here from Demo A via client-side routing. tRPC and Trigger.dev demos below.
        </p>
      </div>

      <UCard>
        <template #header>
          <div class="flex flex-col gap-1">
            <div class="text-highlighted flex items-center gap-2 text-lg font-semibold">
              <UIcon name="i-lucide-server" class="size-5" />
              Server-Provided Data
            </div>
            <p class="text-muted text-sm">
              Returned by the demo.hello tRPC procedure
            </p>
          </div>
        </template>

        <div class="flex flex-col gap-4">
          <div v-if="isLoading" class="text-muted text-sm">
            Loading…
          </div>

          <div v-else-if="isError" class="text-error text-sm">
            Failed to load demo data.
          </div>

          <div v-else class="bg-elevated flex flex-col gap-2 rounded-lg p-4 font-mono text-sm">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-muted">message:</span>
              <span class="text-highlighted">"{{ data?.message }}"</span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-muted">timestamp:</span>
              <span class="text-muted">{{ data?.timestamp }}</span>
            </div>
          </div>

          <p class="text-muted text-sm">
            These values were fetched on the client via
            <code class="bg-elevated rounded px-1.5 py-0.5 font-mono text-xs">$trpc.demo.hello</code>.
          </p>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex flex-col gap-1">
            <div class="text-highlighted flex items-center gap-2 text-lg font-semibold">
              <UIcon name="i-lucide-workflow" class="size-5" />
              Trigger.dev
            </div>
            <p class="text-muted text-sm">
              Queue the health-check background task
            </p>
          </div>
        </template>

        <div class="flex flex-col gap-4">
          <p class="text-muted text-sm">
            Requires
            <code class="bg-elevated rounded px-1.5 py-0.5 font-mono text-xs">TRIGGER_SECRET_KEY</code>
            and
            <code class="bg-elevated rounded px-1.5 py-0.5 font-mono text-xs">pnpm dev</code>.
          </p>

          <div v-if="triggerResult" class="bg-elevated rounded-lg p-4 font-mono text-sm">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-muted">runId:</span>
              <span class="text-highlighted">{{ triggerResult.runId }}</span>
            </div>
          </div>

          <p v-if="triggerError" class="text-error text-sm">
            {{ triggerError.message }}
          </p>
        </div>

        <template #footer>
          <UButton
            variant="outline"
            size="lg"
            block
            :loading="isTriggering"
            @click="triggerHealthCheck()"
          >
            Queue health-check task
          </UButton>
        </template>
      </UCard>

      <UButton variant="outline" size="lg" block to="/dashboard">
        <UIcon name="i-lucide-arrow-left" class="size-[18px]" />
        Back to Demo Page A
      </UButton>

      <p class="text-muted text-center text-xs">
        Navigate back — Vue Router preserves history without a full reload
      </p>
    </div>
  </div>
</template>
