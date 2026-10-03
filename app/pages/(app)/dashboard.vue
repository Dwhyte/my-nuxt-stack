<script setup lang="ts">
import { useAppearance } from '~/composables/useAppearance'
import { useDemoStore } from '~/stores/useDemoStore'

definePageMeta({
  layout: 'app',
  middleware: ['auth'],
})

const stackItems = [
  { label: 'Nuxt 4', description: 'Full-stack Vue framework with file-based routing' },
  { label: 'Vue 3', description: 'Renders interactive UI on the client' },
  { label: 'Tailwind CSS', description: 'Utility-first layout and styling' },
  { label: 'Nuxt UI', description: 'Accessible Vue components built on Reka UI and Tailwind' },
  { label: 'tRPC', description: 'End-to-end typesafe API layer' },
  { label: 'Better Auth', description: 'Magic link and OAuth authentication' },
  { label: 'Prisma', description: 'Type-safe database access' },
  { label: 'Trigger.dev', description: 'Background jobs and async task processing' },
  { label: 'Pinia', description: 'Client-side state management' },
] as const

const loadSteps = [
  'Nuxt matches the URL and loads the page component for the route.',
  'Vue renders the page inside the app layout shell.',
  'Client navigation swaps page components without a full reload.',
] as const

const howItLoadsOpen = ref(false)
const { resolvedAppearance, updateAppearance } = useAppearance()
const demoStore = useDemoStore()
const toast = useToast()

const isDarkMode = computed(() => resolvedAppearance.value === 'dark')

function onDarkModeToggle(enabled: boolean): void {
  updateAppearance(enabled ? 'dark' : 'light')
}

function showToast(): void {
  demoStore.increment()
  toast.add({
    title: `Toast #${demoStore.counter} from the Nuxt UI pattern.`,
    color: 'success',
  })
}
</script>

<template>
  <div class="flex min-h-svh items-center justify-center p-4 md:p-8">
    <div class="flex w-full max-w-2xl flex-col gap-8">
      <div class="flex flex-col gap-3 text-center">
        <div class="flex items-center justify-center gap-3">
          <USwitch
            :model-value="isDarkMode"
            aria-label="Toggle light and dark mode"
            @update:model-value="onDarkModeToggle"
          />
          <span class="text-muted text-sm">Light/Dark</span>
        </div>
        <UBadge color="neutral" variant="subtle" size="lg" class="self-center">
          <UIcon name="i-lucide-zap" class="size-3.5" />
          Nuxt + Tailwind + Nuxt UI
        </UBadge>
        <h1 class="text-highlighted text-4xl font-bold tracking-tight">
          Demo Page A
        </h1>
        <p class="text-muted text-lg">
          Dashboard — your authenticated starter shell, matching the Laravel stack demo.
        </p>
      </div>

      <UCard>
        <template #header>
          <div class="flex flex-col gap-1">
            <div class="text-highlighted flex items-center gap-2 text-lg font-semibold">
              <UIcon name="i-lucide-layers" class="size-5" />
              Stack Overview
            </div>
            <p class="text-muted text-sm">
              The technology powering this starter
            </p>
          </div>
        </template>

        <ul class="flex flex-col gap-3">
          <li
            v-for="item in stackItems"
            :key="item.label"
            class="flex items-start gap-3"
          >
            <span class="bg-elevated mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md">
              <span class="bg-highlighted size-2 rounded-md" />
            </span>
            <span class="text-muted text-sm">
              <strong class="text-highlighted">{{ item.label }}</strong>
              — {{ item.description }}
            </span>
          </li>
        </ul>

        <template #footer>
          <div class="flex w-full flex-col gap-2">
            <UButton variant="outline" size="lg" block @click="howItLoadsOpen = true">
              <UIcon name="i-lucide-panel-top" class="size-[18px]" />
              How this page loads
            </UButton>
            <UButton variant="outline" size="lg" block @click="showToast">
              <UIcon name="i-lucide-bell" class="size-[18px]" />
              Show a snackbar
              <span v-if="demoStore.counter > 0" class="text-muted ml-1">({{ demoStore.counter }})</span>
            </UButton>
            <UButton size="lg" block to="/example">
              Go to Demo Page B
              <UIcon name="i-lucide-arrow-right" class="size-[18px]" />
            </UButton>
            <UButton variant="outline" size="lg" block to="/settings">
              Settings
            </UButton>
          </div>
        </template>
      </UCard>

      <p class="text-muted text-center text-xs">
        Navigation is handled client-side by Vue Router — no full page reload
      </p>
    </div>
  </div>

  <UModal
    v-model:open="howItLoadsOpen"
    title="Request to render"
    description="A single round trip from Nuxt to Vue — no full page reload after the first visit."
  >
    <template #body>
      <ol class="text-muted flex list-none flex-col gap-3 text-sm">
        <li
          v-for="(step, index) in loadSteps"
          :key="step"
          class="flex items-start gap-3"
        >
          <span class="bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold">
            {{ index + 1 }}
          </span>
          <span>{{ step }}</span>
        </li>
      </ol>
    </template>
    <template #footer>
      <UButton variant="outline" @click="howItLoadsOpen = false">
        Got it
      </UButton>
    </template>
  </UModal>
</template>
