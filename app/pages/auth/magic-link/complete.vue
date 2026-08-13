<script setup lang="ts">
await navigateTo('/loading', { replace: true })
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center">
    <v-progress-circular indeterminate color="primary" size="40" />
  </div>
</template>
