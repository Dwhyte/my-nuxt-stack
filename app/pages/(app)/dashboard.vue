<script setup lang="ts">
import { useDemoStore } from "~/stores/useDemoStore";

definePageMeta({
  layout: "app",
  middleware: ["auth"],
});

const demoStore = useDemoStore();

const stackItems = [
  {
    label: "Nuxt 4",
    description: "Full-stack Vue framework with file-based routing",
  },
  { label: "Vue 3", description: "Reactive UI with Composition API" },
  { label: "Vuetify 4", description: "Material Design component library" },
  {
    label: "Tailwind v4",
    description: "Utility-first styling alongside Vuetify",
  },
  { label: "tRPC", description: "End-to-end typesafe API layer" },
  { label: "Better Auth", description: "Magic link and OAuth authentication" },
  { label: "Prisma", description: "Type-safe database access" },
  {
    label: "Trigger.dev",
    description: "Background jobs and async task processing",
  },
  { label: "Pinia", description: "Client-side state management" },
] as const;
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-8 md:px-6">
    <div class="space-y-3 text-center">
      <v-chip
        variant="flat"
        color="primary"
        label
        :ripple="false"
        class="bg-muted font-medium text-foreground"
        rounded="xl"
      >
        my-nuxt-stack
      </v-chip>
      <h1
        class="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
      >
        Dashboard
      </h1>
      <p class="text-lg text-muted-foreground">
        Demo Page A — your authenticated app shell is ready to build on.
      </p>
    </div>

    <v-card class="mt-8 rounded-2xl" variant="outlined">
      <v-card-title class="font-display text-lg font-bold">
        Stack Overview
      </v-card-title>
      <v-card-subtitle>The technology powering this starter</v-card-subtitle>

      <v-card-text>
        <ul class="flex flex-col gap-3">
          <li
            v-for="item in stackItems"
            :key="item.label"
            class="flex items-start gap-3"
          >
            <span
              class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-lg bg-muted"
            >
              <span class="size-2 rounded-lg bg-foreground" />
            </span>
            <span class="text-sm text-muted-foreground">
              <strong class="text-foreground">{{ item.label }}</strong>
              — {{ item.description }}
            </span>
          </li>
        </ul>
      </v-card-text>

      <v-card-actions class="flex flex-col gap-2 px-4 pb-4">
        <v-btn
          variant="outlined"
          size="large"
          rounded="xl"
          block
          @click="demoStore.increment()"
        >
          Pinia counter: {{ demoStore.counter }}
        </v-btn>

        <v-btn
          to="/example"
          variant="flat"
          size="large"
          rounded="xl"
          block
          class="auth-cta-btn"
        >
          Go to Example
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
