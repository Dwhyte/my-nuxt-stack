<script setup lang="ts">
defineProps<{
  name: string
  debug?: string
}>()
</script>

<template>
  <div class="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-center md:px-6">
    <h1 class="font-display text-3xl font-extrabold tracking-tight text-foreground">
      {{ name }}
    </h1>
    <p v-if="debug" class="max-w-md text-sm text-muted-foreground">
      {{ debug }}
    </p>
  </div>
</template>
